import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import usePrevious from '../../hooks/usePrevious';

import { PathContext, PathContextProps } from './PathContext';
import reducer, { initialState, SET_PATH } from './reducer';

const regexGuidAnyWhere = /(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/g;
const POP_STATE = 'popstate';

interface PathProviderProps {
  children: React.ReactNode;
}

const PathProvider = ({ children }: PathProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const previousPath = usePrevious(state.path);

  useEffect(() => {
    const onPopState = () => {
      dispatch({ type: SET_PATH, path: window.location.href });
    };

    window.addEventListener(POP_STATE, onPopState);
    return () => {
      window.removeEventListener(POP_STATE, onPopState);
    };
  }, []);

  const pushState = useCallback((path: string) => {
    history.pushState(null, '', path);
    dispatch({ type: SET_PATH, path });
  }, []);

  const replaceState = useCallback((path: string) => {
    history.replaceState(null, '', path);
    dispatch({ type: SET_PATH, path });
  }, []);

  const id = useMemo(() => state.path.match(regexGuidAnyWhere)?.pop(), [state.path]);

  const value: PathContextProps = useMemo(
    () => ({
      ...state,
      previousPath,
      id,
      pushState,
      replaceState,
    }),
    [state]
  );

  return <PathContext.Provider value={value}>{children}</PathContext.Provider>;
};

export default PathProvider;
