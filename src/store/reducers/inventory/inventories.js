import {
  GET_INVENTORY_LIST,
  GET_INVENTORY,
  DELETE_INVENTORY,
  ADD_INVENTORY,
  UPDATE_INVENTORY,
  CHANGE_INVENTORY_STATUS,
} from "../../actions/inventory/actionTypes";
const initialState = {
  inventories: [],
  inventory: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INVENTORY_LIST:
      return {
        ...state,
        inventories: action.payload,
      };
    case GET_INVENTORY:
      return {
        ...state,
        inventory: action.payload,
      };
    case DELETE_INVENTORY:
      return {
        ...state,
        inventories: state.inventories.filter(
          (inventory) => inventory.id !== action.payload
        ),
      };
    case ADD_INVENTORY:
      return {
        ...state,
        inventories: [action.payload, ...state.inventories],
      };
    case CHANGE_INVENTORY_STATUS:
      return {
        ...state,
        inventories: [
          action.payload,
          ...state.inventories.filter((inv) => inv.id !== action.payload.id),
        ],
      };
    case UPDATE_INVENTORY:
      return {
        ...state,
        inventories: [
          action.payload,
          ...state.inventories.filter((inv) => inv.id !== action.payload.id),
        ],
      };
    default:
      return state;
  }
}
