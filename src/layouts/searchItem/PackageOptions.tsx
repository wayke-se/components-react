import React from 'react';
import marked from 'marked';

import Repeat from '../../components/Repeat';
import { ProductPageMainSection } from '../../components/ProductPage';
import Content from '../../components/Content';
import { H2, VisualHeading } from '../../components/Heading';
import LogoBox from '../../components/LogoBox';
import { SearchItem_vehicle_packageOptions } from '../../@types/gql/SearchItem';

interface PackageOptionsProps {
  packageOptions?: SearchItem_vehicle_packageOptions[] | null;
}

const PackageOptions = ({ packageOptions }: PackageOptionsProps) => {
  if (!packageOptions) {
    return null;
  }

  return (
    <>
      {packageOptions.map((packageOption, index) => (
        <ProductPageMainSection key={packageOption.title || index}>
          <Repeat>
            <H2 noMargin>{packageOption.title}</H2>
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
      ))}
    </>
  );
};

export default PackageOptions;
