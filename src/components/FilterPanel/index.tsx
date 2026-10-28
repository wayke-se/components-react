import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SORT } from '../../Gql/searchParams';
import useSearch from '../../State/Search/useSearch';
import PubSub from '../../utils/pubsub/pubsub';
import Accordion, { AccordionItem } from '../Accordion';
import { ButtonContent, ButtonPrimary, ButtonSecondary } from '../Button';
import Panel from '../Panel';
import { FooterAction, FooterActionItem } from '../Panel/wrapper';
import { Repeat } from '../Repeat';
import FacetSelector from './faceSelector';

export interface PanelFilter {
  id: string;
  displayName: string;
}

interface Props {
  filters: PanelFilter[];
  /** The filter whose section is open */
  open: string;
  onClose: () => void;
}

const FilterPanel = ({ filters, open, onClose }: Props) => {
  const { t } = useTranslation();
  const { params, result, loading, update } = useSearch();
  const found = result?.found || 0;

  const onClearFilters = useCallback(() => {
    PubSub.publish('SearchClearAllFilters', { query: params.toString() });
    // The sort order is not a filter: it stays.
    const next = new URLSearchParams();
    const sort = params.get(SORT);
    if (sort) next.set(SORT, sort);
    update(next);
  }, [params, update]);

  return (
    <Panel
      title={t('search.filter')}
      onClose={onClose}
      footer={
        <FooterAction>
          <FooterActionItem>
            <ButtonSecondary fullWidth disabled={loading} onClick={onClearFilters}>
              <ButtonContent>{t('search.clearAllFilters.text')}</ButtonContent>
            </ButtonSecondary>
          </FooterActionItem>
          <FooterActionItem>
            <ButtonPrimary fullWidth disabled={loading} onClick={onClose}>
              <ButtonContent>
                {t('search.showNumberOfCustomUnit', {
                  count: found,
                  unit: t(`search.result.${found === 1 ? 'singular' : 'plural'}`),
                })}
              </ButtonContent>
            </ButtonPrimary>
          </FooterActionItem>
        </FooterAction>
      }
    >
      <Accordion>
        {filters.map((f) => (
          <AccordionItem key={f.id} heading={f.displayName} isActive={f.id === open}>
            <Repeat>
              <FacetSelector id={f.id} />
            </Repeat>
          </AccordionItem>
        ))}
      </Accordion>
    </Panel>
  );
};

export default FilterPanel;
