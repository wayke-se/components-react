import { useContext } from 'react';
import { PathContext, PathContextProps } from './PathContext';

const usePath = (): PathContextProps => {
  const context = useContext(PathContext);

  if (!context) {
    throw new Error('usePath must be used within a PathProvider');
  }

  return context;
};
export default usePath;
