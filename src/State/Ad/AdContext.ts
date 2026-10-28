import { createContext, useContext } from 'react';
import { Ad } from '../../Gql/ad/types';

/** The ad the page shows, for the parts of the page that need more than their props. */
export const AdContext = createContext<Ad | undefined>(undefined);

const useAdContext = () => {
  const ad = useContext(AdContext);
  if (!ad) throw new Error('Wayke: used outside an ad page');
  return ad;
};

export default useAdContext;
