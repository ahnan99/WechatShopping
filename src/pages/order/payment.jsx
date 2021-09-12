import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from "react-redux";
import { View, Button, Text, Image } from "@tarojs/components";
import { AtSearchBar, AtDrawer, AtButton } from 'taro-ui'
import { actions as OrderActions } from "../../modules/order";
import { bindActionCreators } from "redux";

class payment extends Component {

    componentDidMount() {
        console.log(Taro.getCurrentInstance().router.params.orderID)
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
                  Taro.navigateTo({url: `/pages/order/orderList`})
            }else{
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
        return (
            <View>
                <Text>金额：{this.props.order.preOrder.amount}</Text>
                <AtButton onClick={() => this.handlePay()}>付款</AtButton>
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