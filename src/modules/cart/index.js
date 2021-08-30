const POST_NEW_GOODS = "post_new_goods";
const UPDATE_POST_NEW_GOODS = "update_post_new_goods";
const GET_CART = "get_cart";
const UPDATE_CART = "update_cart";
const POST_UPDATE_QTY = "post_update_qty"
const UPDATE_POST_UPDATE_QTY = "update_post_update_qty"
const POST_REMOVE_GOODS = "post_remove_goods";
const UPDATE_POST_REMOVE_GOODS = "update_post_remove_goods";
const POST_EMPTY_CART = "post_empty_cart";
const UPDATE_POST_EMPTY_CART = "update_post_empty_cart";

export const types = {
    POST_NEW_GOODS,
    UPDATE_POST_NEW_GOODS,
    GET_CART,
    UPDATE_CART,
    POST_UPDATE_QTY,
    UPDATE_POST_UPDATE_QTY,
    POST_REMOVE_GOODS,
    UPDATE_POST_REMOVE_GOODS,
    POST_EMPTY_CART,
    UPDATE_POST_EMPTY_CART
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

  const postUpdateQty = (payload) => ({
    type: POST_UPDATE_QTY,
    payload,
  });
  
  const updatePostUpdateQty = (data) => ({
    type: UPDATE_POST_UPDATE_QTY,
    data,
  });

  const postRemoveGoods = (payload) => ({
    type: POST_REMOVE_GOODS,
    payload,
  });
  
  const updatePostRemoveGoods = (data) => ({
    type: UPDATE_POST_REMOVE_GOODS,
    data,
  });

  const postEmptyCart = (payload) => ({
    type: POST_EMPTY_CART,
    payload,
  });
  
  const updatePostEmptyCart = (data) => ({
    type: UPDATE_POST_EMPTY_CART,
    data,
  });
export const actions = {
    postNewGoods,
    updatePostNewGoods,
    getCart,
    updateCart,
    postUpdateQty,
    updatePostUpdateQty,
    postRemoveGoods,
    updatePostRemoveGoods,
    postEmptyCart,
    updatePostEmptyCart
};

const initialState = {
    cartContent: null,
    postNewGoods: null,
    postUpdateQty: null,
    postRemoveGoods: null,
    postEmptyCart: null
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_POST_NEW_GOODS: {
      return {
        ...state,
        postNewGoods: action.data
      };
    }
    case UPDATE_CART: {
        return {
          ...state,
          cartContent: action.data
        };
      }
      case UPDATE_POST_EMPTY_CART: {
        return {
          ...state,
          postEmptyCart: action.data
        };
      }
      case UPDATE_POST_REMOVE_GOODS: {
        return {
          ...state,
          postRemoveGoods: action.data
        };
      }
      case UPDATE_POST_UPDATE_QTY: {
        return {
          ...state,
          postUpdateQty: action.data
        };
      }
      case UPDATE_CART: {
        return {
          ...state,
          cartContent: action.data
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
