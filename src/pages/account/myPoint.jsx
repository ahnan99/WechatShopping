import React, { Component } from 'react';
import { View, Button, Text, Checkbox, CheckboxGroup, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AtList, AtListItem, AtTabs, AtButton, AtActivityIndicator } from "taro-ui";
import { actions as UserActions } from "../../modules/user";
import "./account.css";
import "taro-ui/dist/style/components/activity-indicator.scss";
import 'taro-ui/dist/style/components/loading.scss';

class myPoint extends Component {

    componentDidShow() {
        this.props.actions.getMember({ memberID: this.props.user.memberID })
    }

    handleClick = () => {
        Taro.navigateTo({ url: `/pages/account/myPointList` })
    }

    render() {
        if (!this.props.user.member) {
            return (
                <View>
                    <AtActivityIndicator size={64}></AtActivityIndicator>
                </View>
            )
        }
        return (
            <View>
                <View className="sub-title">
                    <Image className="account-image" src="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png" mode="aspectFill"></Image>
                    <Text style={{paddingLeft: "10rpx", verticalAlign: "center"}}>我的积分</Text>
                </View>
                 <View className="goods-info-fx">
                    <View className="icon-title">可用积分：{this.props.user.member?.points_onhand}</View>
                    <View className="icon-title">锁定积分：{this.props.user.member?.points_onway}</View>
                    <View className="icon-title">已使用：{this.props.user.member?.points_used}</View>
                </View>
                <View className='at-row at-row__justify--around'>
                    <View className='at-col at-col-4'><AtButton circle size="small" type='primary' onClick={() => this.handleClick()}>积分明细</AtButton></View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(UserActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(myPoint)