import React, { useCallback } from 'react';
import { CentralStorageContext } from './CentralStorageContext';
import useSessionStorage from '../../hooks/useSessionStorage';

interface CentralStorageProviderProps {
  children: React.ReactNode;
}

const CentralStorageProvider = ({ children }: CentralStorageProviderProps) => {
  const { value, set, remove } = useSessionStorage('centralStorage');

  const setCentralStorageId = useCallback((id?: string) => (id ? set(id) : remove()), []);

  return (
    <CentralStorageContext.Provider value={{ centralStorageId: value, setCentralStorageId }}>
      {children}
    </CentralStorageContext.Provider>
  );
};

export default CentralStorageProvider;
