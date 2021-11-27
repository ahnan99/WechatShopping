import React, { Component } from 'react'
import { View, Button, Text, Checkbox, CheckboxGroup } from "@tarojs/components";
import Taro from "@tarojs/taro"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AtList, AtListItem, AtTabs, AtTabsPane, AtGrid } from "taro-ui";
import { actions as UserActions } from "../../modules/user"
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/grid.scss";

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

    handleClickOrderType = item => {
        Taro.navigateTo({ url: `/pages/order/orderList?current=${item.index}` })
    }

    handleClickMy = item => {
        Taro.navigateTo({ url: item.url })
    }


    componentDidShow() {
        this.props.actions.getMember({ memberID: this.props.user.memberID })
    }


    render() {
        if (!this.props.user.member) {
            return (
                <View>loading</View>
            )
        }
        const { member } = this.props.user
        return (
            <View className="sub-title">
                <Text>我的订单</Text>
                <AtGrid onClick={index => this.handleClickOrderType(index)} data={
                    [
                        {
                            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                            value: `待付款 ${member.countPre>0 ? '('+member.countPre+')' : ''}`,
                            index: 0
                        },
                        {
                            image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                            value: `待发货 ${member.count0>0 ? '('+member.count0+')' : ''}`,
                            index: 1
                        },
                        {
                            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                            value: `待收货 ${member.count1>0 ? '('+member.count1+')' : ''}`,
                            index: 2
                        },
                        {
                            image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                            value: `退款退货 ${member.count3 + member.count4>0 ? '('+member.count3 + member.count4+')' : ''}`,
                            index: 3
                        },
                        {
                            image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                            value: `全部订单`,
                            index: 4
                        }
                    ]
                } />

                <Text>我的账户</Text>
                <AtGrid mode='rect' onClick={(item) => this.handleClickMy(item)} data={
                    [
                        {
                            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                            value: `积分 ${member.points_onhand>0 ? '('+member.points_onhand+')' : ''}`,
                            url: '/pages/account/myPoint',
                        },
                        {
                            image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                            value: `推荐 ${member.referrer>0 ? '('+member.referrer+')' : ''}`,
                            url: '/pages/account/myReferee'
                        },
                        {
                            image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                            value: '个人信息',
                            url: '/pages/account/myProfile'
                        }

                    ]
                } />
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
