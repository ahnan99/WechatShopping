import { Component } from "react";
import { View, Button, Text, Checkbox, CheckboxGroup, Radio } from "@tarojs/components";
import Taro from "@tarojs/taro"
import {
    AtInputNumber,
    AtForm,
    AtButton,
    AtCheckbox,
    AtFab, AtActivityIndicator
} from "taro-ui";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/input-number.scss";
import "taro-ui/dist/style/components/checkbox.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/fab.scss";
import { actions as CartActions } from "../../modules/cart";
import { actions as OrderActions } from "../../modules/order";
import "./cart.css";
import Popup from "../account/Popup"
import API_CART from "../../api/cart.json";
import axios from "taro-axios";
import "taro-ui/dist/style/components/activity-indicator.scss";
import 'taro-ui/dist/style/components/loading.scss';

class cart extends Component {

    constructor() {
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
        if (!prevProps.cart.postUpdateQty && this.props.cart.postUpdateQty) {
            if (this.props.cart.postUpdateQty.status === 0) {
                this.props.actions.postCalTotal({ selList: this.state.selected })
                this.props.actions.getCart();
            } else {
                Taro.showToast({
                    title: '修改数量错误',
                    icon: 'error',
                    duration: 2000
                })
            }
            this.props.actions.updatePostUpdateQty(null)
        }

        if (!prevProps.cart.postRemoveGoods && this.props.cart.postRemoveGoods) {
            if (this.props.cart.postRemoveGoods.status === 0) {
                this.props.actions.getCart();
                Taro.showToast({
                    title: '移除物品成功',
                    icon: 'success',
                    duration: 2000
                })
            } else {
                this.props.actions.getCart();
                Taro.showToast({
                    title: '移除物品错误',
                    icon: 'error',
                    duration: 2000
                })
            }
            this.props.actions.updatePostRemoveGoods(null)
        }

        if (!prevProps.order.postPreOrderCart && this.props.order.postPreOrderCart) {
            if (this.props.order.postPreOrderCart.status === 0) {
                console.log('结算成功')
                Taro.navigateTo({ url: `/pages/order/preOrder?orderID=${this.props.order.postPreOrderCart.preOrderID}` })
            } else {
                Taro.showToast({
                    title: '结算错误',
                    icon: 'error',
                    duration: 2000
                })
            }
            this.props.orderActions.updatePostPreOrderCart(null)
        }

        if (!prevProps.cart.postEmptyCart && this.props.cart.postEmptyCart) {
            if (this.props.cart.postEmptyCart.status === 0) {
                Taro.showToast({
                    title: '购物车已清空',
                    icon: 'success',
                    duration: 2000
                })
                this.props.actions.getCart();
            } else {
                Taro.showToast({
                    title: '清除购物车失败',
                    icon: 'error',
                    duration: 2000
                })
            }
            this.props.actions.updatePostEmptyCart(null)
        }

    }

    onSubmit = () => {
        if (this.state.selected.length === 0) {
            Taro.showToast({
                title: '未选择商品',
                icon: 'error',
                duration: 2000
            })
            return
        }
        console.log(this.state.selected)
        console.log(this.props.order.postPreOrderCart)
        this.props.orderActions.postPreOrderCart({ selList: this.state.selected });

    }



    handleChange(value, item) {
        this.props.actions.postUpdateQty({
            ID: item.ID,
            qty: value
        });
    }

    handleDelete = () => {
        this.props.actions.postRemoveGoods(this.state.selected)
    }

    componentDidShow() {
        this.props.actions.getCart();
        this.props.actions.postCalTotal({ selList: this.state.selected })
    }

    componentDidHide() {
        this.props.actions.updateCart(null)
    }

    onCheckBoxChange = (e) => {
        this.setState({ selected: e.detail.value }, () => { this.props.actions.postCalTotal({ selList: this.state.selected }) })

    }

    onClickEmptyCart = () => {
        this.props.actions.postEmptyCart()
    }


    handleSelectAll = () => {
        console.log(this.state.selected, this.state.selected.length === this.props.cart.cartContent.length)
        if (this.state.selected.length === this.props.cart.cartContent.length) {
            this.setState({ selected: [] }, () => {
                this.props.actions.postCalTotal({ selList: this.state.selected })
            })
        } else {
            let newSelected = []
            this.props.cart.cartContent.map(item => {
                newSelected.push(item.ID.toString())
            })
            this.setState({ selected: newSelected }, () => {
                this.props.actions.postCalTotal({ selList: this.state.selected })
            })
        }

    }


    render() {
        const { cartContent } = this.props.cart;
        if (!cartContent) {
            return (
                <View>
                    <AtActivityIndicator size={64}></AtActivityIndicator>
                </View>
            )
        }
        return (
            <View>
                <Popup isOpened={!this.props.user.infoCompleted} />
                <AtForm onSubmit={this.onSubmit.bind(this)}>
                    <CheckboxGroup onChange={this.onCheckBoxChange}>
                        {cartContent.map((item) => (
                            <View className="goodsList" key={item.ID}>
                                <View className="a-gooods">
                                    <View className="a-goods-conts">
                                        <View className="goods-info">
                                            <View className='radio-box'>
                                                <Checkbox checked={this.state.selected.indexOf(item.ID.toString()) >= 0} value={item.ID} />
                                            </View>
                                            <View className="img-box">
                                                <image mode="aspectFill" src={axios.defaults.baseURL + item.filename} className="img" />
                                            </View>
                                            <View className="text-box">
                                                <View className="goods-title">{item.goodsName}</View>
                                                <View className="goods-title">规格：{item.size}</View>
                                                <View className="goods-price">单价：¥ {item.price}</View>
                                                <View className="buy-num">
                                                    <AtInputNumber
                                                        min={1}
                                                        max={99}
                                                        step={1}
                                                        value={item.qty}
                                                        onChange={value => this.handleChange(value, item)}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </CheckboxGroup>
                    <View className="cart-title">
                        <Text>总计需要支付：{this.props.cart.postCalTotal ? this.props.cart.postCalTotal.total : 0}</Text>
                    </View>
                    <View className='at-row at-row__justify--around'>
                        <View className='at-col at-col-2'> <AtButton circle size="small" type='secondary' onClick={() => this.handleSelectAll()}>全选</AtButton></View>
                        <View className='at-col at-col-2'> <AtButton circle size="small" type='secondary' onClick={() => this.handleDelete()}>删除</AtButton></View>
                        <View className='at-col at-col-2'> <AtButton circle size="small" type='secondary' onClick={() => this.onClickEmptyCart()}>清空</AtButton></View>
                        <View className='at-col at-col-2'> <AtButton circle size="small" type='primary' onClick={() => this.onSubmit()}>去结算</AtButton></View>
                    </View>
                </AtForm>
            </View>
        );
    }
}


const mapStateToProps = (state) => ({
    cart: state.cart,
    order: state.order,
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(CartActions, dispatch),
    orderActions: bindActionCreators(OrderActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(cart);
