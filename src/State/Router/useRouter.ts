import { useContext } from 'react';
import { RouterContext } from './RouterContext';

const useRouter = () => useContext(RouterContext);

export default useRouter;
