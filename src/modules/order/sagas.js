import { takeLatest, call, put, all } from 'redux-saga/effects'
import axios from 'taro-axios'
import { actions, types } from './index'


//watchers


function* postPreOrderCartWatch() {
    yield takeLatest(types.POST_PRE_ORDER_CART, postPreOrderCartWorker)
}

function* postPreOrderGoodsWatch() {
    yield takeLatest(types.POST_PRE_ORDER_GOODS, postPreOrderGoodsWorker)
}

function* getPreOrderWatch() {
    yield takeLatest(types.GET_PRE_ORDER, getPreOrderWorker)
}

function* getPreOrderDetailWatch() {
    yield takeLatest(types.GET_PRE_ORDER_DETAIL, getPreOrderDetailWorker)
}

function* getAddressListWatch() {
    yield takeLatest(types.GET_ADDRESS_LIST, getAddressListWorker)
}

function* postAddressWatch() {
    yield takeLatest(types.POST_ADDRESS, postAddressWorker)
}

function* postDelAddressWatch() {
    yield takeLatest(types.POST_DEL_ADDRESS, postDelAddressWorker)
}

function* postPreOrderMemoWatch() {
    yield takeLatest(types.POST_PRE_ORDER_MEMO, postPreOrderMemoWorker)
}


function* postSubmitPreOrderWatch() {
    yield takeLatest(types.POST_SUBMIT_PRE_ORDER, postSubmitPreOrderWorker)
}

function* postSelAddressWatch() {
    yield takeLatest(types.POST_SEL_ADDRESS, postSelAddressWorker)
}

function* getOrderListWatch() {
    yield takeLatest(types.GET_ORDER_LIST, getOrderListWorker)
}

function* getOrderInfoWatch() {
    yield takeLatest(types.GET_ORDER_INFO, getOrderInfoWorker)
}

function* getPreOrderListWatch() {
    yield takeLatest(types.GET_PRE_ORDER_LIST, getPreOrderListWorker)
}

function* postGoodsReceiptWatch() {
    yield takeLatest(types.POST_GOODS_RECEIPT, postGoodsReceiptWorker)
}

function* postCancelPreOrderWatch() {
    yield takeLatest(types.POST_CANCEL_PRE_ORDER, postCancelPreOrderWorker)
}

function* postCancelOrderWatch() {
    yield takeLatest(types.POST_CANCEL_ORDER, postCancelOrderWorker)
}

function* postRevertCancelOrderWatch() {
    yield takeLatest(types.POST_REVERT_CANCEL_ORDER, postRevertCancelOrderWorker)
}

function* postReturnRequirementWatch() {
    yield takeLatest(types.POST_RETURN_REQUIREMENT, postReturnRequirementWorker)
}

function* postRevertReturnRequirementWatch() {
    yield takeLatest(types.POST_REVERT_RETURN_REQUIREMENT, postRevertReturnRequirementWorker)
}

function* postPayPreOrderWatch() {
    yield takeLatest(types.POST_PAY_PRE_OREDER, postPayPreOrderWorker)
}

function* postReturnDeliveryWatch() {
    yield takeLatest(types.POST_RETURN_DELIVERY, postReturnDeliveryWorker)
}

function* postOrderCloseWatch() {
    yield takeLatest(types.POST_ORDER_CLOSE, postOrderCloseWorker)
}

function* getRegionListWatch() {
    yield takeLatest(types.GET_REGION_LIST, getRegionListWorker)
}

function* getCityListWatch() {
    yield takeLatest(types.GET_CITY_LIST, getCityListWorker)
}


function* getDitrictListWatch() {
    yield takeLatest(types.GET_DISTRICT_LIST, getDistrictListWorker)
}



export function postPreOrderCartEndpoint(data) {
    return axios.post('/orders/genPreOrderByCart', data)
}

export function postPreOrderGoodsEndpoint(data) {
    return axios.post('/orders/genPreOrderByShot', data)
}

export function postPreOrderMemoEndpoint(data) {
    return axios.post('/orders/setPreOrderDetailMemo', data)
}

export function getPreOrderEndpoint(data) {
    return axios.get('/orders/getPreOrderInfo', {
        params: data
    })
}

