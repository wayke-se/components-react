import React, { useRef, useCallback, useState, useEffect } from 'react';

import { Wrapper, ListWrapper, List, Item, PrevBtn, NextBtn } from './wrapper';
import { IconChevronLeft, IconChevronRight } from '../Icon';
import { NavButton } from '../NavButton';

export interface IOverflowGrid {
  items: React.ReactNode[];
  itemKeyBase?: string;
  spacing?: number;
  columns?: number;
  columnsSm?: number;
  columnsMd?: number;
  accentBg?: boolean;
}

const OverflowGrid = ({
  items,
  itemKeyBase,
  spacing,
  columns,
  columnsSm,
  columnsMd,
  accentBg,
}: IOverflowGrid) => {
  const overflowElement = useRef<HTMLUListElement | null>(null);

  const onPrev = useCallback(() => {
    const itemWidth = overflowElement.current?.children[0].clientWidth || 0;
    const scrollLeft = overflowElement.current?.scrollLeft || 0;

    if (scrollLeft > 0) {
      overflowElement.current?.scroll({
        left: scrollLeft - itemWidth,
        behavior: 'smooth',
      });
    }
  }, []);

  const onNext = useCallback(() => {
    const itemWidth = overflowElement.current?.children[0].clientWidth || 0;
    const scrollWidth = overflowElement.current?.scrollWidth || 0;
    const scrollLeft = overflowElement.current?.scrollLeft || 0;
    const overflowElementWidth = overflowElement.current?.offsetWidth || 0;
    const overflowElementScrollWidth = scrollWidth - overflowElementWidth;

    if (overflowElementScrollWidth !== scrollLeft) {
      overflowElement.current?.scroll({
        left: scrollLeft + itemWidth,
        behavior: 'smooth',
      });
    }
  }, []);

  // Hide navigation buttons depending on scroll position
  const [hidePrevNav, setHidePrevNav] = useState(true);
  const [hideNextNav, setHideNextNav] = useState(true);

  const onScroll = () => {
    const scrollLeft = overflowElement.current?.scrollLeft || 0;
    const scrollWidth = overflowElement.current?.scrollWidth || 0;
    const overflowElementWidth = overflowElement.current?.offsetWidth || 0;
    const overflowElementScrollWidth = scrollWidth - overflowElementWidth;

    setHidePrevNav(scrollLeft == 0 ? true : false);
    setHideNextNav(overflowElementScrollWidth == scrollLeft ? true : false);
  };

  useEffect(() => {
    onScroll();
    overflowElement.current?.addEventListener('scroll', onScroll);
    return () => overflowElement.current?.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Wrapper $accentBg={accentBg}>
      <ListWrapper $spacing={spacing}>
        <List
          ref={overflowElement}
          $columns={columns}
          $columnsSm={columnsSm}
          $columnsMd={columnsMd}
        >
          {items.map((item, i) => (
            <Item key={itemKeyBase ? `${itemKeyBase}-${i}` : `overflow-grid-item-${i}`}>
              {item}
            </Item>
          ))}
        </List>
      </ListWrapper>
      {!hidePrevNav && (
        <PrevBtn>
          <NavButton onClick={onPrev} title="Previous">
            <IconChevronLeft />
          </NavButton>
        </PrevBtn>
      )}
      {!hideNextNav && (
        <NextBtn>
          <NavButton onClick={onNext} title="Next">
            <IconChevronRight />
          </NavButton>
        </NextBtn>
      )}
    </Wrapper>
  );
};

export default OverflowGrid;
