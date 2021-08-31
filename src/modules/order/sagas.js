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

export const workers = {
    postPreOrderCartWorker,
    postPreOrderGoodsWorker,
    getPreOrderWorker,
    getPreOrderDetailWorker
}

export default function* saga() {
    yield all([
        postPreOrderCartWatch(),
        postPreOrderGoodsWatch(),
        getPreOrderWatch(),
        getPreOrderDetailWatch()
    ])
}