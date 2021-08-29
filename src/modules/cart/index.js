const POST_NEW_GOODS = "post_new_goods";
const UPDATE_POST_NEW_GOODS = "update_post_new_goods";
const GET_CART = "get_cart";
const UPDATE_CART = "update_cart";


export const types = {
    POST_NEW_GOODS,
    UPDATE_POST_NEW_GOODS,
    GET_CART,
    UPDATE_CART
};

const postNewGoods = (payload) => ({
  type: POST_NEW_GOODS,
  payload,
});

const updatePostNewGoods = (data) => ({
  type: UPDATE_POST_NEW_GOODS,
  data,
});

const getCart = (payload) => ({
    type: GET_CART,
    payload,
  });
  
  const updateCart = (data) => ({
    type: UPDATE_CART,
    data,
  });

export const actions = {
    postNewGoods,
    updatePostNewGoods,
    getCart,
    updateCart
};

const initialState = {
    cart: null,
    postNewGoods: null
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_POST_NEW_GOODS: {
      return {
        ...state,
        cart: action.data
      };
    }
    case UPDATE_CART: {
        return {
          ...state,
          postNewGoods: action.data
        };
      }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
