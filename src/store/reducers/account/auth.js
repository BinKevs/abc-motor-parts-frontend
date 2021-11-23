import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_ACCOUNT_LIST,
  GET_ACCOUNT,
  GET_ACTIVITY_LOG_LIST,
  GET_ATTENDANCE_LOG_LIST,
  ADD_ACCOUNT,
  UPDATE_ACCOUNT,
  UPDATE_ADDRESS,
  CHANGE_ACCOUNT_STATUS,
  CHANGE_PASSWORD,
  CREATE_ADMIN_ACCOUNT,
  CHECK_PASSWORD,
} from "../../actions/account/types";
import { HandleSuccessMessages } from "../../../Helpers/functions";
import { URL_IMPORT } from "../../../Helpers/constant";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  addresses: [],
  contact_numbers: [],
  is_superuser: null,
  logout: false,
  accounts: [],
  account: {},
  activity_log: [],
  attendance_log: [],
  profile_image: "",
  AdminPasswordValidate: "",
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        is_superuser: action.payload.is_superuser,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case CREATE_ADMIN_ACCOUNT:
      return {
        ...state,
        accounts: [action.payload, ...state.accounts],
      };

    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [action.payload, ...state.accounts],
      };
    case UPDATE_ACCOUNT:
      return {
        ...state,
        account: action.payload,
        user: action.payload.user,
        addresses: action.payload.address,
        contact_number: action.payload.contact_number,
        birthdate: action.payload.birthdate,
        profile_image: URL_IMPORT + action.payload.profile_image,
      };

    case CHANGE_ACCOUNT_STATUS:
      return {
        ...state,
        accounts: [
          action.payload,
          ...state.accounts.filter((acc) => acc.id !== action.payload.id),
        ],
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        addresses: action.payload.address,
        contact_number: action.payload.contact_number,
      };
    case CHECK_PASSWORD:
      return {
        ...state,
        AdminPasswordValidate: action.payload.password,
      };
    case USER_LOADED:
      return {
        ...state,
        account: action.payload,
        user: action.payload.user,
        addresses: action.payload.address,
        contact_number: action.payload.contact_number,
        isAuthenticated: true,
        isLoading: false,
        is_superuser: action.payload.user.is_superuser,
        birthdate: action.payload.birthdate,
        profile_image: URL_IMPORT + action.payload.profile_image,
      };
    case GET_ACCOUNT_LIST:
      return {
        ...state,
        accounts: action.payload,
      };
    case GET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };
    case GET_ACTIVITY_LOG_LIST:
      return {
        ...state,
        activity_log: action.payload,
      };
    case GET_ATTENDANCE_LOG_LIST:
      return {
        ...state,
        attendance_log: action.payload,
      };
    case CHANGE_PASSWORD:
      localStorage.removeItem("token");

    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        logout: true,
        is_superuser: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default AuthReducer;
