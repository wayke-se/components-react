import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FREE_TEXT, SORT } from '../../Gql/searchParams';
import { fetchSuggestions, suggestionParams } from '../../Gql/suggest';
import { Suggestion } from '../../Gql/types';
import useSearch from '../../State/Search/useSearch';
import useSettings from '../../State/Settings/useSettings';
import PubSub from '../../utils/pubsub/pubsub';
import SearchBar from '../SearchBar';

/** Typeahead from search.ads(q).suggest, from two characters, after a short pause in typing. */
const useSuggestions = (value: string) => {
  const { publicApi } = useSettings();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const q = value.trim();

  useEffect(() => {
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    let active = true;
    const timeout = setTimeout(() => {
      fetchSuggestions(publicApi, q)
        .then((next) => active && setSuggestions(next))
        .catch(() => active && setSuggestions([]));
    }, 150);
    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [q, publicApi]);

  return suggestions;
};

const SearchFilter = () => {
  const [value, setValue] = useState('');
  const { publicApi } = useSettings();
  const { params, update } = useSearch();
  const suggestions = useSuggestions(value);
  const labels = useMemo(() => suggestions.map((s) => s.label), [suggestions]);

  /** A suggestion's filters replace the current ones; the sort order stays. */
  const applySuggestion = useCallback(
    (suggestion: Suggestion) => {
      const next = suggestionParams(suggestion);
      const sort = params.get(SORT);
      if (sort) next.set(SORT, sort);
      update(next);
      setValue('');
      PubSub.publish('Search', { query: suggestion.label });
    },
    [params, update]
  );

  const onSearch = useCallback(
    async (value: string) => {
      const q = value.trim();
      if (q === (params.get(FREE_TEXT) || '')) {
        return;
      }

      // A free text that is exactly a suggestion ("audi" → Audi) becomes its
      // filters, as the legacy search rewrote such queries.
      if (q) {
        const exact = await fetchSuggestions(publicApi, q, 5)
          .then((list) =>
            list.find((s) => s.label.localeCompare(q, undefined, { sensitivity: 'base' }) === 0)
          )
          .catch(() => undefined);
        if (exact?.filters.length) {
          applySuggestion(exact);
          return;
        }
      }

      const next = new URLSearchParams(params);
      if (q) {
        next.set(FREE_TEXT, q);
      } else {
        next.delete(FREE_TEXT);
      }
      update(next);
      setValue('');
      PubSub.publish('Search', { query: q });
    },
    [params, update, publicApi, applySuggestion]
  );

  const onSelectSuggestion = useCallback(
    (index: number) => {
      const suggestion = suggestions[index];
      if (suggestion) applySuggestion(suggestion);
    },
    [suggestions, applySuggestion]
  );

  return (
    <SearchBar
      value={value}
      setValue={setValue}
      onSearch={onSearch}
      suggestions={labels}
      onSelectSuggestion={onSelectSuggestion}
    />
  );
};

export default SearchFilter;
