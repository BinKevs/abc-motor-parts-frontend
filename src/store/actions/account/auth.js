import axios from "axios";
import { URL_IMPORT, URL_FOR_LOGIN } from "../../../Helpers/constant";
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
  UPDATE_ADMIN_ACCOUNT,
} from "./types";
import swal from "sweetalert";
import { HandleSuccessMessages } from "../../../Helpers/functions";
export const forgot_password = (data) => (dispatch, getState) => {
  axios
    .post(URL_IMPORT + "/api/password_reset/", data, tokenConfig(getState))
    .then((res) => {
      swal({
        icon: "success",
        title: "Reset password",
        text: "A verification email has been sent to your email. \nPlease verify it",
        // icon: "https://www.kindpng.com/picc/m/285-2852276_email-id-verification-reminder-plugin-verify-email-illustration.png",
        // icon: "https://cdn.iconscout.com/icon/free/png-256/email-mail-envelope-right-true-verify-verified-2-18068.png",
      });
    })
    .catch((err) => console.log(err));
};
export const reset_password = (data) => (dispatch, getState) => {
  axios
    .post(
      URL_IMPORT + "/api/password_reset/confirm/",
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      swal({
        icon: "success",
        title: "Password Reset Successfully",
        text: "You will be redirected to Login Page",
        timer: 3000,
      }).then(function () {
        window.location.href = URL_FOR_LOGIN;
      });
    })
    .catch((err) => console.log(err));
};
export const ChangePassword = (UserID, data) => (dispatch, getState) => {
  axios
    .put(
      URL_IMPORT + "/api/auth/ChangePassword/" + UserID + "/",
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: CHANGE_PASSWORD,
        payload: res.data,
      });
      swal(
        "Password successfully updated.\n Please login with you new password.",
        "",
        "success"
      ).then(function () {
        window.location.href = URL_FOR_LOGIN;
      });
    })
    .catch((err) =>
      swal("Incorect current password.\n Please try again.", "", "error")
    );
};
export const ChangeAdminAccountPassword =
  (UserID, data) => (dispatch, getState) => {
    axios
      .put(
        URL_IMPORT + "/api/auth/ChangePassword/" + UserID + "/",
        data,
        tokenConfig(getState)
      )
      .then((res) => {
        // dispatch({
        //   type: CHANGE_ADMIN_ACCOUNT_PASSWORD,
        //   payload: res.data,
        // });
        swal("Account Password successfully updated.", "", "success");
      })
      .catch((err) =>
        swal("Incorect current password.\n Please try again.", "", "error")
      );
  };
export const CheckAdminPassword = (UserID, data) => (dispatch, getState) => {
  axios
    .put(
      URL_IMPORT + "/api/auth/CheckPassword/" + UserID + "/",
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: CHECK_PASSWORD,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => console.log(err));
};

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  axios
    .get(URL_IMPORT + "/api/auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: AUTH_ERROR,
      });
    });
};
export const AddAccount = (data) => (dispatch, getState) => {
  axios
    .post(URL_IMPORT + "/api/auth/setting", data, tokenConfig(getState))
    .then((res) => {
      HandleSuccessMessages("Account Added", "success");
      dispatch({
        type: ADD_ACCOUNT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const UpdateAccount = (AccountID, data) => (dispatch, getState) => {
  axios
    .put(URL_IMPORT + "/api/auth/" + AccountID, data, tokenConfig(getState))
    .then((res) => {
      HandleSuccessMessages("Account Updated", "success");
      dispatch({
        type: UPDATE_ACCOUNT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const UpdateAdminAccount = (AccountID, data) => (dispatch, getState) => {
  axios
    .put(URL_IMPORT + "/api/auth/" + AccountID, data, tokenConfig(getState))
    .then((res) => {
      HandleSuccessMessages("Account Updated", "success");
      dispatch({
        type: UPDATE_ADMIN_ACCOUNT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const changeAccountStatus =
  (AccountID, data) => (dispatch, getState) => {
    axios
      .put(URL_IMPORT + "/api/auth/" + AccountID, data, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: CHANGE_ACCOUNT_STATUS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

export const login = (username, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, password });
  axios
    .post(URL_IMPORT + "/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      swal({
        title: "Authentication failed",
        text: "Sorry, we could not find an account with that username and email. Please try again. :)",
        icon: "error",
      });
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};
export const register =
  ({
    username,
    password,
    email,
    first_name,
    last_name,
    region,
    address,
    contact_number,
    birthdate,
  }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      username,
      password,
      email,
      first_name,
      last_name,
      region,
      address,
      contact_number,
      birthdate,
    });
    axios
      .post(URL_IMPORT + "/api/auth/register", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        swal({
          title: "Success!",
          text: "Congratulations, your account has been successfully created. :)",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };
export const createAdminAccount =
  ({
    username,
    password,
    email,
    first_name,
    last_name,
    address,
    contact_number,
    birthdate,
  }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      username,
      password,
      email,
      first_name,
      last_name,
      address,
      contact_number,
      birthdate,
    });
    axios
      .post(URL_IMPORT + "/api/auth/admin/create", body, config)
      .then((res) => {
        dispatch({
          type: CREATE_ADMIN_ACCOUNT,
          payload: res.data,
        });
        swal({
          title: "Success!",
          text: "Congratulations, your account has been successfully created. :)",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };
export const logout = () => (dispatch, getState) => {
  axios
    .post(URL_IMPORT + "/api/auth/logout/", null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Account setting fetching account list
export const getAccountList = () => (dispatch, getState) => {
  axios
    .get(URL_IMPORT + "/api/accounts/" + "?ordering=-id", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ACCOUNT_LIST,
        payload: res.data,
      });
    });
};
export const getAccount = (AccountID) => (dispatch, getState) => {
  axios
    .get(URL_IMPORT + "/api/accounts/" + AccountID + "/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ACCOUNT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
// Fetching activity log
export const getActivityLogList = () => (dispatch, getState) => {
  axios
    .get(URL_IMPORT + "/api/activity_log/?ordering=-id", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ACTIVITY_LOG_LIST,
        payload: res.data,
      });
    });
};

// Fetching attendance log
export const getAttendanceLogList = () => (dispatch, getState) => {
  axios
    .get(URL_IMPORT + "/api/attendance_log/?ordering=id", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ATTENDANCE_LOG_LIST,
        payload: res.data,
      });
    });
};
// export const UpdateAccountInfo = (AccountID, data) => (dispatch, getState) => {
//   axios
//     .put(
//       URL_IMPORT + "/api/address/" + AccountID + "/",
//       data,
//       tokenConfig(getState)
//     )
//     .then((res) => {
//       HandleSuccessMessages("Address Updated", "success");
//       dispatch({
//         type: UPDATE_ADDRESS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => console.log(err));
// };
export const UpdateAddress = (AddressID, data) => (dispatch, getState) => {
  axios
    .put(
      URL_IMPORT + "/api/address/" + AddressID + "/",
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      HandleSuccessMessages("Contact Details Updated", "success");
      dispatch({
        type: UPDATE_ADDRESS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().AuthReducer.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