export function getPreOrderDetailEndpoint(data) {
    return axios.get('/orders/getPreOrderDetail', {
        params: data
    })
}

export function getOrderInfoEndpoint(data) {
    return axios.get('/orders/getOrderInfo', {
        params: data
    })
}

export function getAddressListEndpoint() {
    return axios.get('/users/getAddressList')
}

export function postAddressEndpoint(data) {
    return axios.post('/users/updateAddress', data)
}

export function postDelAddressEndpoint(data) {
    return axios.post('/users/delAddress', data)
}

export function postSelAddressEndpoint(data) {
    return axios.post('/orders/setPreOrderAddress', data)
}

export function postSubmitPreOrderEndpoint(data) {
    return axios.post('/orders/submitPreOrder', data)
}

export function getOrderListEndpoint() {
    return axios.get('/orders/getOrderList')
}

export function getPreOrderListEndpoint() {
    return axios.get('/orders/getPreOrderList')
}

export function postGoodsReceiptEndpoint(data) {
    return axios.post('/orders/orderConfirmReceipt', data)
}

export function postCancelPreOrderEndpoint(data) {
    return axios.post('/orders/cancelPreOrder', data)
}

export function postCancelOrderEndpoint(data) {
    return axios.post('/orders/orderCancelAskfor', data)
}

export function postRevertCancelOrderEndpoint(data) {
    return axios.post('/orders/orderCancelAskforCancel', data)
}

export function postReturnRequirementEndpoint(data) {
    return axios.post('/orders/orderReturnAskfor', data)
}

export function postRevertReturnRequirementEndpoint(data) {
    return axios.post('/orders/orderReturnAskforCancel', data)
}

export function postPayPreOrderEndpoint(data) {
    return axios.post('/orders/pay4PreOrder', data)
}

export function postReturnDeliveryEndpoint(data) {
    return axios.post('/orders/orderReturnDelivery', data)
}

export function postOrderCloseEndpoint(data) {
    return axios.post('/orders/orderClose', data)
}

export function getLocationEndpoint(data) {
    return axios.get('/users/getCityList', {
        params: data
    })
}


