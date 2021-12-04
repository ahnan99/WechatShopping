import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import "taro-ui/dist/style/components/activity-indicator.scss";
import 'taro-ui/dist/style/components/loading.scss';
import "taro-ui/dist/style/components/modal.scss";
import { connect } from "react-redux";
import { View, Button, Text, Image } from "@tarojs/components";
import { AtSearchBar, AtDrawer, AtButton, AtActivityIndicator, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import { actions as OrderActions } from "../../modules/order";
import { bindActionCreators } from "redux";
import "./order.css";



class payment extends Component {

    state = { isOpened: false }

    componentDidMount() {
        console.log(Taro.getCurrentInstance().router.params.orderID)
        this.props.actions.getPreOrder({ ID: Taro.getCurrentInstance().router.params.orderID })
    }

    componentDidUpdate = prevProps => {
        if (!prevProps.order.postPayPreOrder && this.props.order.postPayPreOrder) {
            this.setState({ isOpened: true });
            // if (this.props.order.postPayPreOrder.status === 0) {
            //     Taro.showToast({
            //         title: '付款成功',
            //         icon: 'success',
            //         duration: 2000
            //     })
            //     Taro.reLaunch({ url: `/pages/order/orderList` })
            // } else {
            //     Taro.showToast({
            //         title: '付款失败',
            //         icon: 'error',
            //         duration: 2000
            //     })
            // }
        }
    }

    handlePayRequest = () => {

        this.props.actions.postPayPreOrder({
            ID: Taro.getCurrentInstance().router.params.orderID,
        })
    }

    handlePay = () => {
        if (!this.props.order.postPayPreOrder) {
            Taro.showToast({
                title: '获取付款信息失败，请重试',
                icon: 'error',
                duration: 2000
            })
            this.setState({ isOpened: false });
            this.props.actions.updatePostPayPreOrder(null)
            return;
        };

        const { timeStamp, nonceStr, signType, paySign } = this.props.order.postPayPreOrder.data
        Taro.requestPayment({
            timeStamp: timeStamp.toString(),
            nonceStr: nonceStr,
            package: this.props.order.postPayPreOrder.data.package,
            signType: signType,
            paySign: paySign,
            success(res) {
                Taro.showToast({
                    title: '付款成功',
                    icon: 'success',
                    duration: 2000
                })
                Taro.reLaunch({ url: `/pages/order/orderList?current=1&payment=true` });
            },
            fail(res) {
                console.log(res);
                Taro.showToast({
                    title: '付款失败',
                    icon: 'error',
                    duration: 2000
                })
            },
            complete: (res) => {
                this.props.actions.updatePostPayPreOrder(null);
                this.setState({ isOpened: false });
            }
        })
    }


    render() {
        if (!this.props.order.preOrder) {
            return (<View><AtActivityIndicator size={64}></AtActivityIndicator></View>)
        }
        return (
            <View>
                <AtModal isOpened={this.state.isOpened}>
                    <AtModalHeader>提示</AtModalHeader>
                    <AtModalContent>
                        发起支付成功
                    </AtModalContent>
                    <AtModalAction> <Button onClick={() => { this.setState({ isOpened: false }); }}>取消</Button> <Button onClick={() => this.handlePay()}>确认支付</Button> </AtModalAction>
                </AtModal>
                <View className="pay-title">
                    <Text>支付金额：{this.props.order.preOrder?.amount}</Text>
                </View>
                <View className="pay-title">
                    <Text>支付类型：{this.props.order.preOrder?.amount}</Text>
                </View>

                <View className='at-row at-row__justify--around'>
                    <View className='at-col at-col-4'><AtButton circle size="small" type='primary' onClick={() => this.handlePayRequest()}>去付款</AtButton></View>
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