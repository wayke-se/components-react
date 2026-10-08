"""Uploads dist-cdn/ to cdn.wayke.se: public-assets/wayke-components-react/<version>/.

Every version gets its own folder and is never changed after release, so files are
served with an immutable cache header. Fails the job if any upload fails.
"""

import json
import os
import sys
from pathlib import Path

from azure.storage.blob import BlobServiceClient, ContentSettings

CONTAINER = "public-assets"
PACKAGE_FOLDER = "wayke-components-react"
SOURCE_DIR = Path("dist-cdn")
CACHE_CONTROL = "public, max-age=31536000, immutable"

CONTENT_TYPES = {
    ".js": "application/javascript",
    ".css": "text/css",
    ".map": "application/json",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".gif": "image/gif",
}


def main() -> int:
    connection_string = os.environ.get("BLOB_STORAGE_CONNECTION_STRING")
    if not connection_string:
        print("BLOB_STORAGE_CONNECTION_STRING is not set")
        return 1

    upload_map_files = os.environ.get("UPLOAD_MAP_FILES", "false").lower() == "true"
    version = json.loads(Path("package.json").read_text())["version"]
    folder = f"{PACKAGE_FOLDER}/{version}"

    files = sorted(
        f
        for f in SOURCE_DIR.iterdir()
        if f.is_file() and (upload_map_files or f.suffix != ".map")
    )
    if not any(f.name == "index.js" for f in files):
        print(f"{SOURCE_DIR}/index.js not found, run `npm run build` first")
        return 1

    unknown = [f.name for f in files if f.suffix not in CONTENT_TYPES]
    if unknown:
        print(f"No content type for: {', '.join(unknown)}")
        return 1

    container = BlobServiceClient.from_connection_string(connection_string).get_container_client(CONTAINER)
    print(f"Uploading {len(files)} file(s) to {CONTAINER}/{folder}")
    for f in files:
        with f.open("rb") as data:
            container.upload_blob(
                f"{folder}/{f.name}",
                data,
                overwrite=True,
                content_settings=ContentSettings(
                    content_type=CONTENT_TYPES[f.suffix],
                    cache_control=CACHE_CONTROL,
                ),
            )
        print(f"  {folder}/{f.name}")

    print(f"Done: https://cdn.wayke.se/{CONTAINER}/{folder}/index.js")
    return 0


if __name__ == "__main__":
    sys.exit(main())
