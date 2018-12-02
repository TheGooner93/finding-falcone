import {
  FETCH_PLANETS,
  FETCH_VEHICLES,
  INCREMENT_VEHICLE_COUNT,
  DECREMENT_VEHICLE_COUNT,
  FIND_FALCONE
} from "../actions/types";

const initialState = {
  planets: {},
  vehicles: {},
  findFalconeResult: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLANETS:
      return {
        ...state,
        planets: action.payload
      };
    case FETCH_VEHICLES:
      return {
        ...state,
        vehicles: action.payload
      };
    case INCREMENT_VEHICLE_COUNT:
      return {
        ...state,
        vehicles: state.vehicles.map(vehicle => {
          if (vehicle.name === action.payload) {
            return { ...vehicle, total_no: vehicle.total_no + 1 };
          } else {
            return { ...vehicle };
          }
        })
      };
    case DECREMENT_VEHICLE_COUNT:
      return {
        ...state,
        vehicles: state.vehicles.map(vehicle => {
          if (vehicle.name === action.payload && vehicle.total_no) {
            return { ...vehicle, total_no: vehicle.total_no - 1 };
          } else {
            return { ...vehicle };
          }
        })
      };
    case FIND_FALCONE:
      return {
        ...state,
        findFalconeResult: action.payload
      };
    default:
      return state;
  }
};