function* postPreOrderCartWorker(action) {
    try {
        const response = yield call(postPreOrderCartEndpoint, action.payload)
        yield put(actions.updatePostPreOrderCart(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postPreOrderGoodsWorker(action) {
    try {
        const response = yield call(postPreOrderGoodsEndpoint, action.payload)
        yield put(actions.updatePostPreOrderGoods(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postPreOrderMemoWorker(action) {
    try {
        const response = yield call(postPreOrderMemoEndpoint, action.payload)
        yield put(actions.updatePostPreOrderMemo(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getPreOrderWorker(action) {
    try {
        const response = yield call(getPreOrderEndpoint, action.payload)
        yield put(actions.updatePreOrder(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getOrderInfoWorker(action) {
    try {
        const response = yield call(getOrderInfoEndpoint, action.payload)
        yield put(actions.updateOrderInfo(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getPreOrderDetailWorker(action) {
    try {
        const response = yield call(getPreOrderDetailEndpoint, action.payload)
        yield put(actions.updatePreOrderDetail(response.data))
    } catch (error) {
        console.log(error)
    }
}


function* getAddressListWorker() {
    try {
        const response = yield call(getAddressListEndpoint)
        yield put(actions.updateAddressList(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postAddressWorker(action) {
    try {
        const response = yield call(postAddressEndpoint, action.payload)
        yield put(actions.updatePostAddress(response.data))
    } catch (error) {
        console.log(error)
    }
}


function* postDelAddressWorker(action) {
    try {
        const response = yield call(postDelAddressEndpoint, action.payload)
        yield put(actions.updatePostDelAddress(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postSubmitPreOrderWorker(action) {
    try {
        const response = yield call(postSubmitPreOrderEndpoint, action.payload)
        yield put(actions.updatePostSubmitPreOrder(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postSelAddressWorker(action) {
    try {
        const response = yield call(postSelAddressEndpoint, action.payload)
        yield put(actions.updatePostSelAddress(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getOrderListWorker() {
    try {
        const response = yield call(getOrderListEndpoint)
        yield put(actions.updateOrderList(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getPreOrderListWorker() {
    try {
        const response = yield call(getPreOrderListEndpoint)
        yield put(actions.updatePreOrderList(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postGoodsReceiptWorker(action) {
    try {
        const response = yield call(postGoodsReceiptEndpoint, action.payload)
        yield put(actions.updatePostGoodsReceipt(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postCancelOrderWorker(action) {
    try {
        const response = yield call(postCancelOrderEndpoint, action.payload)
        yield put(actions.updatePostCancelOrder(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postRevertCancelOrderWorker(action) {
    try {
        const response = yield call(postRevertCancelOrderEndpoint, action.payload)
        yield put(actions.updatePostRevertCancelOrder(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postCancelPreOrderWorker(action) {
    try {
        const response = yield call(postCancelPreOrderEndpoint, action.payload)
        yield put(actions.updatePostCancelPreOrder(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postReturnRequirementWorker(action) {
    try {
        const response = yield call(postReturnRequirementEndpoint, action.payload)
        yield put(actions.updatePostReturnRequirement(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postRevertReturnRequirementWorker(action) {
    try {
        const response = yield call(postRevertReturnRequirementEndpoint, action.payload)
        yield put(actions.updatePostRevertReturnRequirement(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postPayPreOrderWorker(action) {
    try {
        const response = yield call(postPayPreOrderEndpoint, action.payload)
        yield put(actions.updatePostPayPreOrder(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postReturnDeliveryWorker(action) {
    try {
        const response = yield call(postReturnDeliveryEndpoint, action.payload)
        yield put(actions.updatePostReturnDelivery(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postOrderCloseWorker(action) {
    try {
        const response = yield call(postOrderCloseEndpoint, action.payload)
        yield put(actions.updatePostOrderClose(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getCityListWorker(action) {
    try {
        const response = yield call(getLocationEndpoint, action.payload)
        yield put(actions.updateCityList(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getRegionListWorker(action) {
    try {
        const response = yield call(getLocationEndpoint, action.payload)
        yield put(actions.updateRegionList(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getDistrictListWorker(action) {
    try {
        const response = yield call(getLocationEndpoint, action.payload)
        yield put(actions.updateDistrictList(response.data))
    } catch (error) {
        console.log(error)
    }
}

export const workers = {
    postPreOrderCartWorker,
    postPreOrderGoodsWorker,
    getPreOrderWorker,
    getPreOrderDetailWorker,
    postSelAddressWorker,
    postDelAddressWorker,
    postAddressWorker,
    getAddressListWorker,
    postSubmitPreOrderWorker,
    getOrderListWorker,
    getPreOrderListWorker,
    postPreOrderMemoWorker,
    postGoodsReceiptWorker,
    postCancelOrderWorker,
    postReturnRequirementWorker,
    postPayPreOrderWorker,
    getOrderInfoWorker,
    postRevertCancelOrderWorker,
    postRevertReturnRequirementWorker,
    postOrderCloseWorker,
    postReturnDeliveryWorker,
    getCityListWorker,
    getRegionListWorker,
    getDistrictListWorker
}

export default function* saga() {
    yield all([
        postPreOrderCartWatch(),
        postPreOrderGoodsWatch(),
        getPreOrderWatch(),
        getPreOrderDetailWatch(),
        getAddressListWatch(),
        postDelAddressWatch(),
        postAddressWatch(),
        postSelAddressWatch(),
        postSubmitPreOrderWatch(),
        getOrderListWatch(),
        getPreOrderListWatch(),
        postPreOrderMemoWatch(),
        postGoodsReceiptWatch(),
        postCancelPreOrderWatch(),
        postCancelOrderWatch(),
        postReturnRequirementWatch(),
        postPayPreOrderWatch(),
        getOrderInfoWatch(),
        postRevertCancelOrderWatch(),
        postRevertReturnRequirementWatch(),
        postReturnDeliveryWatch(),
        postOrderCloseWatch(),
        getRegionListWatch(),
        getCityListWatch(),
        getDitrictListWatch()

    ])
}