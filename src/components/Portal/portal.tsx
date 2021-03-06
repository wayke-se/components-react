import React from 'react';
import ReactDOM from 'react-dom';

export interface IPortal {
  id: string;
  children: React.ReactNode;
}

const Portal = ({ id, children }: IPortal) => {
  const el = React.useRef(document.getElementById(id) || document.createElement('div'));
  if (!el.current) {
    return null;
  }

  const { current } = el;

  const [dynamic] = React.useState(!current.parentElement);

  React.useEffect(() => {
    if (dynamic) {
      current.id = id;
      if (document.body) {
        document.body.appendChild(current);
      }
    }
    return () => {
      if (dynamic && current.parentElement) {
        current.parentElement.removeChild(current);
      }
    };
  }, [id]);

  return ReactDOM.createPortal(children, current);
};

export default React.memo<IPortal>(Portal);
