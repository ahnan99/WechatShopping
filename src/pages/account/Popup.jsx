import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "@tarojs/components"
import "taro-ui/dist/style/components/modal.scss";
import { actions as UserActions } from "../../modules/user";
import WXBizDataCrypt from "../../util/WXBizDataCrypt"

class Popup extends Component {

    handleConfirm = () => {
        this.props.userActions.updateInfoCompleted(true);
        this.fetch();
    }

    getNum = e => {
        const appId = "wx16097fdc759fc9e0";
        console.log(this.props.user.session_key)
        var pc = new WXBizDataCrypt(appId, this.props.user.session_key);
        var data = pc.decryptData(e.detail.encryptedData , e.detail.iv);
        this.props.userActions.postInfo({mobile: data.phoneNumber})
      }

    fetch = () => {
        Taro.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res.userInfo)
                this.props.userActions.postInfo({nickName: res.userInfo.nickName, sex: res.userInfo.gender, avatarUrl: res.userInfo.avatarUrl})
            }
        })
    }

    render() {
        return (
            <AtModal isOpened={this.props.isOpened}>
                <AtModalHeader>需要登录才可继续操作</AtModalHeader>
                <AtModalAction>
                    <Button openType='getPhoneNumber' onClick={this.handleConfirm} onGetPhoneNumber={this.getNum}>确定</Button>
                </AtModalAction>
            </AtModal>
        )
    }


}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    userActions: bindActionCreators(UserActions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(Popup)
