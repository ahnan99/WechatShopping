import { Component } from 'react'
import { View, Button, Text, Image } from "@tarojs/components";
import { AtSearchBar, AtDrawer, AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/drawer.scss";
import "taro-ui/dist/style/components/list.scss";
import { actions as GoodsActions } from "../../modules/goods";
import { actions as UserActions } from "../../modules/user";
import "./goods.css";
import API_GOODS from '../../api/goods.json'
import axios from "taro-axios";

axios.defaults.baseURL = "https://27a5-2409-8a1e-6c52-f10-11a6-9192-5574-e54b.ngrok.io";
axios.interceptors.request.use(function (config) {
    if(Taro.getStorageSync('authorize')){
        const token = Taro.getStorageSync('authorize');
        config.headers.Authorization =  token;
    }
    return config;
  });
class goods extends Component {

    constructor() {
        super(...arguments)
        this.state = {
            value: '',
            text: '热门商品'
        }
    }

    componentDidMount() {
        if(!this.checkAuth()){
            this.login()
          } 
    }



    componentDidUpdate = prevProps => {
        if (prevProps.goods.topGoods != this.props.goods.topGoods) {
            
        }
    }

    componentDidShow() {
        this.props.actions.getGoodsKind();
        this.props.actions.getTopGoods();
    }

    onChange(value) {
        this.setState({
            value
        })
    }
    onActionClick() {
        const { value } = this.state
        console.log('开始搜索', value)
        this.props.actions.updateTopGoods(null)
        if (value === '') {
            this.props.actions.getTopGoods();
        } else {
            this.props.actions.getGoodsBySearch({ keyword: value })
        }

    }


    onClickItem = good => {
        Taro.navigateTo({
            url: `/pages/goods/details?goodsID=${good.goodsID}`
        })
    }

    onClose() {

    }

    getNum = e => {
        console.log(e)
      }
    
      fetchMember = () => {
        console.log("get member")
        this.props.actions.getMember({memberID: this.props.user.memberID})
      }
    

    fetch = () =>{
        Taro.getUserProfile({
          desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            console.log(res.userInfo)
          }
        })
      }
    

    componentDidHide() {
        this.props.actions.updateTopGoods(null);
        this.setState({ show: false, value: '' })
    }

    handleKindClick = kind => {
        this.props.actions.updateTopGoods(null)
        this.props.actions.getGoodsByKind({ kindID: kind.kindID })
        this.setState({text: kind.kindName})
    }

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
            this.props.userActions.updateMemberID(response.data.memberID);
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
        this.props.userActions.updateUserLogin(authorize)
        //写入缓存
        Taro.setStorageSync('authorize',authorize)
      }

    render() {

        const { topGoods } = this.props.goods;
        const kindList = this.props.goods.goodsKind?.map(obj => { if (obj) { return obj.kindName } })
        if (topGoods === "err") {
            return (
                <View>
                    没登陆
                </View>
            )
        }
        return (

            <View>
  
                <AtSearchBar actionName='搜一下' value={this.state.value} onChange={this.onChange.bind(this)} onActionClick={this.onActionClick.bind(this)} />
                {this.props.goods.goodsKind?.map(kind=>(
                    <AtButton type='secondary' onClick={()=>this.handleKindClick(kind)}>{kind.kindName}</AtButton>
                ))}
                <View style={{textAlign:"center"}}><image className="table-icon-tuijian" src="../../image/recommend.png"></image> {this.state.text}</View>
                <View className="goods-container">
                    {topGoods ? topGoods.map(good => (
                        <View className="goods-box" key={good.ID} onClick={() => this.onClickItem(good)}>
                            <View className='img-box'><Image className="image" src={`${axios.defaults.baseURL}${good.filename}`} mode="aspectFill"></Image></View>
                            <View className='goods-title van-multi-ellipsis--l2'>{good.goodsName}</View>
                            <View style={{display:"flex"}}>
                                <View className="goods-price">¥{good.price}</View>
                            </View>
                        </View>
                    )) : "loading"}
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    goods: state.goods,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(GoodsActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(goods);
