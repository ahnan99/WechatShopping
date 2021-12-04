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
const GET_PRE_ORDER_LIST = "get_pre_order_list"
const UPDATE_PRE_ORDER_LIST = "update_pre_order_list"
const POST_PRE_ORDER_MEMO = "post_pre_order_memo"
const UPDATE_POST_PRE_ORDER_MEMO = "update_pre_order_memo"
const POST_CANCEL_PRE_ORDER = "post_cancel_pre_order"
const UPDATE_POST_CANCEL_PRE_ORDER = "update_post_cancel_pre_order"
const POST_CANCEL_ORDER = "post_cancel_order"
const UPDATE_POST_CANCEL_ORDER = "update_post_cancel_order"
const POST_GOODS_RECEIPT = "post_goods_receipt"
const UPDATE_POST_GOODS_RECEIPT = "update_post_goods_receipt"
const POST_RETURN_REQUIREMENT = "post_return_requirement"
const UPDATE_POST_RETURN_REQUIREMENT = "update_post_return_requirement"
const POST_PAY_PRE_OREDER = "post_pay_pre_order"
const UPDATE_POST_PAY_PRE_ORDER = "update_post_pay_pre_order"
const GET_ORDER_INFO = "get_order_info"
const UPDATE_ORDER_INFO = "update_order_info"
const POST_REVERT_CANCEL_ORDER = "post_revert_cancel_order"
const UPDATE_POST_REVERT_CANCEL_ORDER = "update_post_revert_cancel_order"
const POST_REVERT_RETURN_REQUIREMENT = "post_revert_return_requirement"
const UPDATE_POST_REVERT_RETURN_REQUIREMENT = "update_post_revert_return_requirement"
const POST_RETURN_DELIVERY = "post_return_delivery"
const UPDATE_POST_RETURN_DELIVERY = "update_post_return_delivery"
const POST_ORDER_CLOSE = "post_order_close"
const UPDATE_POST_ORDER_CLOSE = "update_post_order_close"
const GET_CITY_LIST = "get_city_list"
const UPDATE_CITY_LIST = "update_city_list"
const GET_DISTRICT_LIST = "get_distinct_list"
const UPDATE_DISTRICT_LIST = "update_distinct_list"
const GET_REGION_LIST = "get_region_list"
const UPDATE_REGION_LIST = "update_region_list"



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
    UPDATE_ORDER_LIST,
    GET_PRE_ORDER_LIST,
    UPDATE_PRE_ORDER_LIST,
    POST_PRE_ORDER_MEMO,
    UPDATE_POST_PRE_ORDER_MEMO,
    POST_CANCEL_PRE_ORDER,
    UPDATE_POST_CANCEL_PRE_ORDER,
    POST_CANCEL_ORDER,
    UPDATE_POST_CANCEL_ORDER,
    POST_GOODS_RECEIPT,
    UPDATE_POST_GOODS_RECEIPT,
    POST_RETURN_REQUIREMENT,
    UPDATE_POST_RETURN_REQUIREMENT,
    POST_PAY_PRE_OREDER,
    UPDATE_POST_PAY_PRE_ORDER,
    GET_ORDER_INFO,
    UPDATE_ORDER_INFO,
    POST_REVERT_CANCEL_ORDER,
    UPDATE_POST_REVERT_CANCEL_ORDER,
    POST_REVERT_RETURN_REQUIREMENT,
    UPDATE_POST_REVERT_RETURN_REQUIREMENT,
    POST_RETURN_DELIVERY,
    UPDATE_POST_RETURN_DELIVERY,
    POST_ORDER_CLOSE,
    UPDATE_POST_ORDER_CLOSE,
    GET_CITY_LIST,
    UPDATE_CITY_LIST,
    GET_DISTRICT_LIST,
    UPDATE_DISTRICT_LIST,
    GET_REGION_LIST,
    UPDATE_REGION_LIST,
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

const getPreOrderList = (payload) => ({
    type: GET_PRE_ORDER_LIST,
    payload,
});

const updatePreOrderList = (data) => ({
    type: UPDATE_PRE_ORDER_LIST,
    data,
});

const postPreOrderMemo = (payload) => ({
    type: POST_PRE_ORDER_MEMO,
    payload,
});

const updatePostPreOrderMemo = (data) => ({
    type: UPDATE_POST_PRE_ORDER_MEMO,
    data,
});

const postCancelPreOrder = (payload) => ({
    type: POST_CANCEL_PRE_ORDER,
    payload,
});

const updatePostCancelPreOrder = (data) => ({
    type: UPDATE_POST_CANCEL_PRE_ORDER,
    data,
});

const postGoodsReceipt = (payload) => ({
    type: POST_GOODS_RECEIPT,
    payload,
});

const updatePostGoodsReceipt = (data) => ({
    type: UPDATE_POST_GOODS_RECEIPT,
    data,
});

const postReturnRequirement = (payload) => ({
    type: POST_RETURN_REQUIREMENT,
    payload,
});

const updatePostReturnRequirement = (data) => ({
    type: UPDATE_POST_RETURN_REQUIREMENT,
    data,
});

const postRevertReturnRequirement = (payload) => ({
    type: POST_REVERT_RETURN_REQUIREMENT,
    payload,
});

const updatePostRevertReturnRequirement = (data) => ({
    type: UPDATE_POST_REVERT_RETURN_REQUIREMENT,
    data,
});

