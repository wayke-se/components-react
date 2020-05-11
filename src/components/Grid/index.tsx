import React from 'react';

import { Wrapper, List, Item } from './wrapper';
import ProductCard from '../ProductCard';

const Grid = () => (
  <Wrapper>
    <List>
      <Item>
        <ProductCard
          title="Mazda CX-5"
          href="/product-page"
          image="http://placehold.it/600x400"
          description="Optimum 2.2 DE 175hk Aut AWD – Dragkrok"
          uspList={[
            {
              title: '2017',
            },
            {
              title: '6851 mil',
            },
            {
              title: 'Automat',
            },
            {
              title: 'Diesel',
            },
          ]}
          price="268 800 kr"
          oldPrice="289 000 kr"
        />
      </Item>
      <Item>
        <ProductCard
          title="Skoda Kodiaq"
          href="/product-page"
          image="http://placehold.it/600x400"
          description="Style 2,0 TDI 190 DSG 4x4"
          uspList={[
            {
              title: '2020',
            },
            {
              title: '0 mil',
            },
            {
              title: 'Automat',
            },
            {
              title: 'Diesel',
            },
          ]}
          price="369 500 kr"
          oldPrice="389 000 kr"
        />
      </Item>
      <Item>
        <ProductCard
          title="Mercedes-Benz C 200 Coupé"
          href="/product-page"
          image="http://placehold.it/600x400"
          description="Mercedes 7G-Tronic Plus AMG Sport Euro 6 184hk"
          uspList={[
            {
              title: '2017',
            },
            {
              title: '6851 mil',
            },
            {
              title: 'Automat',
            },
            {
              title: 'Diesel',
            },
          ]}
          price="389 900 kr"
          oldPrice="420 000 kr"
        />
      </Item>
      <Item>
        <ProductCard
          title="Skoda Kodiaq"
          href="/product-page"
          image="http://placehold.it/600x400"
          description="Style 2,0 TDI 190 DSG 4x4"
          uspList={[
            {
              title: '2020',
            },
            {
              title: '0 mil',
            },
            {
              title: 'Automat',
            },
            {
              title: 'Diesel',
            },
          ]}
          price="369 500 kr"
          oldPrice="389 000 kr"
        />
      </Item>
      <Item>
        <ProductCard
          title="Mazda CX-5"
          href="/product-page"
          image="http://placehold.it/600x400"
          description="Optimum 2.2 DE 175hk Aut AWD – Dragkrok"
          uspList={[
            {
              title: '2017',
            },
            {
              title: '6851 mil',
            },
            {
              title: 'Automat',
            },
            {
              title: 'Diesel',
            },
          ]}
          price="268 800 kr"
          oldPrice="289 000 kr"
        />
      </Item>
    </List>
  </Wrapper>
);

export default Grid;
