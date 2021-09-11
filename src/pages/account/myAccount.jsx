import React, { Component } from 'react'
import { View, Button, Text, Checkbox, CheckboxGroup } from "@tarojs/components";
import Taro from "@tarojs/taro"
import {connect} from "react-redux";
import { bindActionCreators } from "redux";

export default class myAccount extends Component {

    handleClick = () => {
        Taro.navigateTo({url: `/pages/order/orderList`})
    }

    render() {
        return (
            <View>
                <Button onClick={()=>this.handleClick()}>我的订单</Button>
            </View>
        )
    }
}
