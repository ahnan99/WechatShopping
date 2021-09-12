import React, { Component } from 'react'
import { View, Button, Text, Checkbox, CheckboxGroup } from "@tarojs/components";
import Taro from "@tarojs/taro"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AtList, AtListItem, AtTabs, AtTabsPane } from "taro-ui";
import { actions as UserActions } from "../../modules/user"
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/tabs.scss"

class myReferee extends Component {

    componentDidShow() {
        this.props.actions.getRefereeList()
    }

    render() {
        return (
            <View>
                <Text>我推荐的人</Text>
                <AtList>
                    {
                        this.props.user.refereeList?.map(referee => (
                            <AtListItem title={`昵称：${referee.nickName}  注册时间：${referee.regDate}`} />
                        ))
                    }
                </AtList>
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

export default connect(mapStateToProps, mapDispatchToProps)(myReferee)