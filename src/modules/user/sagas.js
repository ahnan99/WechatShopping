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

export const workers = {
    userLoginWorker,
    getMemberWorker
}

export default function* saga() {
    yield all([
        loginWatch(),
        getMemberWatch()
    ])
}