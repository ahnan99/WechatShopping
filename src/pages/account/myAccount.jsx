import React, { Component } from 'react'
import { View, Button, Text, Checkbox, CheckboxGroup } from "@tarojs/components";
import Taro from "@tarojs/taro"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AtList, AtListItem, AtTabs, AtTabsPane } from "taro-ui";
import { actions as UserActions } from "../../modules/user"
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/tabs.scss"

class myAccount extends Component {
    constructor() {
        super()
        this.state = {
            current: 0,
        }
    }

    handleClickTab(value) {
        this.setState({
            current: value
        })
    }

    handleClick = () => {
        Taro.navigateTo({ url: `/pages/order/orderList` })
    }

    componentDidShow() {
        this.props.actions.getRefereeList()
        this.props.actions.getPointList()
        this.props.actions.getMember({memberID: this.props.user.memberID})
    }

    render() {
        const tabList = [{ title: '可用积分' }, { title: '锁定积分' }, { title: '使用积分' }]
        return (
            <View>
                <Button onClick={() => this.handleClick()}>我的订单</Button>
                <Text>我的积分</Text>
                <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClickTab.bind(this)}>
                    <AtTabsPane current={this.state.current} index={0} >
                        <View style='padding: 15px 10px;background-color: #FAFBFC;text-align: left;' ><View>
                            <AtList>
                                {
                                    this.props.user.pointList?.filter(point => { return point.type === 0 }).map(point => (
                                        <AtListItem title={`积分：${point.points}  类型：${point.typeName}`} note={`订单号${point.orderID}  获得时间: ${point.regDate}`} />
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
                                    this.props.user.pointList?.filter(point => { return point.type === 1 }).map(point => (
                                        <AtListItem title={`积分：${point.points}  类型：${point.typeName}`} note={`订单号${point.orderID}  获得时间: ${point.regDate}`} />
                                    ))
                                }
                            </AtList>
                        </View>
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={2} >
                        <View style='padding: 15px 10px;background-color: #FAFBFC;text-align: left;' ><View>
                            <AtList>
                                {
                                    this.props.user.pointList?.filter(point => { return point.type === 2 }).map(point => (
                                        <AtListItem title={`积分：${point.points}  类型：${point.typeName}`} note={`订单号${point.orderID}  获得时间: ${point.regDate}`} />
                                    ))
                                }
                            </AtList>
                        </View>
                        </View>
                    </AtTabsPane>
                </AtTabs>
                <Text>我推荐的人</Text>
                <AtList>
                    {
                        this.props.user.refereeList?.map(referee => (
                            <AtListItem title={`昵称：${referee.nickName}  注册时间：${referee.regDate}`} />
                        ))
                    }
                </AtList>
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

export default connect(mapStateToProps, mapDispatchToProps)(myAccount)
