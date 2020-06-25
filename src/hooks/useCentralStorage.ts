import { useContext, useEffect } from 'react';
import { CentralStorageContext } from '../context/central-storage-context';
import { Vehicle } from '../@types/codegen/types';
import useSearchItemBranch from './useSearchItemBranch';

const useCentralStorage = (vehicle?: Vehicle | null) => {
  const { centralStorageId, setCentralStorageId } = useContext(CentralStorageContext);

  const connections = vehicle?.branch?.connections;
  const branchId =
    vehicle?.id !== centralStorageId
      ? connections?.find((x) => x.id === centralStorageId)?.id
      : undefined;

  const { data, loading } = useSearchItemBranch(vehicle?.id, branchId);

  useEffect(() => {
    if ((connections?.length || 0) > 0) {
      if (centralStorageId) {
        const match = connections?.find((x) => x.id === centralStorageId);
        if (!match) {
          const first = connections?.[0];
          if (first) {
            setCentralStorageId(first.id);
          }
        }
      } else {
        const first = connections?.[0];
        if (first) {
          setCentralStorageId(first.id);
        }
      }
    }
  }, [vehicle]);

  return {
    vehicle:
      (connections?.length || 0) > 0
        ? vehicle?.id === centralStorageId
          ? vehicle
          : data?.vehicle
        : vehicle,
    loading,
  };
};

export default useCentralStorage;
