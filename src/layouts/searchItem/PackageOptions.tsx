import React from 'react';
import { marked } from 'marked';

import { Repeat } from '../../components/Repeat/index';
import { ProductPageMainSection } from '../../components/ProductPage/index';
import Content from '../../components/Content/index';
import { H2 } from '../../components/Heading/index';
import { ButtonInline } from '../../components/Button/index';
import LogoBox from '../../components/LogoBox/index';
import { PackageOption } from '../../@types/codegen/types';
import { useTranslation } from 'react-i18next';

interface PackageOptionsProps {
  packageOptions?: PackageOption[] | null;
}

const PackageOptions = ({ packageOptions }: PackageOptionsProps) => {
  const { t } = useTranslation();
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
                {packageOption.link.title ? packageOption.link.title : t('item.readMoreInNewTab')}
              </ButtonInline>
            </Repeat>
          )}
          {packageOption.image && (
            <Repeat>
              <LogoBox logo={packageOption.image} alt={t('common.logotype') || ''} wide />
            </Repeat>
          )}
        </ProductPageMainSection>
      ))}
    </>
  );
};

export default PackageOptions;
