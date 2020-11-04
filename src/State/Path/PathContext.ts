import { createContext } from 'react';

export interface PathContextProps {
  path: string;
  previousPath?: string;
  id?: string;
  pushState: (id: string) => void;
}

export const PathContext = createContext<PathContextProps | undefined>(undefined);
