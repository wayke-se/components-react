import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import VEHICLE_QUERY from '../../queries/VEHICLE_QUERY';
import { VehicleQuery } from '../../@types/gql/VehicleQuery';

const WaykeProductPage = () => {
  const { loading } = useQuery<VehicleQuery>(VEHICLE_QUERY, { variables: { id: 'test' } });
  return <p>ItemPage {loading ? 'loading...' : false}</p>;
};

export default WaykeProductPage;
