import React, { useMemo } from 'react';
import { Category, Property } from '../../@types/vehicle-properties';
import PropertyTreeCreator from '../../utils/vehicle-properties/property-tree-creator';
import MetadataItem from './MetadataItem';

interface MetadataSubCategoryProps {
  name: string;
  properties: Property[];
}

const MetadataSubCategory = ({ name, properties }: MetadataSubCategoryProps) => (
  <div className="m-t-half">
    <div className="h4 m-b-half">{name}</div>
    {!!properties.length &&
      properties.map((property, index) => (
        <MetadataItem
          name={property.name}
          value={property.value}
          unit={property.unit}
          key={`${property.name}-${index}`}
        />
      ))}
  </div>
);

interface MetadataCaregoryProps {
  name: string;
  properties: Property[];
  subCategories: Category[];
}

const MetadataCategory = ({ name, properties, subCategories }: MetadataCaregoryProps) => (
  <div className="m-t">
    <div className="h3 m-b-half">{name}</div>
    {!!properties.length &&
      properties.map((property, index) => (
        <MetadataItem
          name={property.name}
          value={property.value}
          unit={property.unit}
          key={`${property.name}-${index}`}
        />
      ))}
    {!!subCategories.length &&
      subCategories.map((subCategory, index) => (
        <MetadataSubCategory
          name={subCategory.name}
          properties={subCategory.properties}
          key={`${subCategory.name}-${index}`}
        />
      ))}
  </div>
);

interface PropertySetProps {
  propertySet: any;
}

const PropertySet = ({ propertySet }: PropertySetProps) => {
  const mappedProperties = useMemo(
    () => (propertySet ? new PropertyTreeCreator(propertySet).create() : undefined),
    [propertySet]
  );

  return (
    <>
      <p>ehhehe</p>
      {mappedProperties?.categories.map((category, index) => (
        <MetadataCategory
          name={category.name}
          properties={category.properties}
          subCategories={category.subCategories}
          key={`${index}-${category.name}`}
        />
      ))}
    </>
  );
};

export default PropertySet;
