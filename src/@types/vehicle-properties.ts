export interface Property {
  value: string | number | boolean | string[];
  name: string;
  type: string;
  unit: string | null | undefined;
  hint: string | null | undefined;
}

export interface Category {
  id: number;
  name: string;
  properties: Property[];
  subCategories: Category[];
}

export interface Tree {
  categories: Category[];
}

export interface EnhancedProperty {
  value: number | string | boolean | string[];
  name: string;
  type: string;
  unit: string | undefined | null;
  category: ItemCategory | undefined | null;
  hint: string | undefined | null;
}

export interface ItemCategory {
  name: string;
  id: number;
  subCategory: ItemCategory | undefined | null;
}
