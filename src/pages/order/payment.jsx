import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from "react-redux";
import { View, Button, Text, Image } from "@tarojs/components";
import { AtSearchBar, AtDrawer, AtButton, AtActivityIndicator } from 'taro-ui'
import { actions as OrderActions } from "../../modules/order";
import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/activity-indicator.scss";
import 'taro-ui/dist/style/components/loading.scss';
import "./order.css";

class payment extends Component {

    componentDidMount() {
        console.log(Taro.getCurrentInstance().router.params.orderID)
        this.props.actions.getPreOrder({ ID: Taro.getCurrentInstance().router.params.orderID })
    }

    handlePay = () => {
        this.props.actions.postPayPreOrder({
            ID: Taro.getCurrentInstance().router.params.orderID,
            payType: 0,
            payID: this.props.order.preOrder.payID,
            payAmount: this.props.order.preOrder.amount,
            payPoints: 0,
            memo: ""
        })
    }

    componentDidUpdate = prevProps => {
        if (!prevProps.order.postPayPreOrder && this.props.order.postPayPreOrder) {
            if (this.props.order.postPayPreOrder.status === 0) {
                Taro.showToast({
                    title: '付款成功',
                    icon: 'success',
                    duration: 2000
                })
                Taro.navigateTo({ url: `/pages/order/orderList` })
            } else {
                Taro.showToast({
                    title: '付款失败',
                    icon: 'error',
                    duration: 2000
                })
            }
            this.props.actions.updatePostPayPreOrder(null)
        }
    }

    render() {
        if (!this.props.order.preOrder) {
            return (<View><AtActivityIndicator size={64}></AtActivityIndicator></View>)
        }
        return (
            <View>
                <View className="pay-title">
                    <Text>支付金额：{this.props.order.preOrder?.amount}</Text>
                </View>
                <View className="pay-title">
                    <Text>支付类型：{this.props.order.preOrder?.amount}</Text>
                </View>
                
                <View className='at-row at-row__justify--around'>
                    <View className='at-col at-col-4'><AtButton circle size="small" type='primary' onClick={() => this.handlePay()}>去付款</AtButton></View>
                </View>
            </View>
    )
    }
}

const mapStateToProps = (state) => ({
    order: state.order,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(OrderActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(payment);