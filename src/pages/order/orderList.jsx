import React, { Component } from "react";
import { View, Button, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtList, AtListItem } from "taro-ui";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/list.scss";
import { actions as OrderActions } from "../../modules/order";

class orderList extends Component {

    componentDidShow(){
        this.props.actions.getOrderList()
        this.props.actions.getPreOrderList()
    }

    componentWillHide(){
        this.props.actions.updateOrderList(null)
        this.props.actions.updatePreOrderList(null)
    }

    handleOnClick = item => {
      Taro.navigateTo({url: `/pages/order/preOrder?orderID=${item.ID}`})
    }

  render() {
    if (!this.props.order.orderList || !this.props.order.preOrderList) {
      return <View>loading</View>;
    }
    return (
      <View>
      <View>
        Preorder list
        <View>
          <AtList>
              {
                  this.props.order.preOrderList.map(order => (
                      <AtListItem onClick={()=> this.handleOnClick(order)} key={order.ID} title={`预订单：${order.ID} 状态：${order.statusName}`} note={`下单时间: ${order.regDate}`} arrow='right' />
                  ))
              }
          </AtList>
        </View>
      </View>
      <View>
        order list
        <View>
          <AtList>
              {
                  this.props.order.orderList.map(order => (
                      <AtListItem key={order.ID} title={`订单：${order.orderID}`} note={`下单时间: ${order.regDate}`} arrow='right' />
                  ))
              }
          </AtList>
        </View>
      </View>
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
