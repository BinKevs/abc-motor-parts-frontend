import axios from "axios";
import { URL_IMPORT } from "../../../Helpers/constant";
import { tokenConfig } from "../account/auth";
import {
  GET_PRODUCT_LIST,
  GET_PRODUCT,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  CHANGE_PRODUCT_STATUS,
  UPDATE_PRODUCT,
  GET_CATEGORY_LIST,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  PRODUCT_LOADING,
  GET_VOUCHER_LIST,
  ADD_VOUCHER,
  ADD_REVIEW,
  GET_REVIEW_LIST,
  UPDATE_PRODUCT_VARIATION,
  ADD_PRODUCT_VARIATION,
  UPDATE_VOUCHER,
} from "./actionTypes";
import swal from "sweetalert";
import { HandleSuccessMessages } from "../../../Helpers/functions";
const url = URL_IMPORT + "/api/products/";
export const getProductList = () => (dispatch, getState) => {
  dispatch({ type: PRODUCT_LOADING });
  axios
    .get(url + "?ordering=-id", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_PRODUCT_LIST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
  // .catch((err) =>
  //   swal({
  //     title: "Getting Product List Failed",
  //     text: "Error : " + err,
  //     icon: "error",
  //   })
  // );
};
export const getProduct = (ProductID) => (dispatch, getState) => {
  axios
    .get(url + ProductID + "/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
  // .catch((err) =>
  //   swal({
  //     title: "Getting Product Failed",
  //     text: "Error : " + err,
  //     icon: "error",
  //   })
  // );
};
export const deleteProduct = (ProductID) => (dispatch, getState) => {
  axios
    .delete(url + ProductID + "/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: ProductID,
      });
    })
    .catch((err) =>
      swal({
        title: "Product Deletion Failed",
        text: "Error : " + err,
        icon: "error",
      })
    );
};
export const addProduct = (data) => (dispatch, getState) => {
  console.log(data);
  axios
    .post(url, data, tokenConfig(getState))
    .then((res) => {
      HandleSuccessMessages("Product Added", "success");
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data,
      });
    })
    .catch(
      (err) =>
        swal({
          title: "Product Addition Failed",
          text: "Error : " + err,
          icon: "error",
        })
      // console.log(err)
    );
};
export const updateProduct = (ProductID, data) => (dispatch, getState) => {
  axios
    .put(url + ProductID + "/", data, tokenConfig(getState))
    .then((res) => {
      HandleSuccessMessages("Product Updated", "success");
      dispatch({
        type: UPDATE_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) =>
      swal({
        title: "Product Update Failed",
        text: "Error : " + err,
        icon: "error",
      })
    );
};

export const changeProductStatus =
  (ProductID, data) => (dispatch, getState) => {
    axios
      .put(url + ProductID + "/", data, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: CHANGE_PRODUCT_STATUS,
          payload: res.data,
        });
      })
      .catch((err) =>
        swal({
          title: "Change Status Failed",
          text: "Error : " + err,
          icon: "error",
        })
      );
  };

export const addProductVariation = (data) => (dispatch, getState) => {
  axios
    .post(URL_IMPORT + "/api/product_variation/", data, tokenConfig(getState))
    .then((res) => {
      HandleSuccessMessages("Product Variation Added", "success");
      dispatch({
        type: ADD_PRODUCT_VARIATION,
        payload: res.data,
      });
    })
    .catch((err) =>
      swal({
        title: "Product Variation Addition Failed",
        text: "Error : " + err,
        icon: "error",
      })
    );
};

export const updateProductVariation =
  (ProductVariationID, data) => (dispatch, getState) => {
    axios
      .put(
        URL_IMPORT + "/api/product_variation/" + ProductVariationID + "/",
        data,
        tokenConfig(getState)
      )
      .then((res) => {
        HandleSuccessMessages("Product Variation Updated", "success");
        dispatch({
          type: UPDATE_PRODUCT_VARIATION,
          payload: res.data,
        });
      })
      .catch((err) =>
        swal({
          title: "Product Variation Update Failed",
          text: "Error : " + err,
          icon: "error",
        })
      );
  };

// Category part

export const getCategoryList = () => (dispatch, getState) => {
  axios
    .get(URL_IMPORT + "/api/categories/?ordering=-id", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CATEGORY_LIST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
  // .catch((err) =>
  //   swal({
  //     title: "Category Get List Failed",
  //     text: "Error : " + err,
  //     icon: "error",
  //   })
  // );
};

export const addCategory = (data) => (dispatch, getState) => {
  axios
    .post(URL_IMPORT + "/api/categories/", data, tokenConfig(getState))
    .then((res) => {
      HandleSuccessMessages("Category Added", "success");
      dispatch({
        type: ADD_CATEGORY,
        payload: res.data,
      });
    })
    .catch((err) =>
      swal({
        title: "Category Addition Failed",
        text: "Error : " + err,
        icon: "error",
      })
    );
};
export const updateCategory = (CategoryID, data) => (dispatch, getState) => {
  axios
    .put(
      URL_IMPORT + "/api/categories/" + CategoryID + "/",
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      HandleSuccessMessages("Category Updated", "success");
      dispatch({
        type: UPDATE_CATEGORY,
        payload: res.data,
        categoryID: CategoryID,
      });
    })
    .catch((err) =>
      swal({
        title: "Category Update Failed",
        text: "Error : " + err,
        icon: "error",
      })
    );
};

//Vocuhers
export const getVoucherList = () => (dispatch, getState) => {
  axios
    .get(
      URL_IMPORT + "/api/vouchers/?ordering=-created_at",
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: GET_VOUCHER_LIST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const addVoucher = (data) => (dispatch, getState) => {
  axios
    .post(URL_IMPORT + "/api/vouchers/", data, tokenConfig(getState))
    .then((res) => {
      HandleSuccessMessages("Vouchers Added", "success");
      dispatch({
        type: ADD_VOUCHER,
        payload: res.data,
      });
    })
    .catch((err) =>
      swal({
        title: "Vouchers Addition Failed",
        text: "Error : " + err,
        icon: "error",
      })
    );
};
export const updateVoucher = (VoucherID, data) => (dispatch, getState) => {
  axios
    .put(
      URL_IMPORT + "/api/vouchers/" + VoucherID + "/",
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      HandleSuccessMessages("Voucher Updated", "success");
      dispatch({
        type: UPDATE_VOUCHER,
        payload: res.data,
      });
    })
    .catch((err) =>
      swal({
        title: "Voucher Update Failed",
        text: "Error : " + err,
        icon: "error",
      })
    );
};

export const getReviewList = () => (dispatch, getState) => {
  axios
    .get(URL_IMPORT + "/api/reviews/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_REVIEW_LIST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
  // .catch((err) =>
  //   swal({
  //     title: "Review Get List Failed",
  //     text: "Error : " + err,
  //     icon: "error",
  //   })
  // );
};
