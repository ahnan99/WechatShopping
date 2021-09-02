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

function* postSubmitPreOrderWatch() {
    yield takeLatest(types.POST_SUBMIT_PRE_ORDER, postSubmitPreOrderWorker)
}

function* postSelAddressWatch() {
    yield takeLatest(types.POST_SEL_ADDRESS, postSelAddressWorker)
}

export function postPreOrderCartEndpoint(data) {
    return axios.post('/orders/genPreOrderByCart', data)
}

export function postPreOrderGoodsEndpoint(data) {
    return axios.post('/orders/genPreOrderByShot', data)
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

function* getPreOrderWorker(action) {
    try {
        const response = yield call(getPreOrderEndpoint, action.payload)
        yield put(actions.updatePreOrder(response.data))
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


export const workers = {
    postPreOrderCartWorker,
    postPreOrderGoodsWorker,
    getPreOrderWorker,
    getPreOrderDetailWorker,
    postSelAddressWorker,
    postDelAddressWorker,
    postAddressWorker,
    getAddressListWorker,
    postSubmitPreOrderWorker
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
        postSubmitPreOrderWatch()
    ])
}