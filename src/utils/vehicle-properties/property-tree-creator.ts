import { EnhancedProperty, Tree, Category, ItemCategory } from '../../@types/vehicle-properties';

class PropertyTreeCreator {
  private properties: { [key: string]: EnhancedProperty };

  constructor(properties: { [key: string]: EnhancedProperty }) {
    this.properties = properties;
  }

  create(): Tree {
    const categories = this.createTreeCategories();
    const rootProperties = this.getRootProperties();
    if (rootProperties.length) {
      categories.push({
        name: PropertyTreeCreator.DEFAULT_CATEGORY_NAME,
        id: PropertyTreeCreator.DEFAULT_CATEGORY_ID,
        subCategories: [],
        properties: rootProperties,
      });
    }

    const tree = {
      categories,
    };

    return tree;
  }

  private getRootProperties() {
    const rootProperties = Object.keys(this.properties)
      .filter(this.propertiesWithoutCategory)
      .map((key) => this.properties[key])
      .filter(this.isNonList);
    return rootProperties;
  }

  private propertiesWithCategory = (propertyKey: string) =>
    !!this.properties[propertyKey].category?.id;

  private propertiesWithoutCategory = (propertyKey: string) =>
    !this.propertiesWithCategory(propertyKey);

  private isList = (property: EnhancedProperty) =>
    property.type === PropertyTreeCreator.TEXT_LIST_TYPE;

  private isNonList = (property: EnhancedProperty) => !this.isList(property);

  private createTreeCategories() {
    const categories = this.getCategories();
    const treeCategories = this.convertToTreeCategories(categories);
    return treeCategories;
  }

  private getCategories() {
    const categories = Object.keys(this.properties)
      .filter(this.propertiesWithCategory)
      .map((key) => (this.properties[key].category as unknown) as ItemCategory)
      .filter(PropertyTreeCreator.distinctCategories);
    return categories;
  }

  private convertToTreeCategories(categories: ItemCategory[]) {
    return categories.map((category) => {
      const properties = Object.keys(this.properties)
        .filter((key) => this.hasCategoryWithId(key, category.id))
        .filter(this.propertiesWithoutSubCategory)
        .map((key) => this.properties[key])
        .filter(this.isNonList);
      const subCategories = this.createTreeSubCategories(category.id);

      return {
        id: category.id,
        name: category.name,
        properties,
        subCategories,
      };
    });
  }

  private hasCategoryWithId = (propertyKey: string, categoryId: number) =>
    this.properties[propertyKey].category?.id === categoryId;

  private propertiesWithSubCategory = (propertyKey: string) =>
    !!this.properties[propertyKey].category?.subCategory?.id;

  private propertiesWithoutSubCategory = (propertyKey: string) =>
    !this.propertiesWithSubCategory(propertyKey);

  private createTreeSubCategories(categoryId: number) {
    const subCategories = this.getSubCategoriesOfCategory(categoryId);
    const convertedSubCategories = subCategories
      .map((subCategory) => this.convertSubCategory(subCategory))
      .filter((category) => category.properties.length > 0);
    const createdSubCategories = this.createListSubCategories(categoryId);
    const treeCategories = convertedSubCategories.concat(createdSubCategories);

    return treeCategories;
  }

  private getSubCategoriesOfCategory(id: number) {
    const categories = Object.keys(this.properties)
      .filter((key) => this.hasCategoryWithId(key, id))
      .filter(this.propertiesWithSubCategory)
      .map((key) => this.properties[key].category?.subCategory as ItemCategory)
      .filter(PropertyTreeCreator.distinctCategories);

    return categories;
  }

  private convertSubCategory(subCategory: ItemCategory): Category {
    const properties = Object.keys(this.properties)
      .filter((key) => this.hasSubCategoryWithId(key, subCategory.id))
      .map((key) => this.properties[key])
      .filter(this.isNonList);

    return {
      id: subCategory.id,
      name: subCategory.name,
      properties,
      subCategories: [],
    };
  }

  private hasSubCategoryWithId = (propertyKey: string, categoryId: number) =>
    this.properties[propertyKey].category?.subCategory?.id === categoryId;

  private static distinctCategories = (
    category: ItemCategory,
    index: number,
    self: ItemCategory[]
  ) => {
    const firstOccuranceOfId = self.find((value) => value.id === category.id);
    return !!firstOccuranceOfId && self.indexOf(firstOccuranceOfId) === index;
  };

  private createListSubCategories(categoryId: number): Category[] {
    const listProperties = Object.keys(this.properties)
      .filter((key) => this.hasCategoryWithId(key, categoryId))
      .map((key) => this.properties[key])
      .filter(this.isList)
      .filter((prop) => (prop.value as string[]).length > 0);

    const createdSubCategories = listProperties.map((property, index) => ({
      id: PropertyTreeCreator.LIST_CATEGORY_START_ID + index,
      name: property.name,
      properties: this.asBoolProperties(property),
      subCategories: [],
    }));

    return createdSubCategories;
  }

  private asBoolProperties(listProperty: EnhancedProperty) {
    const values = listProperty.value as string[];
    const boolProperties = values.map((prop) => ({
      name: prop,
      value: true,
      type: 'bool',
      unit: listProperty.unit,
      hint: listProperty.hint,
    }));
    return boolProperties;
  }

  static DEFAULT_CATEGORY_NAME = 'Okategoriserat';
  static DEFAULT_CATEGORY_ID = 0;
  static TEXT_LIST_TYPE = 'text-list';
  static LIST_CATEGORY_START_ID = 100000;
}

export default PropertyTreeCreator;
