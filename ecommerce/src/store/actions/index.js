export const SAVE_CATEGORY = "SAVE_CATEGORY";
export const SAVE_PRODUCT = "SAVE_PRODUCT";
export const SAVE_PRODUCTWITHOUTSIZEANDCOLOR =
  "SAVE_PRODUCTWITHOUTSIZEANDCOLOR";
export const SAVE_USER = "SAVE_USER";
export const GET_USER = "GET_USER";

import axios from "axios";

// export const getProducts = () => (dispatch) => {
//   axios.get("http://localhost:9000/book/products").then((res) => {
//     dispatch({ type: GET_PRODUCTS, payload: res.data });
//   });
// };

// export const getCategories = () => (dispatch) => {
//   axios.get("http://localhost:9000/book/products/category").then((res) => {
//     dispatch({ type: GET_CATEGORIES, payload: res.data });
//   });
// };

// export const getCategoriesProducts = (id) => (dispatch) => {
//   axios
//     .get("http://localhost:9000/book/products/category/" + id)
//     .then((res) => {
//       dispatch({ type: GET_PRODUCTS, payload: res.data });
//     });
// };

// export const getCurrentProduct = (id) => (dispatch) => {
//   axios.get("http://localhost:9000/book/products/" + id).then((res) => {
//     dispatch({ type: GET_CURRENT_PRODUCT, payload: res.data });
//   });
// };

// export const deleteProduct = (id) => (dispatch) => {
//   axios
//     .delete("http://localhost:9000/book/products/admin/" + id)
//     .then((res) => {
//       dispatch({ type: DELETE_PRODUCT });
//     });
// };

// export const updateProduct = (id, data) => (dispatch) => {
//   axios
//     .put("http://localhost:9000/book/products/admin/" + id, data)
//     .then((res) => {
//       dispatch({ type: UPDATE_PRODUCT });
//     });
// };

export const saveCategory = (data) => (dispatch) => {
  axios
    .post("http://localhost:9000/ecom/admin/addcategory", data)
    .then((res) => {
      dispatch({ type: SAVE_CATEGORY });
    });
};

export const saveProduct =
  (data, categoryid, subcategoryid, sizeid, colorid) => (dispatch) => {
    axios
      .post(
        "http://localhost:9000/ecom/admin/addproducts/" +
          categoryid +
          "/" +
          subcategoryid +
          "/" +
          sizeid +
          "/" +
          colorid,
        data
      )
      .then((res) => {
        dispatch({ type: SAVE_PRODUCT });
      });
  };

export const saveProductwithoutsizeandcolor =
  (data, categoryid, subcategoryid) => (dispatch) => {
    axios
      .post(
        "http://localhost:9000/ecom/admin/addproducts/" +
          categoryid +
          "/" +
          subcategoryid,
        data
      )
      .then((res) => {
        dispatch({ type: SAVE_PRODUCTWITHOUTSIZEANDCOLOR });
      });
  };

export const saveUser = (data) => (dispatch) => {
  axios.post("http://localhost:9000/ecom/auth/register", data).then((res) => {
    dispatch({ type: SAVE_USER });
  });
};

export const getUser = (email, password) => (dispatch) => {
  axios
    .get("http://localhost:9000/ecom/auth/login/" + email + "/" + password)
    .then((res) => {
      dispatch({ type: GET_USER, payload: res.data });
    });
};
