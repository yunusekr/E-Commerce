import { GET_USER } from "../actions";

const initialState = {
  products: [],
  currentUser: null,
  categories: [],
  currentProduct: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
