import { Component } from "react";
import { View, Button, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import { AtRadio, AtTextarea, AtButton } from 'taro-ui'

import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/textarea.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/radio.scss";
import "./order.css";
import axios from "taro-axios";
import { actions as OrderActions } from "../../modules/order";

class preOrder extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            value: '',
            text: {},
        }
    }

    componentDidMount() {

    }

    componentDidUpdate = prevProps => {
        if (!prevProps.order.postSubmitPreOrder && this.props.order.postSubmitPreOrder) {
            if (this.props.order.postSubmitPreOrder.status !== 0) {
                Taro.showToast({
                    title: '生成订单错误',
                    icon: 'error',
                    duration: 2000
                })
            }
            this.props.actions.updatePostSubmitPreOrder(null)
            Taro.navigateBack()
            Taro.navigateTo({ url: `/pages/order/payment?orderID=${Taro.getCurrentInstance().router.params.orderID}` })
        }

        if (!prevProps.order.postPreOrderMemo && this.props.order.postPreOrderMemo) {
            if (this.props.order.postPreOrderMemo.status === 0) {
                this.props.actions.getPreOrderDetail({
                    ID: Taro.getCurrentInstance().router.params.orderID,
                });
                this.props.actions.updatePostSubmitPreOrder(null)
            } else {
                Taro.showToast({
                    title: '更新失败',
                    icon: 'error',
                    duration: 2000
                })
            }
        }

        if (!prevProps.order.postCancelPreOrder && this.props.order.postCancelPreOrder) {
            if (this.props.order.postCancelPreOrder.status === 0) {
                Taro.navigateBack()
            } else {
                Taro.showToast({
                    title: '更新失败',
                    icon: 'error',
                    duration: 2000
                })
            }
            this.props.actions.updatePostCancelPreOrder(null)
        }

        if (this.props.order.preOrderDetail && prevProps.order.preOrderDetail != this.props.order.preOrderDetail) {
            let textState = {}
            this.props.order.preOrderDetail.map(item => { textState[item.ID] = item.memo_order })
            console.log(textState)
            this.setState({ text: textState })
        }
        if (!prevProps.order.addressList && this.props.order.addressList) {
            console.log("set initial address")
            if (this.props.order.addressList.length > 0) {
                this.setState({ value: this.props.order.addressList[0].ID});

            }
        }

    }






    handleAddReceiver = () => {
        Taro.navigateTo({ url: `/pages/order/receiverDetail` })
    }

    handleEditReceiver = () => {
        Taro.navigateTo({ url: `/pages/order/receiverDetail?change=${this.state.value}` })
    }

    componentDidShow() {
        console.log(
            "fetching order: ",
            Taro.getCurrentInstance().router.params.orderID
        );
        this.props.actions.getPreOrder({
            ID: Taro.getCurrentInstance().router.params.orderID,
        });
        this.props.actions.getPreOrderDetail({
            ID: Taro.getCurrentInstance().router.params.orderID,
        });
        this.props.actions.getAddressList();
    }

    componentWillUnmount() {
        this.props.actions.updateAddressList(null)
    }

    handleChange(value) {
        this.setState({
            value
        })
    }

    handleTextChange = (value, item) => {
        let textState = this.state.text
        textState[item.ID] = value
        this.setState({ text: textState })
    }

    handleSubmit = () => {
        //console.log(this.state.text)
        if (this.state.value === '') {
            Taro.showToast({
                title: '请选择收件人',
                icon: 'error',
                duration: 2000
            })
            return
        }
        this.props.actions.postSubmitPreOrder({ ID: Taro.getCurrentInstance().router.params.orderID, detailMemo: this.state.text, addressID: this.state.value })
    }

    handleCancel = () => {
        //console.log(this.state.text)
        this.props.actions.postCancelPreOrder({ ID: Taro.getCurrentInstance().router.params.orderID, detailMemo: this.state.text })
    }

    render() {
        if (!this.props.order.preOrder || !this.props.order.preOrderDetail || !this.props.order.addressList) {
            return <View>loading</View>;
        } else {
            let options = this.props.order.addressList.map(address => {
                return {
                    label: address.receiver, value: address.ID, desc: `${address.mobile} ${address.full_address}`
                }
            })

            if (this.props.order.preOrder.status !== 0) {
                options = options.filter(option => option.value === this.props.order.preOrder.addressID)
                options[0].disabled = true
            }
            return (
                <View className="components-page">
                    <View className="cart-title">
                        <Text>总金额：{this.props.order.preOrder.amount}</Text>
                    </View>
                    {this.props.order.preOrderDetail.map((orderItem) => (

                        <View key={orderItem.ID}>
                            <View className="goodsList">
                                <View className="a-gooods">
                                    <View className="a-goods-conts">
                                        <View className="goods-info">
                                            <View className="img-box">
                                                <image mode="aspectFill" src={axios.defaults.baseURL + orderItem.filename} className="img" />
                                            </View>
                                            <View className="text-box">
                                                <View className="goods-title">{orderItem.goodsName}</View>
                                                <View className="goods-title">规格：{orderItem.size}</View>
                                                <View className="goods-price">X {orderItem.qty}  金额：¥{orderItem.total}</View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <AtTextarea disabled={this.props.order.preOrder.status !== 0} count={false} value={this.state.text[orderItem.ID]} onChange={value => this.handleTextChange(value, orderItem)} maxLength={80} placeholder='备注...' />
                        </View>
                    ))}
                    <View className="cart-title">
                        <View className='at-row at-row__justify--around'>
                            <View className='at-col at-col-4'>选择收件人</View>
                            <View className='at-col at-col-2'><AtButton size="small" type='secondary' onClick={this.handleAddReceiver}>添加</AtButton></View>
                            <View className='at-col at-col-2'><AtButton size="small" type='secondary' onClick={this.handleEditReceiver}>编辑</AtButton></View>
                        </View>
                    </View>
                    <View>
                        <AtRadio options={options} value={this.state.value} onClick={this.handleChange.bind(this)} />
                    </View>
                    <View className='at-row at-row__justify--around' style={{ margin: "20rpx 0" }}>
                        <View className='at-col at-col-2'></View>
                        <View className='at-col at-col-2'> <AtButton circle size="small" type='secondary' onClick={() => this.handleCancel()}>取消</AtButton></View>
                        <View className='at-col at-col-2'> <AtButton circle size="small" type='primary' onClick={() => this.handleSubmit()}>提交</AtButton></View>
                        <View className='at-col at-col-2'></View>
                    </View>
                </View>
            );
        }

    }
}

const mapStateToProps = (state) => ({
    order: state.order,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(OrderActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(preOrder);
