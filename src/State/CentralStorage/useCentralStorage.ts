import { useContext, useEffect } from 'react';
import { CentralStorageContext } from './CentralStorageContext';
import { Vehicle } from '../../@types/codegen/types';
import useSearchItemBranch from '../../hooks/useSearchItemBranch';

const useCentralStorage = (vehicle?: Vehicle | null) => {
  const { centralStorageId, setCentralStorageId } = useContext(CentralStorageContext);

  const connections = vehicle?.branch?.connections;
  const branchId = centralStorageId
    ? connections?.find((x) => x.id === centralStorageId)?.id
    : undefined;

  const { data, loading } = useSearchItemBranch(vehicle?.id, branchId);

  useEffect(() => {
    if ((connections?.length || 0) > 0) {
      const match = centralStorageId
        ? connections?.find((x) => x.id === centralStorageId)
        : undefined;

      if (!match) {
        const first = connections?.[0];
        if (first) {
          setCentralStorageId(first.id);
        }
      }
    }
  }, [connections]);

  return {
    vehicle: (connections?.length || 0) > 0 ? data?.vehicle : vehicle,
    loading,
  };
};

export default useCentralStorage;
