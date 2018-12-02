import {
  INCREMENT_VEHICLE_COUNT,
  DECREMENT_VEHICLE_COUNT,
  UPDATE_SEARCH_TIME
} from "./types";

export const incrementVehicleCount = vehicleName => {
  return {
    type: INCREMENT_VEHICLE_COUNT,
    payload: vehicleName
  };
};

export const decrementVehicleCount = vehicleName => {
  return {
    type: DECREMENT_VEHICLE_COUNT,
    payload: vehicleName
  };
};

export const updateTotalSearchTime = time => {
  return {
    type: UPDATE_SEARCH_TIME,
    payload: time
  };
};
