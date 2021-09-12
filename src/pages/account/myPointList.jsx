import React, { Component } from 'react'
import { View, Button, Text, Checkbox, CheckboxGroup } from "@tarojs/components";
import Taro from "@tarojs/taro"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AtList, AtListItem, AtTabs, AtTabsPane } from "taro-ui";
import { actions as UserActions } from "../../modules/user"
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/tabs.scss"

class myPointList extends Component {

    componentDidShow() {
        this.props.actions.getPointList()
    }

    render() {
        return (
            <View>
                <AtList>
                    {
                        this.props.user.pointList?.map(point => (
                            <AtListItem title={`积分：${point.points}  类型：${point.typeName}`} note={`订单号${point.orderID}  获得时间: ${point.regDate}`} />
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
export default connect(mapStateToProps, mapDispatchToProps)(myPointList)