import { gql } from 'apollo-boost';

const PROPERTIES_FRAGMENT = gql`
  fragment AllVehicleProperties on VehicleProperties {
    abs
    acceleration
    airbagDriver
    airbagFrontSide
    airbagPassenger
    annualTax
    annualBonus
    annualMalus
    brakeAssistance
    chassis
    co2
    colorName
    drivingWheel
    engineCylinders
    engineVolume
    environmentClass
    espSystem
    fuelConsumptionCityDriving
    fuelConsumptionCountryRoadDriving
    fuelConsumptionMixedDriving
    gearboxName
    groundClearence
    hasAutomaticGearbox
    height
    isofixRearSeat
    length
    listPrice
    maxLoadWeight
    maxRoofWeight
    maxSpeed
    ncapMonth
    ncapStar
    ncapYear
    numberOfGears
    seats
    secondaryFuelType
    segment
    serviceWeight
    tankVolume
    tco3Years2500
    tiresFront
    tiresRear
    torque
    trailerTotalWeightB
    trailerTotalWeightBPlus
    trailerWeight
    trcSystem
    trunkSpace
    wheelBase
    width
  }
`;

export default PROPERTIES_FRAGMENT;
