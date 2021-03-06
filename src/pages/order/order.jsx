import React, { Component } from 'react'
import { View, Button, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import {
    AtButton, AtRadio, AtTextarea, AtModal, AtModalHeader,
    AtModalContent,
    AtModalAction,
    AtInput,
    AtActivityIndicator,
    AtList,
    AtListItem
} from 'taro-ui'
import axios from "taro-axios";

import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/modal.scss";
import "taro-ui/dist/style/components/toast.scss";
import "taro-ui/dist/style/components/textarea.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/activity-indicator.scss";
import 'taro-ui/dist/style/components/loading.scss';
import "taro-ui/dist/style/components/list.scss";


import { actions as OrderActions } from "../../modules/order";

class order extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isOpenCacnelOrder: false,
            isOpenRevertCacnelOrder: false,
            isOpenGR: false,
            isOpenReturn: false,
            isOpenReturnIssue: false,
            isOpenRevertReturn: false,
            returnMemo: '',
            returnRevertMemo: '',
            isOpenOrderClose: false,
            returnDelivery: '',
            refundMemo: ''
        };
    }

    componentDidUpdate = prevProps => {
        if (!prevProps.order.postCacnelOrder && this.props.order.postCacnelOrder) {

            this.props.actions.updateOrderInfo(null)
            this.props.actions.getOrderInfo({
                ID: Taro.getCurrentInstance().router.params.orderID,
            });
            Taro.showToast({
                title: this.props.order.postCacnelOrder.msg,
                icon: 'none',
                duration: 5000
            })
            this.handleClose()

            this.props.actions.updatePostCancelOrder(null)
        }

        if (!prevProps.order.postRevertCancelOrder && this.props.order.postRevertCancelOrder) {
            if (this.props.order.postRevertCancelOrder.status === 0) {
                this.props.actions.updateOrderInfo(null)
                this.props.actions.getOrderInfo({
                    ID: Taro.getCurrentInstance().router.params.orderID,
                });
                Taro.showToast({
                    title: '??????????????????',
                    icon: 'success',
                    duration: 2000
                })
                this.handleClose()
            }
            this.props.actions.updatePostRevertCancelOrder(null)
        }

        if (!prevProps.order.postGoodsReceipt && this.props.order.postGoodsReceipt) {
            if (this.props.order.postGoodsReceipt.status === 0) {
                this.props.actions.updateOrderInfo(null)
                this.props.actions.getOrderInfo({
                    ID: Taro.getCurrentInstance().router.params.orderID,
                });
                Taro.showToast({
                    title: '??????????????????',
                    icon: 'success',
                    duration: 2000
                })
                this.handleClose()
            }
            this.props.actions.updatePostGoodsReceipt(null)
        }

        if (!prevProps.order.postReturnRequirement && this.props.order.postReturnRequirement) {
            if (this.props.order.postReturnRequirement.status === 0) {
                this.props.actions.updateOrderInfo(null)
                this.props.actions.getOrderInfo({
                    ID: Taro.getCurrentInstance().router.params.orderID,
                });
                Taro.showToast({
                    title: '??????????????????',
                    icon: 'success',
                    duration: 2000
                })
                this.handleClose()
            }
            this.props.actions.updatePostReturnRequirement(null)
        }
        if (!prevProps.order.postRevertReturnRequirement && this.props.order.postRevertReturnRequirement) {
            if (this.props.order.postRevertReturnRequirement.status === 0) {
                this.props.actions.updateOrderInfo(null)
                this.props.actions.getOrderInfo({
                    ID: Taro.getCurrentInstance().router.params.orderID,
                });
                Taro.showToast({
                    title: '????????????????????????',
                    icon: 'success',
                    duration: 2000
                })
                this.handleClose()
            }
            this.props.actions.updatePostRevertReturnRequirement(null)
        }
        if (!prevProps.order.postReturnDelivery && this.props.order.postReturnDelivery) {
            if (this.props.order.postReturnDelivery.status === 0) {
                this.props.actions.updateOrderInfo(null)
                this.props.actions.getOrderInfo({
                    ID: Taro.getCurrentInstance().router.params.orderID,
                });
                Taro.showToast({
                    title: '??????????????????',
                    icon: 'success',
                    duration: 2000
                })
                this.handleClose()
            }
            this.props.actions.updatePostReturnDelivery(null)
        }
        if (!prevProps.order.postOrderClose && this.props.order.postOrderClose) {
            if (this.props.order.postOrderClose.status === 0) {
                this.props.actions.updateOrderInfo(null)
                this.props.actions.getOrderInfo({
                    ID: Taro.getCurrentInstance().router.params.orderID,
                });
                Taro.showToast({
                    title: '????????????',
                    icon: 'success',
                    duration: 2000
                })
                this.handleClose()
            }
            this.props.actions.updatePostOrderClose(null)
        }
    }

    componentDidShow() {
        console.log(
            "fetching order: ",
            Taro.getCurrentInstance().router.params.orderID
        );
        this.props.actions.getOrderInfo({
            ID: Taro.getCurrentInstance().router.params.orderID,
        });
        console.log('Bill ID: ', Taro.getCurrentInstance().router.params.billID)
        this.props.actions.getShippment({
            bill_no: Taro.getCurrentInstance().router.params.billID,
        });
    }

    componentDidHide() {
        this.props.actions.updateOrderInfo(null)
    }

    handleOnClick = item => {
        if (item === "????????????") {
            this.setState({ isOpenCacnelOrder: true })
        } else if (item === "??????????????????") {
            this.setState({ isOpenRevertCacnelOrder: true })
        } else if (item === "????????????") {
            this.setState({ isOpenGR: true })
        } else if (item === "????????????") {
            this.setState({ isOpenReturn: true })
        } else if (item === "??????????????????") {
            this.setState({ isOpenRevertReturn: true })
        } else if (item === "????????????") {
            this.setState({ isOpenReturnIssue: true })
        } else if (item === "????????????") {
            this.setState({ isOpenOrderClose: true })
        }
    }

    handleSubmitCancelOrder = () => {
        this.props.actions.postCancelOrder({ ID: this.props.order.orderInfo.ID, memo: this.state.refundMemo })
    }

    handleSubmitRevertCancelOrder = () => {
        this.props.actions.postRevertCancelOrder({ ID: this.props.order.orderInfo.ID })
    }

    handleSubmitGoodsReceipt = () => {
        this.props.actions.postGoodsReceipt({ ID: this.props.order.orderInfo.ID })
    }

    handleSubmitReturn = () => {
        this.props.actions.postReturnRequirement({ ID: this.props.order.orderInfo.ID, memo: this.state.returnMemo })
    }

    handleSubmitRevertReturn = () => {
        this.props.actions.postRevertReturnRequirement({ ID: this.props.order.orderInfo.ID, memo: this.state.returnRevertMemo })
    }

    handleSubmitReturnDelivery = () => {
        this.props.actions.postReturnDelivery({ ID: this.props.order.orderInfo.ID, memo: this.state.returnDelivery })
    }

    handleSubmitOrderClose = () => {
        this.props.actions.postOrderClose({ ID: this.props.order.orderInfo.ID })
    }

    handleClose = () => {
        this.setState({
            isOpenCacnelOrder: false,
            isOpenRevertCacnelOrder: false,
            isOpenGR: false,
            isOpenReturn: false,
            isOpenReturnIssue: false,
            isOpenRevertReturn: false,
            returnMemo: '',
            returnRevertMemo: '',
            isOpenOrderClose: false,
            returnDelivery: '',
            refundMemo: ''
        })
    }

    handleChangeReturnMemo(returnMemo) {
        this.setState({
            returnMemo
        })
    }

    handleChangeReturnRevertMemo(returnRevertMemo) {
        this.setState({
            returnRevertMemo
        })
    }


    handleChangeReturnDelivery(returnDelivery) {
        this.setState({
            returnDelivery
        })
    }

    handleChangeRefundMemo(refundMemo) {
        this.setState({ refundMemo })
    }

    checkCarrier() {
        Taro.navigateTo({
            url: "plugin://kdPlugin/index?num=JD0058924109768&appName=?????????",
        })
    }

    render() {
        if (!this.props.order.orderInfo) {
            return (
                <View>
                    <AtActivityIndicator size={64}></AtActivityIndicator>
                </View>
            )
        }
        return (
            <View>
                <AtModal isOpened={this.state.isOpenCacnelOrder}>
                    <AtModalHeader>????????????</AtModalHeader>
                    <AtModalContent>
                        <Text>???????????????????????????</Text>
                        <AtTextarea
                            value={this.state.refundMemo}
                            onChange={this.handleChangeRefundMemo.bind(this)}
                            placeholder='??????????????????...' />
                    </AtModalContent>
                    <AtModalAction>
                        <AtButton onClick={this.handleClose} type='secondary' size='small'>??????</AtButton>
                        <AtButton onClick={() => this.handleSubmitCancelOrder()} type='primary' size='small'>??????</AtButton>
                    </AtModalAction>
                </AtModal>
                <AtModal isOpened={this.state.isOpenRevertCacnelOrder}>
                    <AtModalHeader>??????????????????</AtModalHeader>
                    <AtModalContent>
                        <Text>?????????????????????????????????</Text>
                    </AtModalContent>
                    <AtModalAction>
                        <AtButton onClick={this.handleClose} type='secondary' size='small'>??????</AtButton>
                        <AtButton onClick={() => this.handleSubmitRevertCancelOrder()} type='primary' size='small'>??????</AtButton>
                    </AtModalAction>
                </AtModal>
                <AtModal isOpened={this.state.isOpenGR}>
                    <AtModalHeader>????????????</AtModalHeader>
                    <AtModalContent>
                        <Text>??????????????????</Text>
                    </AtModalContent>
                    <AtModalAction>
                        <AtButton onClick={this.handleClose} type='secondary' size='small'>??????</AtButton>
                        <AtButton onClick={() => this.handleSubmitGoodsReceipt()} type='primary' size='small'>??????</AtButton>
                    </AtModalAction>
                </AtModal>
                <AtModal isOpened={this.state.isOpenReturn}>
                    <AtModalHeader>????????????</AtModalHeader>
                    <AtModalContent>
                        <Text>????????????????????????</Text>
                        <AtTextarea
                            value={this.state.returnMemo}
                            onChange={this.handleChangeReturnMemo.bind(this)}
                            placeholder='??????????????????...' />
                    </AtModalContent>
                    <AtModalAction>
                        <AtButton onClick={this.handleClose} type='secondary' size='small'>??????</AtButton>
                        <AtButton onClick={() => this.handleSubmitReturn()} type='primary' size='small'>??????</AtButton>
                    </AtModalAction>
                </AtModal>
                <AtModal isOpened={this.state.isOpenRevertReturn}>
                    <AtModalHeader>??????????????????</AtModalHeader>
                    <AtModalContent>
                        <Text>??????????????????????????????</Text>
                        <AtTextarea
                            value={this.state.returnRevertMemo}
                            onChange={this.handleChangeReturnRevertMemo.bind(this)}
                            placeholder='????????????...' />
                    </AtModalContent>
                    <AtModalAction>
                        <AtButton onClick={this.handleClose} type='secondary' size='small'>??????</AtButton>
                        <AtButton onClick={() => this.handleSubmitRevertReturn()} type='primary' size='small'>??????</AtButton>
                    </AtModalAction>
                </AtModal>
                <AtModal isOpened={this.state.isOpenReturnIssue}>
                    <AtModalHeader>????????????</AtModalHeader>
                    <AtModalContent>
                        <Text>??????????????????</Text>
                        <AtInput
                            name='value'
                            title='????????????'
                            type='text'
                            placeholder='??????????????????'
                            value={this.state.returnDelivery}
                            onChange={this.handleChangeReturnDelivery.bind(this)}
                        />
                    </AtModalContent>
                    <AtModalAction>
                        <AtButton onClick={this.handleClose} type='secondary' size='small'>??????</AtButton>
                        <AtButton onClick={() => this.handleSubmitReturnDelivery()} type='primary' size='small'>??????</AtButton>
                    </AtModalAction>
                </AtModal>
                <AtModal isOpened={this.state.isOpenOrderClose}>
                    <AtModalHeader>????????????</AtModalHeader>
                    <AtModalContent>
                        <Text>???????????????????????????</Text>
                    </AtModalContent>
                    <AtModalAction>
                        <AtButton onClick={this.handleClose} type='secondary' size='small'>??????</AtButton>
                        <AtButton onClick={() => this.handleSubmitOrderClose()} type='primary' size='small'>??????</AtButton>
                    </AtModalAction>
                </AtModal>
                <View className="goodsList" key={this.props.order.orderInfo.ID}>
                    <View className="a-gooods">
                        <View className="a-goods-conts">
                            <View className="goods-info">
                                <View className="img-box">
                                    <image mode="aspectFill" src={axios.defaults.baseURL + this.props.order.orderInfo.filename} className="img" />
                                </View>
                                <View className="text-box">
                                    <View className="goods-title">?????????:{this.props.order.orderInfo.orderID}</View>
                                    <View className="goods-title">{this.props.order.orderInfo.goodsName}</View>
                                    <View className="goods-price">X&nbsp;{this.props.order.orderInfo.qty}&nbsp;&nbsp;&nbsp;??????:?? {this.props.order.orderInfo.price * this.props.order.orderInfo.qty}</View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='at-row at-row__justify--around'>
                    {
                        this.props.order.orderInfo.opItems !== "" ? this.props.order.orderInfo.opItems?.split(",")?.map(item => (
                            <View>
                                <View className='at-col'> <AtButton circle size="small" type='primary' onClick={() => this.handleOnClick(item)}>{item}</AtButton></View>
                            </View>

                        )) : null
                    }
                </View>
                <View>
                    <text style={{ color: 'gray', fontSize: '0.8em', margin: '10px' }}>????????????</text>
                    {this.props.order.shippment && this.props.order.shippment.data && this.props.order.shippment.data.statusName ?
                        <text style={{ color: 'red', fontSize: '0.7em', margin: '10px' }}>{this.props.order.shippment.data.statusName}</text>
                        : null}
                    {this.props.order.shippment && this.props.order.shippment.data && this.props.order.shippment.data.expressName ?
                        <text style={{ color: 'gray', fontSize: '0.7em', margin: '10px' }}>{this.props.order.shippment.data.expressName}</text>
                        : null}
                </View>
                <View>
                    {this.props.order.shippment && this.props.order.shippment.data && this.props.order.shippment.data.number ?
                        <text style={{ color: 'gray', fontSize: '0.7em', margin: '10px' }}>????????????{this.props.order.shippment.data.number}</text>
                        : null}
                </View>
                {
                    this.props.order.shippment && this.props.order.shippment.data && this.props.order.shippment.data.logisticsList ? <View> <AtList>
                        {this.props.order.shippment.data.logisticsList.map(element => (<AtListItem
                            title={element.context}
                            note={element.time}
                        />))
                        }
                    </AtList></View> : <span>??????????????????</span>
                }

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

export default connect(mapStateToProps, mapDispatchToProps)(order);
