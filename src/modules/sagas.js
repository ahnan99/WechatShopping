import { all, fork } from 'redux-saga/effects'
import userSaga from './user/sagas'
import goodsSaga from './goods/sagas'

const sagas = [
    userSaga,
    goodsSaga
]

function* rootSaga(){
    yield all(sagas.map(saga => fork(saga)))
}

export default rootSaga;