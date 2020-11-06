import { createContext } from 'react';

export interface CentralStorageContextProps {
  centralStorageId?: string | null;
  setCentralStorageId: (id?: string) => void;
}

export const CentralStorageContext = createContext<CentralStorageContextProps>({
  setCentralStorageId: (_) => {},
});
