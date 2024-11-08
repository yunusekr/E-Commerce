import { GET_PRODUCTS, GET_USER } from "../actions";

const initialState = {
  products: [],
  totalPages: 0,
  currentUser: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, currentUser: action.payload };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.content,
        totalPages: action.payload.totalPages,
      };
    default:
      return state;
  }
};
