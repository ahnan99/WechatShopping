const POST_PRE_ORDER_CART = "post_pre_order_cart";
const UPDATE_POST_PRE_ORDER_CART = "update_post_pre_order_cart";
const POST_PRE_ORDER_GOODS = "post_pre_order_goods";
const UPDATE_POST_PRE_ORDER_GOODS = "update_post_pre_order_goods";
const GET_PRE_ORDER = "get_pre_order";
const UPDATE_PRE_ORDER = "update_pre_order";

export const types = {
  POST_PRE_ORDER_CART,
  UPDATE_POST_PRE_ORDER_CART,
  POST_PRE_ORDER_GOODS,
  UPDATE_POST_PRE_ORDER_GOODS,
  GET_PRE_ORDER,
  UPDATE_PRE_ORDER,
};

const postPreOrderCart = (payload) => ({
  type: POST_PRE_ORDER_CART,
  payload,
});

const updatePostPreOrderCart = (data) => ({
  type: UPDATE_POST_PRE_ORDER_CART,
  data,
});

const postPreOrderGoods = (payload) => ({
  type: POST_PRE_ORDER_GOODS,
  payload,
});

const updatePostPreOrderGoods = (data) => ({
  type: UPDATE_POST_PRE_ORDER_GOODS,
  data,
});

const getPreOrder = (payload) => ({
  type: GET_PRE_ORDER,
  payload,
});

const updatePreOrder = (data) => ({
  type: UPDATE_PRE_ORDER,
  data,
});

export const actions = {
  postPreOrderCart,
  updatePostPreOrderCart,
  postPreOrderGoods,
  updatePostPreOrderGoods,
  getPreOrder,
  updatePreOrder,
};

const initialState = {
  postPreOrderCart: null,
  postPreOrderGoods: null,
  preOrder: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_POST_PRE_ORDER_CART: {
      return {
        ...state,
        topGoods: action.data,
      };
    }
    case UPDATE_POST_PRE_ORDER_CART: {
      return {
        ...state,
        postPreOrderCart: action.data,
      };
    }
    case UPDATE_POST_PRE_ORDER_GOODS: {
      return {
        ...state,
        postPreOrderGoods: action.data,
      };
    }
    case UPDATE_PRE_ORDER: {
      return {
        ...state,
        preOrder: action.data,
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
