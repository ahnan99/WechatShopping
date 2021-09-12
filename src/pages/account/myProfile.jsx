import React, { Component } from 'react'

import { View, Button, Text, Checkbox, CheckboxGroup } from "@tarojs/components";
import Taro from "@tarojs/taro"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AtList, AtListItem, AtTabs, AtTabsPane } from "taro-ui";
import { actions as UserActions } from "../../modules/user"
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/tabs.scss"

class myProfile extends Component {


    componentDidShow() {
        this.props.actions.getMember({ memberID: this.props.user.memberID })
    }

    render() {
        return (
            <View>
                <Text>个人信息</Text>
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
