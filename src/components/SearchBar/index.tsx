import React, { useCallback, useRef } from 'react';
import InputSearch from '../InputSearch/index';
import useOutsideClick from '../../hooks/useOutsideClick';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  value: string;
  setValue: (value: string) => void;
  onSearch: (value: string) => void;
}

const SearchBar = ({ value, setValue, onSearch }: SearchBarProps) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
    []
  );

  useOutsideClick(ref, () => setValue(''));

  const _onSearch = useCallback(() => {
    onSearch(value);
  }, [value]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        _onSearch();
      }
    },
    [value, _onSearch]
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
    />
  );
};

export default SearchBar;
