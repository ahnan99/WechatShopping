import { combineReducers } from 'redux'
import userReducer from './user'
import goodsReducer from './goods'
import cartReducer from './cart'
import orderReducer from './order'

export default combineReducers({
  user: userReducer,
  goods: goodsReducer,
  cart: cartReducer,
  order: orderReducer
})
