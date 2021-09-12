import React, { Component } from 'react'
import { View, Button, Text, Checkbox, CheckboxGroup } from "@tarojs/components";
import Taro from "@tarojs/taro"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AtList, AtListItem, AtTabs, AtButton } from "taro-ui";
import { actions as UserActions } from "../../modules/user"

class myPoint extends Component {

    componentDidShow() {
        this.props.actions.getMember({ memberID: this.props.user.memberID })
    }

    handleClick = () => {
        Taro.navigateTo({ url: `/pages/account/myPointList` })
    }

    render() {
        return (
            <View>
                <Text>可用积分:{this.props.user.member?.points}</Text>
                <Text>锁定积分:{this.props.user.member?.points_onway}</Text>
                <AtButton onClick={() => this.handleClick()}>使用积分</AtButton>
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