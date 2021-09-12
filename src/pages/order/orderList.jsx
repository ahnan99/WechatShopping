import React, { Component } from "react";
import { View, Button, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtList, AtListItem, AtTabs, AtTabsPane } from "taro-ui";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/tabs.scss"
import { actions as OrderActions } from "../../modules/order";

class orderList extends Component {
    constructor() {
        super()
        this.state = {
            current: 0,
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
    }

    componentWillHide() {
        this.props.actions.updateOrderList(null)
        this.props.actions.updatePreOrderList(null)
    }

    handleOnClick = item => {
        Taro.navigateTo({ url: `/pages/order/preOrder?orderID=${item.ID}` })
    }

    render() {
        const tabList = [{ title: '待付款' }, { title: '待发货' }, { title: '待收货' }, { title: '待退货' }, { title: '退货了' }]
        if (!this.props.order.orderList || !this.props.order.preOrderList) {
            return <View>loading</View>;
        }
        return (
            <View>
                <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
                    <AtTabsPane current={this.state.current} index={0} >
                        <View style='padding: 15px 10px;background-color: #FAFBFC;text-align: left;' ><View>
                            <AtList>
                                {
                                    this.props.order.preOrderList.map(order => (
                                        <AtListItem onClick={() => this.handleOnClick(order)} key={order.ID} title={`预订单：${order.ID} 状态：${order.statusName}`} note={`下单时间: ${order.regDate}`} arrow='right' />
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
                                        <AtListItem key={order.ID} title={`订单：${order.orderID}`} note={`下单时间: ${order.regDate}`} arrow='right' />
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
                                        <AtListItem key={order.ID} title={`订单：${order.orderID}`} note={`下单时间: ${order.regDate}`} arrow='right' />
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
                                    this.props.order.orderList.filter(order => { return order.status === 2 }).map(order => (
                                        <AtListItem key={order.ID} title={`订单：${order.orderID}`} note={`下单时间: ${order.regDate}`} arrow='right' />
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
                                    this.props.order.orderList.filter(order => { return order.status === 3 }).map(order => (
                                        <AtListItem key={order.ID} title={`订单：${order.orderID}`} note={`下单时间: ${order.regDate}`} arrow='right' />
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
