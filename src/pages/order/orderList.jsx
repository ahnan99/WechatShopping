import React, { Component } from "react";
import { View, Button, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtList, AtListItem, AtTabs, AtTabsPane, AtActivityIndicator } from "taro-ui";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/tabs.scss"
import { actions as OrderActions } from "../../modules/order";
import "./order.css";
import axios from "taro-axios";
import "taro-ui/dist/style/components/activity-indicator.scss";
import 'taro-ui/dist/style/components/loading.scss';

class orderList extends Component {
    constructor() {
        super()
        this.state = {
            current: Taro.getCurrentInstance().router.params.current ? Number(Taro.getCurrentInstance().router.params.current) : 0,
        }
    }

    handleClick(value) {
        this.setState({
            current: value
        })
    }
    componentDidShow() {
        this.props.actions.getOrderList()
        this.props.actions.getPreOrderList()
        console.log(this.state.current)
    }

    componentWillHide() {
        this.props.actions.updateOrderList(null)
        this.props.actions.updatePreOrderList(null)
    }

    handleOnClick = item => {
        Taro.navigateTo({url: `/pages/order/payment?orderID=${item.ID}`})
    }

    handleOnClickOrder = order => {
        Taro.navigateTo({ url: `/pages/order/order?orderID=${order.ID}` })
    }

    render() {
        const tabList = [{ title: '待付款' }, { title: '待发货' }, { title: '待收货' }, { title: '退款退货' }, { title: '全部' }]
        if (!this.props.order.orderList || !this.props.order.preOrderList) {
            return <View><AtActivityIndicator size={64}></AtActivityIndicator></View>;
        }
        return (
            <View>
                <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
                    <AtTabsPane current={this.state.current} index={0} >
                        <View style='padding: 15px 10px;background-color: #FAFBFC;text-align: left;' ><View>
                            <AtList>
                                {
                                    this.props.order.preOrderList.map(order => (
                                        <AtListItem onClick={() => this.handleOnClick(order)} key={order.ID} 
                                            title={`#${order.ID}   X ${order.qty}  金额:${order.amount}`} 
                                            note={`下单:${order.regDate}`} 
                                            extraText={`${order.statusName}`} 
                                            thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
                                            arrow='right' />
                                    ))
                                }
                            </AtList>
                        </View>
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={1} >
                        <View style='padding: 15px 10px;background-color: #FAFBFC;text-align: left;' ><View>
                            <AtList>
                                {
                                    this.props.order.orderList.filter(order => { return order.status === 0 }).map(order => (
                                        <View className="goodsList" key={order.ID}  onClick={()=>this.handleOnClickOrder(order)}>
                                            <View className="a-gooods">
                                                <View className="a-goods-conts">
                                                    <View className="goods-info">
                                                        <View className="img-box">
                                                            <image mode="aspectFill" src={axios.defaults.baseURL + order.filename} className="img" />
                                                        </View>
                                                        <View className="text-box">
                                                            <View className="goods-title">订单号:{order.orderID}</View>
                                                            <View className="goods-title">{order.goodsName}</View>
                                                            <View className="goods-price">X&nbsp;{order.qty}&nbsp;&nbsp;&nbsp;总价:¥ {order.price}</View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                }
                            </AtList>
                        </View>
                        </View>
                    </AtTabsPane>

                    <AtTabsPane current={this.state.current} index={2}>
                        <View style='padding: 15px 10px;background-color: #FAFBFC;text-align: left;' ><View>
                            <AtList>
                                {
                                    this.props.order.orderList.filter(order => { return order.status === 1 }).map(order => (
                                        <View className="goodsList" key={order.ID}  onClick={()=>this.handleOnClickOrder(order)}>
                                            <View className="a-gooods">
                                                <View className="a-goods-conts">
                                                    <View className="goods-info">
                                                        <View className="img-box">
                                                            <image mode="aspectFill" src={axios.defaults.baseURL + order.filename} className="img" />
                                                        </View>
                                                        <View className="text-box">
                                                            <View className="goods-title">订单号:{order.orderID}</View>
                                                            <View className="goods-title">{order.goodsName}</View>
                                                            <View className="goods-price">X&nbsp;{order.qty}&nbsp;&nbsp;&nbsp;总价:¥ {order.price}</View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                }
                            </AtList>
                        </View>
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={3}>
                        <View style='padding: 15px 10px;background-color: #FAFBFC;text-align: left;' ><View>
                            <AtList>
                                {
                                    this.props.order.orderList.filter(order => { return order.status >= 3 && order.status <= 8}).map(order => (
                                        <View className="goodsList" key={order.ID}  onClick={()=>this.handleOnClickOrder(order)}>
                                            <View className="a-gooods">
                                                <View className="a-goods-conts">
                                                    <View className="goods-info">
                                                        <View className="img-box">
                                                            <image mode="aspectFill" src={axios.defaults.baseURL + order.filename} className="img" />
                                                        </View>
                                                        <View className="text-box">
                                                            <View className="goods-title">订单号:{order.orderID}</View>
                                                            <View className="goods-title">{order.goodsName}</View>
                                                            <View className="goods-price">X&nbsp;{order.qty}&nbsp;&nbsp;&nbsp;总价:¥ {order.price}</View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                }
                            </AtList>
                        </View>
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={4}>
                        <View style='padding: 15px 10px;background-color: #FAFBFC;text-align: left;' ><View>
                            <AtList>
                                {
                                    this.props.order.orderList.filter(order => { return order.status < 99 }).map(order => (
                                        <View className="goodsList" key={order.ID}  onClick={()=>this.handleOnClickOrder(order)}>
                                            <View className="a-gooods">
                                                <View className="a-goods-conts">
                                                    <View className="goods-info">
                                                        <View className="img-box">
                                                            <image mode="aspectFill" src={axios.defaults.baseURL + order.filename} className="img" />
                                                        </View>
                                                        <View className="text-box">
                                                            <View className="goods-title">订单号:{order.orderID}</View>
                                                            <View className="goods-title">{order.goodsName}</View>
                                                            <View className="goods-price">X&nbsp;{order.qty}&nbsp;&nbsp;&nbsp;总价:¥ {order.price}</View>
                                                        </View>
                                                        <View className="order-title">{order.statusName}</View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                }
                            </AtList>
                        </View>
                        </View>
                    </AtTabsPane>
                </AtTabs>
            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    order: state.order,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(OrderActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(orderList);
