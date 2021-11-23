import {
  GET_PRODUCT_LIST,
  GET_PRODUCT,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  GET_CATEGORY_LIST,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  PRODUCT_LOADING,
  GET_VOUCHER_LIST,
  GET_REVIEW_LIST,
  ADD_REVIEW,
  UPDATE_PRODUCT_VARIATION,
  ADD_PRODUCT_VARIATION,
  CHANGE_PRODUCT_STATUS,
  CHANGE_VOUCHER_STATUS,
  ADD_VOUCHER,
  UPDATE_VOUCHER,
} from "../../actions/product/actionTypes";

const initialState = {
  products: [],
  product: {},
  supplier_name: "",
  images: [],
  categories: [],
  vouchers: [],
  reviews: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PRODUCT_LIST:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        supplier_name: action.payload.supplier_info.name,
        images: action.payload.file_content,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case UPDATE_PRODUCT:
      const index = state.products.findIndex(
        (prod) => prod.id === action.payload.id
      );
      const newArray = [...state.products];
      newArray[index] = action.payload;
      return {
        ...state,
        // products: [
        //   action.payload,
        //   ...state.products.filter((prod) => prod.id !== action.payload.id),
        // ],
        products: newArray,
      };
    case CHANGE_PRODUCT_STATUS:
      return {
        ...state,
        products: [
          action.payload,
          ...state.products.filter((prod) => prod.id !== action.payload.id),
        ],
      };
    case CHANGE_VOUCHER_STATUS:
      return {
        ...state,
        vouchers: [
          action.payload,
          ...state.vouchers.filter((vouch) => vouch.id !== action.payload.id),
        ],
      };

    case UPDATE_PRODUCT_VARIATION:
      return {
        ...state,
        product: action.payload,
        // supplier_name: action.payload.supplier_info.name,
        // images: action.payload.file_content,
      };
    case ADD_PRODUCT_VARIATION:
      return {
        ...state,
        // products: [ action.payload,...state.products],
        products: [
          action.payload,
          ...state.products.filter((prod) => prod.id !== action.payload.id),
        ],
      };
    case GET_CATEGORY_LIST:
      return {
        ...state,
        categories: action.payload,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...state.categories],
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: [
          action.payload,
          ...state.categories.filter((cat) => cat.id !== action.payload.id),
        ],
      };

    case ADD_VOUCHER:
      return {
        ...state,
        vouchers: [action.payload, ...state.vouchers],
      };
    case UPDATE_VOUCHER:
      return {
        ...state,
        vouchers: [
          action.payload,
          ...state.vouchers.filter((vou) => vou.id !== action.payload.id),
        ],
      };

    case GET_VOUCHER_LIST:
      return {
        ...state,
        vouchers: action.payload,
      };
    case GET_REVIEW_LIST:
      return {
        ...state,
        reviews: action.payload,
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [action.payload, ...state.reviews],
      };
    default:
      return state;
  }
}
