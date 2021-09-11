import { Component } from "react";
import { View, Button, Text, Checkbox, CheckboxGroup } from "@tarojs/components";
import Taro from "@tarojs/taro"
import {
    AtInputNumber,
    AtForm,
  } from "taro-ui";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/input-number.scss";
import "taro-ui/dist/style/components/checkbox.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/flex.scss";
import { actions as CartActions } from "../../modules/cart";
import { actions as OrderActions } from "../../modules/order";
import "./cart.css";
import API_CART from "../../api/cart.json";


class cart extends Component {

  constructor () {
    super(...arguments)
    this.handleChange.bind(this)
    this.state = {
      selected: ''
    }
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

    if(!prevProps.order.postPreOrderCart && this.props.order.postPreOrderCart){
      if(this.props.order.postPreOrderCart.status === 0){
        console.log('结算成功')
        Taro.navigateTo({url: `/pages/order/preOrder?orderID=${this.props.order.postPreOrderCart.preOrderID}`})
      }else{
        Taro.showToast({
          title: '结算错误',
          icon: 'error',
          duration: 2000
        })
      }
      this.props.orderActions.updatePostPreOrderCart(null)
    }

    if(!prevProps.cart.postEmptyCart && this.props.cart.postEmptyCart){
      if(this.props.cart.postEmptyCart.status === 0){  
        Taro.showToast({
          title: '购物车已清空',
          icon: 'success',
          duration: 2000
        })
        this.props.actions.getCart();
      }else{
        Taro.showToast({
          title: '清除购物车失败',
          icon: 'error',
          duration: 2000
        })
      }
      this.props.actions.updatePostEmptyCart(null)
    }
    
  }

  onSubmit (event) {
    console.log(this.state.selected)
    console.log(this.props.order.postPreOrderCart)
    this.props.orderActions.postPreOrderCart({selList: this.state.selected});

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
    this.props.actions.postCalTotal({selList: this.state.selected})
  }

  componentDidHide() {
    this.props.actions.updateCart(null)
  }

  onCheckBoxChange = (e) => {
    this.setState({selected: e.detail.value},()=>{this.props.actions.postCalTotal({selList: this.state.selected})})

  }

  onClickEmptyCart = () => {
    this.props.actions.postEmptyCart()
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
        <AtForm onSubmit={this.onSubmit.bind(this)}>
          <CheckboxGroup onChange={this.onCheckBoxChange}>
        {cartContent.map((item) => (
          <View className='at-row' key={item.ID}>
            <View className='at-col--auto'>
            <Checkbox value={item.ID} />
            </View>
            <View className='at-col--auto'>
            <Text>{item.goodsName}</Text>
            </View>
            <View className='at-col--auto'>
            <AtInputNumber
              min={1}
              max={99}
              step={1}
              value={item.qty}
              onChange={value=>this.handleChange(value, item)}
            />
            </View>
            <View className='at-col--auto'>
            <Button onClick={()=>this.handleDelete(item)}>移除</Button>
            </View>
          </View>
        ))}
        </CheckboxGroup>
        <View>
          <Text>总计：{this.props.cart.postCalTotal?this.props.cart.postCalTotal.total:0}</Text>
          </View>
        <View>
          <Button formType='submit'>结算</Button>
        </View>
        <View>
          <Button onClick={()=>this.onClickEmptyCart()}>清空</Button>
        </View>
        </AtForm>
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
  cart: state.cart,
  order: state.order
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(CartActions, dispatch),
  orderActions: bindActionCreators(OrderActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(cart);
