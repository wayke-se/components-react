import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Category, Property } from '../../@types/vehicle-properties';
import { H5 } from '../../components/Heading';
import { Repeat } from '../../components/Repeat';
import { TableList } from '../../components/TableList';
import Tabs from '../../components/Tabs';
import propertyTree from '../../Gql/ad/propertyTree';
import useAdContext from '../../State/Ad/AdContext';
import MetadataItem from './MetadataItem';

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

const PropertySet = () => {
  const { t } = useTranslation();
  const ad = useAdContext();
  const [activeCategoryId, setActiveCategoryId] = useState(-1);
  const mappedProperties = useMemo(() => propertyTree(ad, t), [ad, t]);

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
