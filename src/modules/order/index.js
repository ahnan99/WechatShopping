const POST_PRE_ORDER_CART = "post_pre_order_cart";
const UPDATE_POST_PRE_ORDER_CART = "update_post_pre_order_cart";
const POST_PRE_ORDER_GOODS = "post_pre_order_goods";
const UPDATE_POST_PRE_ORDER_GOODS = "update_post_pre_order_goods";
const GET_PRE_ORDER = "get_pre_order";
const UPDATE_PRE_ORDER = "update_pre_order";
const GET_PRE_ORDER_DETAIL = "get_pre_order_detail";
const UPDATE_PRE_ORDER_DETAIL = "update_pre_order_detail";
const GET_ADDRESS_LIST = "get_address_list"
const UPDATE_ADDRESS_LIST = "update_address_list"
const POST_ADDRESS = "post_address"
const UPDATE_POST_ADDRESS = "update_post_address"
const POST_DEL_ADDRESS = "del_address"
const UPDATE_POST_DEL_ADDRESS = "update_post_sel_address"
const POST_SEL_ADDRESS = "del_address"
const UPDATE_POST_SEL_ADDRESS = "update_post_sel_address"
const POST_SUBMIT_PRE_ORDER = "post_submit_pre_order"
const UPDATE_POST_SUBMIT_PRE_ORDER = "update_post_submit_pre_order"
const GET_ORDER_LIST = "get_order_list"
const UPDATE_ORDER_LIST = "update_order_list"


export const types = {
  POST_PRE_ORDER_CART,
  UPDATE_POST_PRE_ORDER_CART,
  POST_PRE_ORDER_GOODS,
  UPDATE_POST_PRE_ORDER_GOODS,
  GET_PRE_ORDER,
  UPDATE_PRE_ORDER,
  GET_PRE_ORDER_DETAIL,
  UPDATE_PRE_ORDER_DETAIL,
  GET_ADDRESS_LIST,
  UPDATE_ADDRESS_LIST,
  POST_ADDRESS,
  UPDATE_POST_ADDRESS,
  POST_DEL_ADDRESS,
  UPDATE_POST_DEL_ADDRESS,
  UPDATE_POST_SEL_ADDRESS,
  POST_SEL_ADDRESS,
  POST_SUBMIT_PRE_ORDER,
  UPDATE_POST_SUBMIT_PRE_ORDER,
  GET_ORDER_LIST,
  UPDATE_ORDER_LIST
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

const getPreOrderDetail = (payload) => ({
  type: GET_PRE_ORDER_DETAIL,
  payload,
});

const updatePreOrderDetail = (data) => ({
  type: UPDATE_PRE_ORDER_DETAIL,
  data,
});

const getAddressList = (payload) => ({
  type: GET_ADDRESS_LIST,
  payload,
});

const updateAddressList = (data) => ({
  type: UPDATE_ADDRESS_LIST,
  data,
});

const postAddress = (payload) => ({
  type: POST_ADDRESS,
  payload,
});

const updatePostAddress = (data) => ({
  type: UPDATE_POST_ADDRESS,
  data,
});


const postDelAddress = (payload) => ({
  type: POST_DEL_ADDRESS,
  payload,
});

const updatePostDelAddress = (data) => ({
  type: UPDATE_POST_DEL_ADDRESS,
  data,
});

const postSelAddress = (payload) => ({
  type: POST_SEL_ADDRESS,
  payload,
});

const updatePostSelAddress = (data) => ({
  type: UPDATE_POST_SEL_ADDRESS,
  data,
});

const postSubmitPreOrder = (payload) => ({
  type: POST_SUBMIT_PRE_ORDER,
  payload,
});

const updatePostSubmitPreOrder = (data) => ({
  type: UPDATE_POST_SUBMIT_PRE_ORDER,
  data,
});

const getOrderList = (payload) => ({
  type: GET_ORDER_LIST,
  payload,
});

const updateOrderList = (data) => ({
  type: UPDATE_ORDER_LIST,
  data,
});


export const actions = {
  postPreOrderCart,
  updatePostPreOrderCart,
  postPreOrderGoods,
  updatePostPreOrderGoods,
  getPreOrder,
  updatePreOrder,
  getPreOrderDetail,
  updatePreOrderDetail,
  getAddressList,
  updateAddressList,
  postAddress,
  updatePostAddress,
  postDelAddress,
  updatePostDelAddress,
  postSelAddress,
  updatePostSelAddress,
  postSubmitPreOrder,
  updatePostSubmitPreOrder,
  getOrderList,
  updateOrderList
};

const initialState = {
  postPreOrderCart: null,
  postPreOrderGoods: null,
  preOrder: null,
  preOrderDetail: null,
  addressList: null,
  postAddress: null,
  postDelAddress: null,
  postSelAddress: null,
  postSubmitPreOrder: null,
  orderList: null
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
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
    case UPDATE_PRE_ORDER_DETAIL: {
      return {
        ...state,
        preOrderDetail: action.data,
      };
    }
    case UPDATE_ADDRESS_LIST: {
      return {
        ...state,
        addressList: action.data,
      };
    }
    case UPDATE_POST_ADDRESS: {
      return {
        ...state,
        postAddress: action.data,
      };
    }
    case UPDATE_POST_DEL_ADDRESS: {
      return {
        ...state,
        postDelAddress: action.data,
      };
    }
    case UPDATE_POST_SEL_ADDRESS: {
      return {
        ...state,
        postSelAddress: action.data,
      };
    }
    case UPDATE_POST_SUBMIT_PRE_ORDER: {
      return {
        ...state,
        postSubmitPreOrder: action.data,
      };
    }
    case UPDATE_ORDER_LIST: {
      return {
        ...state,
        orderList: action.data,
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
