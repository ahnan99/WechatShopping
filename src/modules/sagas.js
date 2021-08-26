import { all, fork } from 'redux-saga/effects'
import userSaga from './user/sagas'


const sagas = [
    userSaga
]

function* rootSaga(){
    yield all(sagas.map(saga => fork(saga)))
}

export default rootSaga;