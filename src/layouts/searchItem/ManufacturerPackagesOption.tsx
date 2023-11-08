import React from 'react';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';

import { Repeat } from '../../components/Repeat/index';
import { ProductPageMainSection } from '../../components/ProductPage/index';
import Content from '../../components/Content/index';
import { H2 } from '../../components/Heading/index';
import { ButtonInline } from '../../components/Button/index';
import LogoBox from '../../components/LogoBox/index';
import { Maybe, PackageOption } from '../../@types/codegen/types';

interface ManufacturerPackageOption {
  packageOption?: Maybe<PackageOption>;
}

const ManufacturerPackageOption = ({ packageOption }: ManufacturerPackageOption) => {
  const { t } = useTranslation();
  if (!packageOption) {
    return null;
  }

  return (
    <ProductPageMainSection>
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
  );
};

export default ManufacturerPackageOption;
