import { useEffect, useRef, useState } from 'react';

interface Options extends IntersectionObserverInit {
  persistVisibility?: boolean;
}

const useIsInViewport = <T>(
  options?: Options
): [React.MutableRefObject<T | null>, boolean, number] => {
  const containerRef = useRef<T | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);

  const callbackFunction = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
    setIntersectionRatio(entry.intersectionRatio);

    if (entry.isIntersecting && options?.persistVisibility && containerRef.current) {
      observer.unobserve(containerRef.current as unknown as HTMLElement);
      containerRef.current = null;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current as unknown as HTMLElement);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current as unknown as HTMLElement);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible, intersectionRatio];
};

export default useIsInViewport;
