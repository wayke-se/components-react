import { marked } from 'marked';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Maybe, PackageOption } from '../../@types/codegen/types';
import { ButtonInline } from '../../components/Button';
import Content from '../../components/Content';
import { H2 } from '../../components/Heading';
import LogoBox from '../../components/LogoBox';
import { ProductPageMainSection } from '../../components/ProductPage';
import { Repeat } from '../../components/Repeat';

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