const postPayPreOrder = (payload) => ({
    type: POST_PAY_PRE_OREDER,
    payload,
});

const updatePostPayPreOrder = (data) => ({
    type: UPDATE_POST_PAY_PRE_ORDER,
    data,
});

const postCancelOrder = (payload) => ({
    type: POST_CANCEL_ORDER,
    payload,
});

const updatePostCancelOrder = (data) => ({
    type: UPDATE_POST_CANCEL_ORDER,
    data,
});

const getOrderInfo = (payload) => ({
    type: GET_ORDER_INFO,
    payload,
});

const updateOrderInfo = (data) => ({
    type: UPDATE_ORDER_INFO,
    data,
});

const postRevertCancelOrder = (payload) => ({
    type: POST_REVERT_CANCEL_ORDER,
    payload,
});

const updatePostRevertCancelOrder = (data) => ({
    type: UPDATE_POST_REVERT_CANCEL_ORDER,
    data,
});

const postReturnDelivery = (payload) => ({
    type: POST_RETURN_DELIVERY,
    payload,
});

const updatePostReturnDelivery = (data) => ({
    type: UPDATE_POST_RETURN_DELIVERY,
    data,
});

const postOrderClose = (payload) => ({
    type: POST_ORDER_CLOSE,
    payload,
});

const updatePostOrderClose = (data) => ({
    type: UPDATE_POST_ORDER_CLOSE,
    data,
});

//todo
const getCityList = (payload) => ({
    type: GET_CITY_LIST,
    payload,
});

const updateCityList = (data) => ({
    type: UPDATE_CITY_LIST,
    data,
});

const getDistrictList = (payload) => ({
    type: GET_DISTRICT_LIST,
    payload,
});

const updateDistrictList = (data) => ({
    type: UPDATE_DISTRICT_LIST,
    data,
});

const getRegionList = (payload) => ({
    type: GET_REGION_LIST,
    payload,
});

const updateRegionList = (data) => ({
    type: UPDATE_REGION_LIST,
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
    updateOrderList,
    getPreOrderList,
    updatePreOrderList,
    postPreOrderMemo,
    updatePostPreOrderMemo,
    postCancelPreOrder,
    updatePostCancelPreOrder,
    postGoodsReceipt,
    updatePostGoodsReceipt,
    postReturnRequirement,
    updatePostReturnRequirement,
    postPayPreOrder,
    updatePostPayPreOrder,
    postCancelOrder,
    updatePostCancelOrder,
    getOrderInfo,
    updateOrderInfo,
    postRevertCancelOrder,
    updatePostRevertCancelOrder,
    postRevertReturnRequirement,
    updatePostRevertReturnRequirement,
    postReturnDelivery,
    updatePostReturnDelivery,
    postOrderClose,
    updatePostOrderClose,
    getCityList,
    updateCityList,
    getDistrictList,
    updateDistrictList,
    getRegionList,
    updateRegionList
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
    orderList: null,
    preOrderList: null,
    postPreOrderMemo: null,
    postCancelPreOrder: null,
    postCacnelOrder: null,
    postReturnRequirement: null,
    postPayPreOrder: null,
    orderInfo: null,
    postRevertCancelOrder: null,
    postRevertReturnRequirement: null,
    postReturnDelivery: null,
    postOrderClose: null,
    cityList: null,
    regionList: null,
    districtList: null
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
        case UPDATE_ORDER_INFO: {
            return {
                ...state,
                orderInfo: action.data,
            };
        }
        case UPDATE_POST_DEL_ADDRESS: {
            return {
                ...state,
                postDelAddress: action.data,
            };
        }
        case UPDATE_POST_REVERT_CANCEL_ORDER: {
            return {
                ...state,
                postRevertCancelOrder: action.data,
            };
        }
        case UPDATE_POST_REVERT_RETURN_REQUIREMENT: {
            return {
                ...state,
                postRevertReturnRequirement: action.data,
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
        case UPDATE_PRE_ORDER_LIST: {
            return {
                ...state,
                preOrderList: action.data,
            };
        }
        case UPDATE_POST_PRE_ORDER_MEMO: {
            return {
                ...state,
                postPreOrderMemo: action.data,
            };
        }
        case UPDATE_POST_CANCEL_PRE_ORDER: {
            return {
                ...state,
                postCancelPreOrder: action.data,
            };
        }
        case UPDATE_POST_CANCEL_ORDER: {
            return {
                ...state,
                postCacnelOrder: action.data,
            };
        }
        case UPDATE_POST_RETURN_DELIVERY: {
            return {
                ...state,
                postReturnDelivery: action.data,
            };
        }
        case UPDATE_POST_ORDER_CLOSE: {
            return {
                ...state,
                postOrderClose: action.data,
            };
        }
        case UPDATE_POST_GOODS_RECEIPT: {
            return {
                ...state,
                postGoodsReceipt: action.data,
            };
        }
        case UPDATE_POST_PAY_PRE_ORDER: {
            return {
                ...state,
                postPayPreOrder: action.data,
            };
        }
        case UPDATE_POST_RETURN_REQUIREMENT: {
            return {
                ...state,
                postReturnRequirement: action.data,
            };
        }
        case UPDATE_REGION_LIST: {
            return {
                ...state,
                regionList: action.data,
            };
        }
        case UPDATE_DISTRICT_LIST: {
            return {
                ...state,
                districtList: action.data,
            };
        }
        case UPDATE_CITY_LIST: {
            return {
                ...state,
                cityList: action.data,
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
