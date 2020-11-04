import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import usePrevious from '../../hooks/usePrevious';

import { PathContext, PathContextProps } from './PathContext';
import reducer, { initialState, SET_PATH } from './reducer';

const regexGuid = /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/gi;
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

  const id = useMemo(() => state.path.match(regexGuid)?.pop(), [state.path]);

  const value: PathContextProps = useMemo(
    () => ({
      ...state,
      previousPath,
      id,
      pushState,
    }),
    [state]
  );

  return <PathContext.Provider value={value}>{children}</PathContext.Provider>;
};

export default PathProvider;
