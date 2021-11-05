import {
  GET_SUPPLIER_LIST,
  GET_SUPPLIER,
  DELETE_SUPPLIER,
  ADD_SUPPLIER,
  UPDATE_SUPPLIER,
  GET_SUPPLIER_LIST_WITH_PAGINATION,
  CHANGE_SUPPLIER_STATUS,
} from "../../actions/supplier/actionTypes";
const initialState = {
  suppliers: [],
  suppliersWithPagination: [],

  supplier: {},
  total: 0,
  next: "",
  previous: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUPPLIER_LIST_WITH_PAGINATION:
      return {
        ...state,
        suppliersWithPagination: action.payload.results,
        total: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
      };
    case GET_SUPPLIER_LIST:
      return {
        ...state,
        suppliers: action.payload,
      };
    case GET_SUPPLIER:
      return {
        ...state,
        supplier: action.payload,
      };
    case DELETE_SUPPLIER:
      return {
        ...state,
        suppliers: state.suppliers.filter(
          (supplier) => supplier.id !== action.payload
        ),
      };
    case ADD_SUPPLIER:
      return {
        ...state,
        suppliers: [action.payload, ...state.suppliers],
      };
    case UPDATE_SUPPLIER:
      const index = state.suppliers.findIndex(
        (sup) => sup.id === action.payload.id
      );
      const newArray = [...state.suppliers];
      newArray[index] = action.payload;
      return {
        ...state,
        suppliers: newArray,
      };
    case CHANGE_SUPPLIER_STATUS:
      return {
        ...state,
        suppliers: [
          action.payload,
          ...state.suppliers.filter((sup) => sup.id !== action.payload.id),
        ],
      };
    default:
      return state;
  }
}
