// An ad carries two ids. ad.id (UUID v7) is what the public API and the ad
// page's URL use. The legacy waykeId is the vehicle id from before ads-service,
// and the services that predate it are still keyed on it: commerce/ecom (the
// order flow 404s on ad.id) and ev-calculation. The two are equal for ads
// created after the migration and differ for older ones.
//
// The public API does not expose the waykeId, but iteration.id is shaped
// <branchId>@<waykeId>@<vehicleCode>.<hash>. Same as web-ui-v2's
// utils/ads/legacyWaykeId.ts.

export const legacyWaykeIdFromIterationId = (
  iterationId: string | null | undefined,
  fallback: string
): string => {
  if (!iterationId) return fallback;
  const firstAt = iterationId.indexOf('@');
  const secondAt = firstAt === -1 ? -1 : iterationId.indexOf('@', firstAt + 1);
  if (firstAt === -1 || secondAt === -1) return fallback;
  return iterationId.slice(firstAt + 1, secondAt) || fallback;
};
