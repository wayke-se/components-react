// Small readers over an Ad that several parts of the ad page share. They take
// the API's shape as it is and tolerate missing data.

import { legacyWaykeIdFromIterationId } from './legacyWaykeId';
import { Ad, AdAccessory, AdMediaItem, LeasingPrice, PaymentRange } from './types';

/** A number from the API, which sends some amounts as strings. */
export const num = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === '') return undefined;
  const n = typeof value === 'number' ? value : Number.parseFloat(value);
  return Number.isFinite(n) ? n : undefined;
};

export const str = (value: string | null | undefined) => value || undefined;

/** What every ad page event carries. */
export const adEvent = (ad: Ad) => ({
  id: ad.id,
  branchId: ad.branch.id,
  branchName: str(ad.branch.displayName),
});

/** Ecom and ev-calculation are keyed on the legacy waykeId, not on ad.id. */
export const waykeId = (ad: Ad) => legacyWaykeIdFromIterationId(ad.iteration?.id, ad.id);

export const platformChannel = (ad: Ad) =>
  ad.channels.find((c) => c.__typename === 'PlatformChannel');

export const price = (ad: Ad) => num(ad.pricing?.cash?.price?.amount) ?? 0;

/** How much the price was lowered, when it was. */
export const discount = (ad: Ad) => {
  const oldPrice = num(ad.pricing?.cash?.oldPrice?.amount);
  const current = price(ad);
  return oldPrice && oldPrice > current ? oldPrice - current : undefined;
};

/** The delivery date of a car that is not in stock yet. */
export const availableFrom = (ad: Ad) => {
  const channel = platformChannel(ad);
  return channel?.inventoryStatus !== 'InStock' &&
    channel?.deliveryTime?.__typename === 'DeliveryDate' &&
    channel.deliveryTime.date
    ? new Date(channel.deliveryTime.date)
    : undefined;
};

export const publishedAt = (ad: Ad) => {
  const at = platformChannel(ad)?.publishedAt;
  return at ? new Date(at) : undefined;
};

/** Buy online is offered when the branch has it, unless it is switched off for Wayke. */
export const ecom = (ad: Ad) => {
  const commerce = ad.iteration?.commerce;
  return {
    enabled: !!commerce?.enabled && !commerce.disabledOnWayke,
    reserved: !!commerce?.reserved,
  };
};

export interface ContactPerson {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

/** The person to contact about the ad: the assigned salesperson, else the branch's default. */
export const contactPerson = (ad: Ad): ContactPerson | undefined => {
  const c = ad.contactOption;
  if (c.__typename === 'AssignedUser' || c.__typename === 'AdDefaultContactOptions') {
    return { name: str(c.displayName), email: str(c.email), phone: str(c.telephone) };
  }
  const d = ad.branch.adDefaultContactOptions;
  if (d && (d.email || d.telephone)) {
    return {
      name: str(d.displayName),
      email: str(d.email),
      phone: str(d.telephone),
      avatar: str(d.avatarUrl),
    };
  }
  return undefined;
};

export type DayKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type WeekOpeningHours = Partial<Record<DayKey, { from: string; until: string } | null>>;

export const openingHours = (branch: Ad['branch']): WeekOpeningHours | undefined => {
  const hours = branch.weekOpeningHours?.openingHours;
  if (!hours?.length) return undefined;
  const week: WeekOpeningHours = {};
  hours.forEach((h) => {
    if (!h) return;
    const key = h.dayOfWeek.toLowerCase() as DayKey;
    week[key] = h.openFrom && h.openTo ? { from: h.openFrom, until: h.openTo } : null;
  });
  return week;
};

export const position = (branch: Ad['branch']) =>
  branch.latitude !== null && branch.longitude !== null
    ? { latitude: branch.latitude, longitude: branch.longitude }
    : undefined;

export type MediaType = 'image' | 'sphere' | 'threesixty' | 'embedded';

/** One slide of the gallery: an image, a panorama, a 360 spin of several images, or a video. */
export interface GalleryMedia {
  type: MediaType;
  urls: string[];
}

export const galleryMedia = (items: AdMediaItem[]): GalleryMedia[] =>
  [...items]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map<GalleryMedia | undefined>((m) => {
      if (m.__typename === 'AdImage' && m.url) {
        return { type: m.mediaType === 'SPHERE' ? 'sphere' : 'image', urls: [m.url] };
      }
      if (m.__typename === 'Ad360ImageGroup' && m.images?.length) {
        return { type: 'threesixty', urls: m.images.map((i) => i.url) };
      }
      if (m.__typename === 'AdEmbeddedVideo' && m.externalUrl) {
        return { type: 'embedded', urls: [m.externalUrl] };
      }
      return undefined;
    })
    .filter((m): m is GalleryMedia => !!m);

export interface Range {
  current: number;
  min: number;
  max: number;
  step: number;
}

export const range = (r: PaymentRange | null | undefined): Range | undefined =>
  r
    ? {
        current: num(r.current) ?? 0,
        min: num(r.min) ?? 0,
        max: num(r.max) ?? 0,
        step: num(r.step) ?? 0,
      }
    : undefined;

export interface LeasingOffer {
  business: boolean;
  monthlyCost: number;
  months?: number;
  mileagePerYear?: number;
  name?: string;
  description?: string;
  image?: string;
}

/** Private and business leasing, with the dealer's promo text when there is one. */
export const leasingOffers = (ad: Ad): LeasingOffer[] => {
  const pairs: [LeasingPrice | null | undefined, boolean][] = [
    [ad.pricing?.leasing, false],
    [ad.pricing?.companyLeasing, true],
  ];
  return pairs.flatMap(([leasing, business]) => {
    const monthlyCost = num(leasing?.leasingMonthlyPayment?.amount);
    if (!leasing || !monthlyCost) return [];
    const promo = ad.leasingPromos.find((lp) => lp.isBusinessLeasing === business);
    return [
      {
        business,
        monthlyCost,
        months: promo?.periodMonths || leasing.contractMonthsRemaining || undefined,
        mileagePerYear: promo?.mileagePerYear || undefined,
        name: str(promo?.title) || str(leasing.issuer),
        description: str(promo?.description),
        image: str(promo?.image),
      },
    ];
  });
};

export interface PackageOffer {
  title: string;
  description?: string;
  image?: string;
  link?: { url: string; title?: string };
}

export const packageOffers = (ad: Ad): PackageOffer[] =>
  ad.packaging.selectedPackaging.map((p) => ({
    title: p.title,
    description: str(p.description),
    image: str(p.imageUrl),
    link: p.ctaUrl ? { url: p.ctaUrl, title: str(p.ctaName) } : undefined,
  }));

/** The manufacturer's warranty package of a certified pre-owned car. */
export const manufacturerPackage = (ad: Ad): PackageOffer | undefined => {
  if (!ad.packaging.certifiedPreOwned) return undefined;
  const warranty = ad.offerings.warranties.find((w) => w.included) || ad.offerings.warranties[0];
  if (!warranty) return undefined;
  const { definition } = warranty;
  return {
    title: definition.name,
    description: str(definition.description) || str(warranty.text),
    image: str(definition.logoUrl),
    link: definition.externalUrl ? { url: definition.externalUrl } : undefined,
  };
};

/** An accessory's images, in their order. */
export const accessoryImages = (accessory: AdAccessory) =>
  [...accessory.media].sort((a, b) => a.sortOrder - b.sortOrder).map((m) => m.url);
