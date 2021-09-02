import { takeLatest, call, put, all } from 'redux-saga/effects'
import axios from 'taro-axios'
import { actions, types } from './index'


//watchers
function* getCartWatch() {
    yield takeLatest(types.GET_CART, getCartWorker)
}

function* postNewGoodsWatch() {
    yield takeLatest(types.POST_NEW_GOODS, postNewGoodsWorker)
}

function* postRemoveGoodsWatch() {
    yield takeLatest(types.POST_REMOVE_GOODS, postRemoveGoodsWorker)
}

function* postEmptyCartWatch() {
    yield takeLatest(types.POST_EMPTY_CART, postEmptyCartWorker)
}

function* postUpdateQtyWatch() {
    yield takeLatest(types.POST_UPDATE_QTY, postUpdateQtyWorker)
}

function* postCalTotalWatch() {
    yield takeLatest(types.POST_CAL_TOTAL, postCalTotalWorker)
}

export function postNewGoodsEndpoint(data) {
    return axios.post('/orders/addCartInfo', data)
}

export function getCartEndpoint() {
    return axios.get('/orders/getCartList')
}

export function postRemoveGoodsEndpoint(data) {
    return axios.post('/orders/removeCartInfo', data)
}

export function postUpdateQtyEndpoint(data) {
    return axios.post('/orders/updateCartQty', data)
}

export function postEmptyCartEndpoint() {
    return axios.post('/orders/emptyCartInfo')
}

export function postCalTotalEndpoint(data) {
    return axios.post('/orders/calTotalPriceByCart', data)
}

function* getCartWorker() {
    try {
        const response = yield call(getCartEndpoint)
        yield put(actions.updateCart(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postNewGoodsWorker(action) {
    try {
        const response = yield call(postNewGoodsEndpoint, action.payload)
        yield put(actions.updatePostNewGoods(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postRemoveGoodsWorker(action) {
    try {
        const response = yield call(postRemoveGoodsEndpoint, action.payload)
        yield put(actions.updatePostRemoveGoods(response.data))
    } catch (error) {
        console.log(error)
    }
}


function* postUpdateQtyWorker(action) {
    try {
        const response = yield call(postUpdateQtyEndpoint, action.payload)
        yield put(actions.updatePostUpdateQty(response.data))
    } catch (error) {
        console.log(error)
    }
}


function* postEmptyCartWorker(action) {
    try {
        const response = yield call(postEmptyCartEndpoint, action.payload)
        yield put(actions.updatePostEmptyCart(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* postCalTotalWorker(action) {
    try {
        const response = yield call(postCalTotalEndpoint, action.payload)
        yield put(actions.updatePostCalTotal(response.data))
    } catch (error) {
        console.log(error)
    }
}


export const workers = {
    getCartWorker,
    postNewGoodsWorker,
    postRemoveGoodsWorker,
    postUpdateQtyWorker,
    postEmptyCartWorker,
    postCalTotalWorker
}

export default function* saga() {
    yield all([
        getCartWatch(),
        postNewGoodsWatch(),
        postRemoveGoodsWatch(),
        postEmptyCartWatch(),
        postUpdateQtyWatch(),
        postCalTotalWatch()
    ])
}