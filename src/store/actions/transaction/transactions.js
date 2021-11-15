import axios from "axios";
import { URL_IMPORT } from "../../../Helpers/constant";
import { tokenConfig } from "../account/auth";
import {
  GET_TRANSACTION_LIST,
  GET_TRANSACTION,
  DELETE_TRANSACTION,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  ADD_TRANSACTION_ITEMS,
  GET_TRANSACTION_ITEM_LIST,
  UPDATE_TRANSACTION_STATUS,
  ADD_REFUND,
  GET_REFUND_LIST,
  UPDATE_REFUND,
} from "./actionTypes";
import swal from "sweetalert";
import { HandleSuccessMessages } from "../../../Helpers/functions";
const url = URL_IMPORT + "/api/transactions/";
export const getTransactionList = () => (dispatch, getState) => {
  axios
    .get(url + "?ordering=-created_at", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_TRANSACTION_LIST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const getTransactionListNotOrderByDate = () => (dispatch, getState) => {
  axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_TRANSACTION_LIST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getTransaction = (TransactionID) => (dispatch, getState) => {
  axios
    .get(url + TransactionID + "/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_TRANSACTION,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const deleteTransaction = (TransactionID) => (dispatch, getState) => {
  axios
    .delete(url + TransactionID + "/", tokenConfig(getState))
    .then((res) => {
      console.log("Transaction Deleted");
      dispatch({
        type: DELETE_TRANSACTION,
        payload: TransactionID,
      });
    })
    .catch((err) => console.log(err));
};

export const updateTransaction =
  (TransactionID, data) => (dispatch, getState) => {
    axios
      .put(url + TransactionID + "/", data, tokenConfig(getState))
      .then((res) => {
        console.log("Transaction Updated");
        dispatch({
          type: UPDATE_TRANSACTION,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

// Transaction Items part
export const getTransactionItemList = () => (dispatch, getState) => {
  axios
    .get(
      URL_IMPORT + "/api/transactions/items/?ordering=-id",
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_TRANSACTION_ITEM_LIST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Sending the transaction items together with the transaction information such as amount rendered, change, total amount and quantity

export const addTransaction = (data) => (dispatch, getState) => {
  axios
    .post(url, data, tokenConfig(getState))
    .then((res) => {
      swal({
        title: "Thank you for shopping with us!",
        text: "You can check the status of your product in the User/Purchases",
        icon: "success",
      });
      dispatch({
        type: ADD_TRANSACTION,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const updateTransactionStatus =
  (TransactionID, data) => (dispatch, getState) => {
    axios
      .put(url + TransactionID + "/", data, tokenConfig(getState))
      .then((res) => {
        HandleSuccessMessages("Transaction Status Updated", "success");
        dispatch({
          type: UPDATE_TRANSACTION_STATUS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

export const addReview = (TransactionID, data) => (dispatch, getState) => {
  axios
    .put(url + TransactionID + "/", data, tokenConfig(getState))
    .then((res) => {
      HandleSuccessMessages("Review Added", "success");

      dispatch({
        type: UPDATE_TRANSACTION_STATUS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const addRefund = (data) => (dispatch, getState) => {
  axios
    .post(
      URL_IMPORT + "/api/refunds/?ordering=-created_at",
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      swal({
        title: "Refund/Return Submitted Successfully",
        text: "We notified the administration for you request. Just wait for their response. Thank you. Sorry for the inconvenience.",
        icon: "success",
      });
      dispatch({
        type: ADD_REFUND,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const getRefundList = () => (dispatch, getState) => {
  axios
    .get(
      URL_IMPORT + "/api/refunds/?ordering=-created_at",
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_REFUND_LIST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const updateRefund = (RefundID, data) => (dispatch, getState) => {
  axios
    .put(
      URL_IMPORT + "/api/refunds/" + RefundID + "/",
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      HandleSuccessMessages("Refund Updated", "success");
      dispatch({
        type: UPDATE_REFUND,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};
