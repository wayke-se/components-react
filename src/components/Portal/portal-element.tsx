import * as React from 'react';

export interface IPortalElement {
  id: string;
}

const PortalElement = ({ id }: IPortalElement) => <div id={id} />;

export default PortalElement;
