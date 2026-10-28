import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useOutsideClick from '../../hooks/useOutsideClick';
import InputSearch from '../InputSearch';
import { Suggestion, Suggestions } from './wrapper';

interface SearchBarProps {
  value: string;
  setValue: (value: string) => void;
  onSearch: (value: string) => void;
  /** Typeahead labels shown under the field */
  suggestions?: string[];
  onSelectSuggestion?: (index: number) => void;
}

const SearchBar = ({
  value,
  setValue,
  onSearch,
  suggestions = [],
  onSelectSuggestion,
}: SearchBarProps) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();
  const [active, setActive] = useState(-1);
  const open = suggestions.length > 0 && !!onSelectSuggestion;

  useEffect(() => setActive(-1), [suggestions]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
    [setValue]
  );

  useOutsideClick(ref, () => setValue(''));

  const _onSearch = useCallback(() => {
    onSearch(value);
  }, [value, onSearch]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        const last = suggestions.length - 1;
        setActive((i) => (e.key === 'ArrowDown' ? Math.min(i + 1, last) : Math.max(i - 1, -1)));
      } else if (e.key === 'Escape') {
        setValue('');
      } else if (e.key === 'Enter') {
        if (open && active > -1) {
          onSelectSuggestion?.(active);
        } else {
          _onSearch();
        }
      }
    },
    [open, active, suggestions, onSelectSuggestion, _onSearch, setValue]
  );

  return (
    <InputSearch
      ref={ref}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onSearch={_onSearch}
      placeholder={t('searchBar.placeholder')}
      label={t('searchBar.placeholder')}
      id="main-search"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={open}
      aria-controls={listId}
      aria-activedescendant={open && active > -1 ? `${listId}-${active}` : undefined}
    >
      {open && (
        <Suggestions id={listId} role="listbox" aria-label={t('searchBar.searchResults')}>
          {suggestions.map((label, index) => (
            <Suggestion
              key={label}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === active}
              $active={index === active}
              // mousedown, so the pick lands before the field loses focus
              onMouseDown={(e) => {
                e.preventDefault();
                onSelectSuggestion?.(index);
              }}
            >
              {label}
            </Suggestion>
          ))}
        </Suggestions>
      )}
    </InputSearch>
  );
};

export default SearchBar;
