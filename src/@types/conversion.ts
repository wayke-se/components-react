/**
 * Conversion options control which call-to-action buttons are rendered on the item page,
 * in which order, and how they look. Mirrors the "conversion_options" concept used on
 * Wayke dealer websites, adapted to this package.
 */
export type ConversionOptionType =
  /** "Buy online" - only rendered when the vehicle has e-commerce enabled. */
  | 'ecom'
  /** Opens the "Send message" lead form. The lead is registered in Wayke Dealer. */
  | 'leadMessage'
  /** Opens the "Get a callback" lead form. The lead is registered in Wayke Dealer. */
  | 'leadCallMe'
  /** Reveal the dealer email address. Opens the mail client with a pre-populated subject. */
  | 'email'
  /** Reveal the dealer phone number. */
  | 'phone';

export interface ConversionOptionVehicle {
  id: string;
  title?: string | null;
  registrationNumber?: string | null;
  manufacturer?: string | null;
  modelSeries?: string | null;
}

export type ConversionOptionText = string | ((vehicle: ConversionOptionVehicle) => string);

interface ConversionOptionBase {
  type: ConversionOptionType;
  /** Custom button label. Defaults to the translated label for the type. */
  name?: string;
  /** Render as primary button. Defaults to true for ecom/leadMessage/leadCallMe, false for email/phone. */
  primary?: boolean;
}

export interface ConversionOptionEmail extends ConversionOptionBase {
  type: 'email';
  /** Mail subject. Defaults to "<hostname> – I'm interested in <reg no>, <make> <model>". */
  subject?: ConversionOptionText;
  /** Mail body. Defaults to a link to the current page. Pass `false` to omit the body. */
  body?: ConversionOptionText | false;
}

export interface ConversionOptionOther extends ConversionOptionBase {
  type: Exclude<ConversionOptionType, 'email'>;
}

export type ConversionOption = ConversionOptionEmail | ConversionOptionOther;

/** Matches the behaviour before conversion options were introduced. */
export const defaultConversionOptions: ConversionOption[] = [
  { type: 'ecom' },
  { type: 'email' },
  { type: 'phone' },
];
