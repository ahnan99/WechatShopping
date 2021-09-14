import React, { Component } from 'react'

import { View, Button, Text, Checkbox, CheckboxGroup, Image } from "@tarojs/components";
import Taro from "@tarojs/taro"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AtList, AtListItem, AtTabs, AtTabsPane } from "taro-ui";
import { actions as UserActions } from "../../modules/user"
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/tabs.scss"
import "./account.css";

class myProfile extends Component {


    componentDidShow() {
        this.props.actions.getMember({ memberID: this.props.user.memberID })
    }

    render() {
        return (
            <View>
                <View className="sub-title">
                    <Image className="account-image" src="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png" mode="aspectFill"></Image>
                    <Text style={{paddingLeft: "10rpx", verticalAlign: "center"}}>个人信息</Text>
                </View>
                <Text>手机：{this.props.user.member?.mobile}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(myProfile)
