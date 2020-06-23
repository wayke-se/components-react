import React from 'react';
import marked from 'marked';

import Repeat from '../../components/Repeat';
import { ProductPageMainSection } from '../../components/ProductPage';
import Content from '../../components/Content';
import { H2 } from '../../components/Heading';
import { ButtonInline } from '../../components/Button';
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
          {packageOption.description && (
            <Repeat>
              <Content dangerouslySetInnerHTML={{ __html: marked(packageOption.description) }} />
            </Repeat>
          )}
          {packageOption.link?.href && (
            <Repeat>
              <ButtonInline
                as="a"
                href={packageOption.link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {packageOption.link.title}
              </ButtonInline>
            </Repeat>
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
