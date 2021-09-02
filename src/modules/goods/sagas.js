import { takeLatest, call, put, all } from 'redux-saga/effects'
import axios from 'taro-axios'
import { actions, types } from './index'


//watchers
function* getTopGoodsWatch() {
    yield takeLatest(types.GET_TOP_GOODS, getTopGoodsWorker)
}

function* getGoodsDetailWatch() {
    yield takeLatest(types.GET_GOODS_DETAIL, getGoodsDetailWorker)
}

function* getGoodsKindWatch() {
    yield takeLatest(types.GET_GOODS_KIND, getGoodsKindWorker)
}

function* getGoodsByKindWatch() {
    yield takeLatest(types.GET_GOODS_BY_KIND, getGoodsByKindWorker)
}

function* getGoodsBySearchWatch() {
    yield takeLatest(types.GET_GOODS_BY_SEARCH, getGoodsBySearchWorker)
}

export function getTopGoodsEndpoint() {
    return axios.get('/goods/getGoodsListHot')
}

export function getGoodsDetailEndpoint(data) {
    return axios.get('/goods/getGoodsInfo', {
        params: data
    })
}

export function getGoodsKindEndpoint() {
    return axios.get('/goods/getGoodsKindList')
}

export function getGoodsByKindEndpoint(data) {
    return axios.get('/goods/getGoodsListByKind', {
        params: data
    })
}

export function getGoodsBySearchEndpoint(data) {
    return axios.get('/goods/getGoodsListByFuzzy', {
        params: data
    })
}

function* getTopGoodsWorker() {
    try {
        const response = yield call(getTopGoodsEndpoint)
        yield put(actions.updateTopGoods(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getGoodsDetailWorker(action) {
    try {
        const response = yield call(getGoodsDetailEndpoint, action.payload)
        yield put(actions.updateGoodsDetail(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getGoodsKindWorker() {
    try {
        const response = yield call(getGoodsKindEndpoint)
        yield put(actions.updateGoodsKind(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getGoodsByKindWorker(action) {
    try {
        const response = yield call(getGoodsByKindEndpoint, action.payload)
        yield put(actions.updateTopGoods(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getGoodsBySearchWorker(action) {
    try {
        const response = yield call(getGoodsBySearchEndpoint, action.payload)
        yield put(actions.updateTopGoods(response.data))
    } catch (error) {
        console.log(error)
    }
}


export const workers = {
    getTopGoodsWorker,
    getGoodsDetailWorker,
    getGoodsKindWorker,
    getGoodsByKindWorker,
    getGoodsBySearchWorker
}

export default function* saga() {
    yield all([
        getTopGoodsWatch(),
        getGoodsDetailWatch(),
        getGoodsKindWatch(),
        getGoodsByKindWatch(),
        getGoodsBySearchWatch()
    ])
}