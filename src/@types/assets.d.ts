// Side-effect CSS imports (e.g. './style.css' in the CDN entry) have no type
// declarations; without this TypeScript 6 fails declaration emit with TS2882.
declare module '*.css';
