
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";
import { Component } from "react";
import Taro from '@tarojs/taro'
import { connect } from "react-redux";
import axios from "taro-axios";
import { bindActionCreators } from "redux";
import { View, Button, Text } from "@tarojs/components";
import { actions as UserActions } from "../../modules/user";

import "./index.css";

axios.defaults.baseURL = "https://a2fd-2409-8a1e-6c52-f10-4531-a0c8-94a2-8be4.ngrok.io";
//写入信息

axios.interceptors.request.use(function (config) {
  if(Taro.getStorageSync('authorize')){
      const token = Taro.getStorageSync('authorize');
      config.headers.Authorization =  token;
  }
  return config;
});


class Index extends Component {


  componentDidMount() {
    if(!this.checkAuth()){
      this.login()
    } 
  }



  componentWillUnmount() {}

  checkAuth = () => {
    //从缓存读取授权信息
    return this.props.user.authorize || Taro.getStorageSync('authorize') ;
  }

  login = async () => {
    //login
    let res = await Taro.login();
    console.log("login", res)
    //获取token
    let response = await Taro.request({
            url : `${axios.defaults.baseURL}/users/getAccessToken?code=${res.code}` ,
            method : 'GET'
    })
    //判断是否成功
    if( response.data && response.data.token ){
        //写入token
        let authorize = response.data.token;
        console.log(response.data.token);
        this.props.actions.updateMemberID(response.data.memberID);
        this.saveAuthToken(authorize);
        return true;
    }else{
        console.log('获取token失败');
        return false;
    }
  }

  saveAuthToken = (authorize) => {
    //写入状态管理
    console.log("chengle", authorize);
    this.props.actions.updateUserLogin(authorize)
    //写入缓存
    Taro.setStorageSync('authorize',authorize)
  }
  

  componentDidShow() {}

  componentDidHide() {}

  fetch = () =>{
    Taro.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
      }
    })
  }


  getNum = e => {
    console.log(e)
  }

  fetchMember = () => {
    console.log("get member")
    this.props.actions.getMember({memberID: this.props.user.memberID})
  }


  render() {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={()=>this.fetch()}>
          Get Profile
        </Button>
        <Button className='dec_btn' onClick={()=>this.fetchMember()}>
          GetMember
        </Button>
        <Button className='dec_btn' openType='getPhoneNumber' onGetPhoneNumber={this.getNum}>
          Get Phone Number
        </Button>
        <View>
          <Text>test</Text>
        </View>
        <View>
          <Text>Hello, World</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(UserActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
