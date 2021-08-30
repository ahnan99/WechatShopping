import { all, fork } from 'redux-saga/effects'
import userSaga from './user/sagas'
import goodsSaga from './goods/sagas'
import cartSaga from './cart/sagas'
import orderSaga from './order/sagas'

const sagas = [
    userSaga,
    goodsSaga,
    cartSaga,
    orderSaga
]

function* rootSaga(){
    yield all(sagas.map(saga => fork(saga)))
}

export default rootSaga;