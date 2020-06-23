import React from 'react';
import marked from 'marked';

import Repeat from '../../components/Repeat';
import { ProductPageMainSection } from '../../components/ProductPage';
import Content from '../../components/Content';
import { H2 } from '../../components/Heading';
import { ButtonInline } from '../../components/Button';
import LogoBox from '../../components/LogoBox';
import { PackageOption } from '../../@types/codegen/types';

interface PackageOptionsProps {
  packageOptions?: PackageOption[] | null;
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
          {packageOption.link?.url && (
            <Repeat>
              <ButtonInline
                as="a"
                href={packageOption.link.url}
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
