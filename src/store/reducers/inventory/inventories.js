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
   const index_status = state.inventories.findIndex(
      (inv) => inv.id === action.payload.id
      );
      const newArray_status = [...state.inventories];
      newArray_status[index_status] = action.payload;
      return {
        ...state,
        inventories: newArray_status,
      };
    case UPDATE_INVENTORY:
  
      const index = state.inventories.findIndex(
      (inv) => inv.id === action.payload.id
      );
      const newArray = [...state.inventories];
      newArray[index] = action.payload;
      return {
        ...state,
        inventories: newArray,
      };
    default:
      return state;
  }
}
