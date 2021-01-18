import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Category, Property } from '../../@types/vehicle-properties';
import PropertyTreeCreator from '../../utils/vehicle-properties/property-tree-creator';
import sortTree from '../../utils/vehicle-properties/property-tree-sorter';
import enrichWithHint from '../../utils/vehicle-properties/property-hint-enricher';
import addCustomProperties from '../../utils/vehicle-properties/custom-property-adder';
import removeProperties from '../../utils/vehicle-properties/property-remover';
import MetadataItem from './MetadataItem';

import { H5 } from '../../components/Heading/index';
import { Repeat } from '../../components/Repeat/index';
import { TableList } from '../../components/TableList/index';
import Tabs from '../../components/Tabs/index';
import { VehicleData } from '../../@types/codegen/types';

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
  vehicleData: VehicleData;
}

const PropertySet = ({ propertySet, vehicleData }: PropertySetProps) => {
  const [activeCategoryId, setActiveCategoryId] = useState(-1);
  const mappedProperties = useMemo(() => {
    if (!propertySet) {
      return undefined;
    }

    let newProperties = removeProperties(propertySet);
    newProperties = addCustomProperties(vehicleData, newProperties);
    const enrichedProperties = enrichWithHint(newProperties);

    const tree = new PropertyTreeCreator(enrichedProperties).create();
    sortTree(tree);
    return tree;
  }, [propertySet]);

  useEffect(() => {
    const categories =
      mappedProperties?.categories?.length !== undefined ? mappedProperties?.categories : undefined;

    if (activeCategoryId < 0 && categories !== undefined && categories.length > 0) {
      setActiveCategoryId(categories[0].id);
    }
  }, [mappedProperties]);

  const onTab = useCallback((id: string) => setActiveCategoryId(parseInt(id, 10)), []);

  const activeCategory = mappedProperties?.categories?.find(
    (category) => category.id === activeCategoryId
  );

  return (
    <>
      <Repeat>
        <Tabs
          tabs={
            mappedProperties?.categories?.map((category) => ({
              name: `${category.id}`,
              displayName: category.name,
            })) || []
          }
          active={`${activeCategoryId}`}
          onClick={onTab}
        />
      </Repeat>
      {activeCategory && (
        <Repeat>
          <MetadataCategory
            properties={activeCategory.properties}
            subCategories={activeCategory.subCategories}
          />
        </Repeat>
      )}
    </>
  );
};

export default PropertySet;
