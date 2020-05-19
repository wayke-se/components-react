import React from 'react';

import Container from '../../components/Container';
import { Page, PageSection } from '../../components/Page';
import Result from '../../components/Result';
import Filter from '../../components/Filter';
import Grid from '../../components/Grid';
import SearchTerm from '../../components/SearchTerm';
import Panel from '../../components/Panel';
import InputSearch from '../../components/InputSearch';
import Breadcrumbs from '../../components/Breadcrumbs';

import { PortalNamespace } from '../../components/Portal';
import PortalElement from '../../components/Portal/portal-element';
import { FooterAction, FooterActionItem } from '../../components/Panel/wrapper';
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonClear,
  ButtonContent,
} from '../../components/Button';
import Accordion, { AccordionItem } from '../../components/Accordion';
import Checklist from '../../components/Checklist';
import Repeat from '../../components/Repeat';
import OverflowBox from '../../components/OverflowBox';
import Snackbar from '../../components/Snackbar';
import RangeSlider from '../../components/RangeSlider';
import ColorSelect from '../../components/ColorSelect';
import { UtilityTextRight } from '../../components/Utility';

interface DefaultSearchLayoutProps {
  onClickSearchItem?: (id: string) => void;
}

const DefaultSearchLayout = ({ onClickSearchItem }: DefaultSearchLayoutProps) => (
  <>
    <Page>
      <PageSection large>
        <Container>
          <Repeat small>
            <InputSearch placeholder="Sök" label="Sök" id="main-search" />
          </Repeat>
          <Repeat small>
            <Breadcrumbs
              items={[
                {
                  title: 'Bilar',
                  href: '#',
                },
                {
                  title: 'Sökresultat "elbil"',
                },
              ]}
            />
          </Repeat>
        </Container>
      </PageSection>
      <PageSection large>
        <Container>
          <SearchTerm>elbil</SearchTerm>
        </Container>
      </PageSection>
      <PageSection>
        <Container>
          <Filter
            filters={[
              {
                label: 'Märke & modell',
              },
              {
                label: 'Biltyp',
              },
              {
                label: 'Mätarställning',
                activeFilters: 2,
              },
              {
                label: 'Pris/ekonomi',
              },
              {
                label: 'Drivmedel',
              },
              {
                label: 'Växellåda',
              },
              {
                label: 'Färg',
              },
              {
                label: 'Anläggning',
              },
            ]}
          />
        </Container>
      </PageSection>
      <PageSection accent>
        <Container>
          <Result>
            <Grid onClickItem={onClickSearchItem} />
          </Result>
        </Container>
      </PageSection>

      {false && (
        <Panel
          title="Filtrera"
          onClose={() => {}}
          footer={
            <>
              <FooterAction>
                <FooterActionItem>
                  <ButtonSecondary fullWidth>
                    <ButtonContent>Rensa alla</ButtonContent>
                  </ButtonSecondary>
                </FooterActionItem>
                <FooterActionItem>
                  <ButtonPrimary fullWidth>
                    <ButtonContent>Visa 22 bilar</ButtonContent>
                  </ButtonPrimary>
                </FooterActionItem>
              </FooterAction>
            </>
          }
        >
          <Accordion>
            <AccordionItem heading="Märke och modell">
              <Repeat>
                <InputSearch
                  placeholder="Sök märke och modell"
                  label="Sök märke och modell"
                  id="brand-model-filter-search"
                />
              </Repeat>
              <Repeat>
                <Snackbar icon severity="error">
                  Din sökning gav inga resultat.
                </Snackbar>
              </Repeat>
              <Repeat>
                <OverflowBox>
                  <Checklist
                    radio={false}
                    items={[
                      {
                        label: 'Audi',
                        onClick: () => {},
                      },
                      {
                        label: 'BMW',
                        onClick: () => {},
                        active: true,
                      },
                      {
                        label: 'Citroën',
                        onClick: () => {},
                        active: true,
                      },
                      {
                        label: 'Fiat',
                        onClick: () => {},
                        active: true,
                      },
                    ]}
                  />
                </OverflowBox>
              </Repeat>
              <Repeat>
                <RangeSlider />
              </Repeat>
              <Repeat>
                <ColorSelect
                  items={[
                    {
                      label: 'Vit',
                      hex: ['#fff'],
                      onClick: () => {},
                      active: true,
                      disabled: false,
                      boxShadow: true,
                    },
                    {
                      label: 'Svart',
                      hex: ['#000'],
                      onClick: () => {},
                      active: false,
                      disabled: false,
                    },
                    {
                      label: 'Grå',
                      hex: ['#cfcfcf'],
                      onClick: () => {},
                      active: true,
                      disabled: false,
                    },
                    {
                      label: 'Silver',
                      hex: ['#fff', '#c9c9c9'],
                      onClick: () => {},
                      active: false,
                      disabled: false,
                    },
                    {
                      label: 'Röd',
                      hex: ['#ff3900'],
                      onClick: () => {},
                      active: false,
                      disabled: true,
                    },
                    {
                      label: 'Blå',
                      hex: ['#124ddb'],
                      onClick: () => {},
                      active: false,
                      disabled: false,
                    },
                    {
                      label: 'Brun',
                      hex: ['#94614f'],
                      onClick: () => {},
                      active: false,
                      disabled: false,
                    },
                    {
                      label: 'Orange',
                      hex: ['#ff9400'],
                      onClick: () => {},
                      active: false,
                      disabled: true,
                    },
                    {
                      label: 'Grön',
                      hex: ['#4dc749'],
                      onClick: () => {},
                      active: false,
                      disabled: true,
                    },
                    {
                      label: 'Gul',
                      hex: ['#ffdf00'],
                      onClick: () => {},
                      active: false,
                      disabled: false,
                    },
                    {
                      label: 'Lila',
                      hex: ['#8e46b6'],
                      onClick: () => {},
                      active: false,
                      disabled: false,
                    },
                    {
                      label: 'Beige',
                      hex: ['#e6e2d6'],
                      onClick: () => {},
                      active: true,
                      disabled: false,
                    },
                  ]}
                />
              </Repeat>
              <Repeat>
                <UtilityTextRight>
                  <ButtonClear>
                    <ButtonContent>Rensa märke och modell</ButtonContent>
                  </ButtonClear>
                </UtilityTextRight>
              </Repeat>
            </AccordionItem>
            <AccordionItem heading="Biltyp" activeCount={2}>
              <div>Accordion Body</div>
            </AccordionItem>
            <AccordionItem heading="Mätarställning">
              <div>Accordion Body</div>
            </AccordionItem>
            <AccordionItem heading="Pris/Ekonomi">
              <div>Accordion Body</div>
            </AccordionItem>
            <AccordionItem heading="Drivmedel" activeCount={1}>
              <div>Accordion Body</div>
            </AccordionItem>
            <AccordionItem heading="Växellåda">
              <div>Accordion Body</div>
            </AccordionItem>
            <AccordionItem heading="Färg">
              <div>Accordion Body</div>
            </AccordionItem>
            <AccordionItem heading="Anpassning">
              <div>Accordion Body</div>
            </AccordionItem>
          </Accordion>
        </Panel>
      )}
    </Page>
    <PortalElement id={PortalNamespace.DefaultPortal} />
  </>
);

export default DefaultSearchLayout;
