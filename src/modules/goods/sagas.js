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

export function getTopGoodsEndpoint() {
    return axios.get('/goods/getGoodsListHot')
}

export function getGoodsDetailEndpoint(data) {
    return axios.get('/goods/getGoodsInfo', {
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


export const workers = {
    getTopGoodsWorker,
    getGoodsDetailWorker
}

export default function* saga() {
    yield all([
        getTopGoodsWatch(),
        getGoodsDetailWatch()
    ])
}