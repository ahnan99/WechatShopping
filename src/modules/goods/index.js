const GET_TOP_GOODS = "get_top_goods";
const UPDATE_TOP_GOODS = "update_top_goods";
const GET_GOODS_DETAIL = "get_goods_detail";
const UPDATE_GOODS_DETAIL = "update_goods_detail";


export const types = {
    GET_TOP_GOODS,
    UPDATE_TOP_GOODS,
    GET_GOODS_DETAIL,
    UPDATE_GOODS_DETAIL
};

const getTopGoods = (payload) => ({
  type: GET_TOP_GOODS,
  payload,
});

const updateTopGoods = (data) => ({
  type: UPDATE_TOP_GOODS,
  data,
});

const getGoodsDetail = (payload) => ({
    type: GET_GOODS_DETAIL,
    payload,
  });
  
  const updateGoodsDetail = (data) => ({
    type: UPDATE_GOODS_DETAIL,
    data,
  });

export const actions = {
    getTopGoods,
    updateTopGoods,
    getGoodsDetail,
    updateGoodsDetail
};

const initialState = {
    topGoods: null,
    goodsDetail: null
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_TOP_GOODS: {
      return {
        ...state,
        topGoods: action.data
      };
    }
    case UPDATE_GOODS_DETAIL: {
        return {
          ...state,
          goodsDetail: action.data
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
