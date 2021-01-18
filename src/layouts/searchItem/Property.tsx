import React, { useMemo } from 'react';
import { Category, Property } from '../../@types/vehicle-properties';
import PropertyTreeCreator from '../../utils/vehicle-properties/property-tree-creator';
import MetadataItem from './MetadataItem';

import { H5 } from '../../components/Heading/index';
import { Repeat } from '../../components/Repeat/index';
import { TableList } from '../../components/TableList/index';
import Tabs from '../../components/Tabs/index';

interface MetadataSubCategoryProps {
  name: string;
  properties: Property[];
}

const MetadataSubCategory = ({ name, properties }: MetadataSubCategoryProps) => (
  <Repeat>
    <H5 as="h3">{name}</H5>
    <TableList>
      {!!properties.length &&
        properties.map((property, index) => (
          <MetadataItem
            name={property.name}
            hint={property.hint}
            value={property.value}
            unit={property.unit}
            key={`${property.name}-${index}`}
          />
        ))}
    </TableList>
  </Repeat>
);

interface MetadataCaregoryProps {
  properties: Property[];
  subCategories: Category[];
}

const MetadataCategory = ({ properties, subCategories }: MetadataCaregoryProps) => (
  <div className="tab-section">
    {!!properties.length && (
      <Repeat>
        <TableList>
          {properties.map((property, index) => (
            <MetadataItem
              name={property.name}
              hint={property.hint}
              value={property.value}
              unit={property.unit}
              key={`${property.name}-${index}`}
            />
          ))}
        </TableList>
      </Repeat>
    )}
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
      <Repeat>
        <Tabs
          tabs={[
            {
              name: 'tab-1',
              displayName: 'Utvalda',
            },
            {
              name: 'tab-2',
              displayName: 'Motor & prestanda',
            },
            {
              name: 'tab-3',
              displayName: 'Dimensioner & vikt',
            },
          ]}
          active="tab-1"
        />
      </Repeat>
      <Repeat>
        {mappedProperties?.categories.map((category, index) => (
          <MetadataCategory
            properties={category.properties}
            subCategories={category.subCategories}
            key={`${index}-${category.name}`}
          />
        ))}
      </Repeat>
    </>
  );
};

export default PropertySet;
