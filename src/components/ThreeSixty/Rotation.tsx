import React, { useState, useEffect, useRef, cloneElement, Children } from 'react';

const calculateCurrentFrame = (startFrame: number, delta: number, length: number): number => {
  const frame = (startFrame + delta) % length;
  if (frame < 0) {
    return frame + length;
  }

  return frame;
};

type PropsType = {
  children: JSX.Element[];
};

type RotationEvent = any;

const Rotation = ({ children }: PropsType) => {
  const startFrame = useRef(0);
  const pointerPosition = useRef<number>();
  const max = useRef(0);

  const [state, setState] = useState({
    current: 0,
    outsideMouseMove: false,
  });

  useEffect(() => {
    document.addEventListener('mouseup', touchEnd);

    return () => {
      window.document.removeEventListener('mouseup', touchEnd);
      window.document.body.removeEventListener('mousemove', mouseMove);
      window.document.body.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  const touchMove = (event: RotationEvent) => {
    const notTouched = typeof pointerPosition.current !== 'number';
    event.preventDefault();
    if (notTouched) {
      return;
    }

    const childCount = Children.count(children);

    const { offsetWidth } = event.currentTarget;
    const pointer = calculatePointerPosition(event);
    const max = offsetWidth;
    const offset = pointer - (pointerPosition.current || 0);
    const delta = Math.floor((offset / max) * childCount);
    setCurrentFrame(calculateCurrentFrame(startFrame.current, delta, childCount));
  };

  const mouseMove = (event: RotationEvent) => {
    const notTouched = typeof pointerPosition.current !== 'number';
    event.preventDefault();
    if (notTouched || !state.outsideMouseMove) return;

    const childCount = Children.count(children);

    const pointer = calculatePointerPosition(event);
    const offset = pointer - (pointerPosition.current || 0);
    const delta = Math.floor((offset / max.current) * childCount);
    setCurrentFrame(calculateCurrentFrame(startFrame.current, delta, childCount));
  };

  const mouseUp = () => {
    window.document.body.removeEventListener('mousemove', mouseMove);
    window.document.body.removeEventListener('mouseup', mouseUp);

    pointerPosition.current = undefined;
    startFrame.current = 0;
  };

  const touchStart = (event: RotationEvent) => {
    event.preventDefault();
    pointerPosition.current = calculatePointerPosition(event);
    startFrame.current = state.current;

    const { offsetWidth } = event.currentTarget;
    max.current = offsetWidth;

    window.document.body.addEventListener('mousemove', mouseMove);
    window.document.body.addEventListener('mouseup', mouseUp);
  };

  const touchEnd = (event: RotationEvent) => {
    event.preventDefault();
    pointerPosition.current = undefined;
    startFrame.current = 0;
  };

  const onMouseEnter = () => {
    if (state.outsideMouseMove) setState({ ...state, outsideMouseMove: false });
  };

  const onMouseLeave = () => {
    if (!state.outsideMouseMove) setState({ ...state, outsideMouseMove: true });
  };

  const setCurrentFrame = (current: number) => {
    if (current !== state.current) {
      setState({ ...state, current });
    }
  };

  const calculatePointerPosition = (event: RotationEvent): number => {
    const { clientX } = event.type.indexOf('touch') === 0 ? event.changedTouches[0] : event;
    const { offsetLeft } = event.currentTarget;
    return clientX - offsetLeft;
  };

  return (
    <div
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
      onMouseDown={touchStart}
      onMouseMove={touchMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ position: 'relative', touchAction: 'manipulation' }}
    >
      {Children.map(children, (child, i) =>
        cloneElement(child, {
          style: {
            width: '100%',
            display: state.current === i ? 'block' : 'none',
          },
        })
      )}
    </div>
  );
};

export default Rotation;
