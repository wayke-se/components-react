import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import VEHICLE_QUERY from '../../queries/VEHICLE_QUERY';
import { VehicleQuery } from '../../@types/gql/VehicleQuery';

const DefaultSerchItemLayout = () => {
  const { loading } = useQuery<VehicleQuery>(VEHICLE_QUERY, { variables: { id: 'test' } });
  return <p>DefaultSerchItemLayout {loading ? 'loading...' : false}</p>;
};

export default DefaultSerchItemLayout;
