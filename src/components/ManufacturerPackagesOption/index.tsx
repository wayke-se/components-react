import React from 'react';
import marked from 'marked';

import Repeat from '../Repeat';
import { ProductPageMainSection } from '../ProductPage';
import Content from '../Content';
import { H2, VisualHeading } from '../Heading';
import LogoBox from '../LogoBox';
import { SearchItem_vehicle_manufacturer_packageOption } from '../../@types/gql/SearchItem';

interface ManufacturerPackageOption {
  packageOption?: SearchItem_vehicle_manufacturer_packageOption | null;
}

const ManufacturerPackageOption = ({ packageOption }: ManufacturerPackageOption) => {
  if (!packageOption) {
    return null;
  }

  return (
    <ProductPageMainSection>
      <Repeat>
        <H2 noMargin>Begagnatgaranti</H2>
      </Repeat>
      <Repeat>
        <Content>
          <VisualHeading>{packageOption.title}</VisualHeading>
          {packageOption.description && (
            <div dangerouslySetInnerHTML={{ __html: marked(packageOption.description) }} />
          )}
        </Content>
      </Repeat>
      {packageOption.link?.href && (
        <a href={packageOption.link.href} target="_blank" rel="noopener noreferrer">
          {packageOption.link.title}
        </a>
      )}
      {packageOption.image && (
        <Repeat>
          <LogoBox logo={packageOption.image} alt="Logotyp" wide />
        </Repeat>
      )}
    </ProductPageMainSection>
  );
};

export default ManufacturerPackageOption;
