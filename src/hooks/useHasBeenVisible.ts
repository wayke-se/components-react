import { useEffect, useState } from 'react';
import useOnScreen from './useOnScreen';

const useHasBeenVisible = (ref: React.MutableRefObject<HTMLElement | null>) => {
  const isVisible = useOnScreen(ref);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (isVisible && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isVisible]);

  return hasBeenVisible;
};

export default useHasBeenVisible;
