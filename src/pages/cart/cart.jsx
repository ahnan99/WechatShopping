import { Component } from "react";
import { View, Button, Text } from "@tarojs/components";
import Taro from "@tarojs/taro"
import {
    AtInputNumber,
  } from "taro-ui";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/input-number.scss";
import { actions as CartActions } from "../../modules/cart";
import "./cart.css";
import API_CART from "../../api/cart.json";


class cart extends Component {

  constructor () {
    super(...arguments)
    this.handleChange.bind(this)
  }

  componentDidMount() {
    console.log("cart loaded");
  }

  componentDidUpdate = prevProps => {
    if(!prevProps.cart.postUpdateQty && this.props.cart.postUpdateQty){
      if(this.props.cart.postUpdateQty.status === 0){
        this.props.actions.getCart();
      }else{
        Taro.showToast({
          title: '修改数量错误',
          icon: 'error',
          duration: 2000
        })
      }
      this.props.actions.updatePostUpdateQty(null)
    }

    if(!prevProps.cart.postRemoveGoods && this.props.cart.postRemoveGoods){
      if(this.props.cart.postRemoveGoods.status === 0){
        this.props.actions.getCart();
        Taro.showToast({
          title: '移除物品成功',
          icon: 'success',
          duration: 2000
        })
      }else{
        this.props.actions.getCart();
        Taro.showToast({
          title: '移除物品错误',
          icon: 'error',
          duration: 2000
        })
      }
      this.props.actions.updatePostRemoveGoods(null)
    }
    
  }

  handleChange(value, item) {
    this.props.actions.postUpdateQty({
      ID: item.ID,
      qty: value
    });
  }

  handleDelete = item =>{
    this.props.actions.postRemoveGoods({ID: item.ID})
  }

  componentDidShow() {
    this.props.actions.getCart();
  }

  componentDidHide() {
    this.props.actions.updateCart(null)
  }
  
  render() {
    const {cartContent} = this.props.cart;
    if(!cartContent){
      return(
        <View>
          loading
        </View>
      )
    }
    return (
      <View>
        {cartContent.map((item) => (
          <View className='tr' key={item.ID}>
            <Text>{item.goodsName}</Text>
            <AtInputNumber
              min={1}
              max={99}
              step={1}
              value={item.qty}
              onChange={value=>this.handleChange(value, item)}
            />
            <Button onClick={()=>this.handleDelete(item)}>移除</Button>
          </View>
        ))}

      </View>
    );
  }
}


const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(CartActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(cart);
