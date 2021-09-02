import { takeLatest, call, put, all } from 'redux-saga/effects'
import axios from 'taro-axios'
import { actions, types } from './index'


//watchers
function* loginWatch() {
    yield takeLatest(types.REQUEST_LOGIN, userLoginWorker)
}

function* getMemberWatch() {
    yield takeLatest(types.GET_MEMBER, getMemberWorker)
}

function* getRefereeListWatch() {
    yield takeLatest(types.GET_REFEREE_LIST, getRefereeListWorker)
}

function* getPointListWatch() {
    yield takeLatest(types.GET_MEMBER, getPointListWorker)
}

export function userLoginEndpoint(data) {
    return axios.get('/users/login?referee=xs2s', {
        params: data
    })
}

export function getMemberEndpoint(data) {
    return axios.get('/users/getMemberInfo', {
        params: data
    })
}


export function getRefereeListEndpoint(data) {
    return axios.get('/users/getRefereeList', {
        params: data
    })
}

export function getPointListEndpoint(data) {
    return axios.get('/users/getPointsList', {
        params: data
    })
}

function* userLoginWorker(action) {
    try {
        const response = yield call(userLoginEndpoint, action.payload)
        yield put(actions.updateUserLogin(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getMemberWorker(action) {
    try {
        const response = yield call(getMemberEndpoint, action.payload)
        yield put(actions.updateMember(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getRefereeListWorker(action) {
    try {
        const response = yield call(getRefereeListEndpoint, action.payload)
        yield put(actions.updateRefereeList(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* getPointListWorker(action) {
    try {
        const response = yield call(getPointListEndpoint, action.payload)
        yield put(actions.updatePointList(response.data))
    } catch (error) {
        console.log(error)
    }
}

export const workers = {
    userLoginWorker,
    getMemberWorker,
    getRefereeListWorker,
    getPointListWorker
}

export default function* saga() {
    yield all([
        loginWatch(),
        getMemberWatch(),
        getRefereeListWatch(),
        getPointListWatch()
    ])
}