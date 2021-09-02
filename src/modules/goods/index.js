const GET_TOP_GOODS = "get_top_goods";
const UPDATE_TOP_GOODS = "update_top_goods";
const GET_GOODS_DETAIL = "get_goods_detail";
const UPDATE_GOODS_DETAIL = "update_goods_detail";
const GET_GOODS_KIND = "get_goods_kind";
const UPDATE_GET_GOODS_KIND = "update_get_goods_kind";
const GET_GOODS_BY_KIND = "get_goods_by_kind";
const GET_GOODS_BY_SEARCH = "get_goods_by_search";

export const types = {
  GET_TOP_GOODS,
  UPDATE_TOP_GOODS,
  GET_GOODS_DETAIL,
  UPDATE_GOODS_DETAIL,
  GET_GOODS_KIND,
  UPDATE_GET_GOODS_KIND,
  GET_GOODS_BY_KIND,
  GET_GOODS_BY_SEARCH
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

const getGoodsKind = (payload) => ({
  type: GET_GOODS_KIND,
  payload,
});

const updateGoodsKind = (data) => ({
  type: UPDATE_GET_GOODS_KIND,
  data,
});

const getGoodsByKind = (payload) => ({
  type: GET_GOODS_BY_KIND,
  payload,
});

const getGoodsBySearch = (payload) => ({
  type: GET_GOODS_BY_SEARCH,
  payload,
});

export const actions = {
  getTopGoods,
  updateTopGoods,
  getGoodsDetail,
  updateGoodsDetail,
  getGoodsKind,
  updateGoodsKind,
  getGoodsByKind,
  getGoodsBySearch
};

const initialState = {
  topGoods: null,
  goodsDetail: null,
  goodsKind: null
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_TOP_GOODS: {
      return {
        ...state,
        topGoods: action.data,
      };
    }
    case UPDATE_GOODS_DETAIL: {
      return {
        ...state,
        goodsDetail: action.data,
      };
    }
    case UPDATE_GET_GOODS_KIND: {
      return {
        ...state,
        goodsKind: action.data,
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
