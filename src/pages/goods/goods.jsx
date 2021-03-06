import { Component } from 'react'
import { View, Button, Text, Image } from "@tarojs/components";
import { AtSearchBar, AtDrawer, AtButton, AtActivityIndicator, AtModal, AtModalHeader, AtModalContent, AtModalAction  } from 'taro-ui'
import Taro from '@tarojs/taro'
import { connect } from "react-redux";
import Popup from "../account/Popup"
import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/drawer.scss";
import "taro-ui/dist/style/components/list.scss";
import { actions as GoodsActions } from "../../modules/goods";
import { actions as UserActions } from "../../modules/user";
import { actions as OrderActions } from "../../modules/order"
import "./goods.css";
import API_GOODS from '../../api/goods.json'
import axios from "taro-axios";
import "taro-ui/dist/style/components/activity-indicator.scss";
import 'taro-ui/dist/style/components/loading.scss';

axios.defaults.baseURL = "https://yuanqingsong.com";
axios.interceptors.request.use(function (config) {
    if (Taro.getStorageSync('authorize')) {
        const token = Taro.getStorageSync('authorize');
        config.headers.Authorization = token;
    }
    return config;
});

class goods extends Component {

    constructor() {
        super(...arguments)
        this.state = {
            value: '',
            text: 'ç­éšćć',
            isOpened: false,
            amount: null
        }
        axios.interceptors.response.use((response) => {
            if (response.data && response.data.status === 99) {

            }
            return response;
        }, (error) => {
            this.login()
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        });
    }

    componentDidMount() {

    }



    componentDidUpdate = prevProps => {
        if (prevProps.user.authorize !== this.props.user.authorize) {
            console.log('chongxindenglu')
            this.componentDidShow()
        }

        if (!prevProps.order.postPayPreOrder && this.props.order.postPayPreOrder) {
            this.setState({ isOpened: true });
        }
    }

    componentDidShow() {
        if (!this.checkAuth()) { 
            this.login()
    
        }else{
            this.props.actions.getGoodsKind();
            this.props.actions.getTopGoods();
        }
      
    }

    onChange(value) {
        this.setState({
            value
        })
    }
    onActionClick() {
        const { value } = this.state
        console.log('ćŒć§æçŽą', value)
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
        //console.log("get member")
        this.props.actions.getMember({ memberID: this.props.user.memberID })

    }


    fetch = () => {
        Taro.getUserProfile({
            desc: 'çšäșćźćäŒćè”æ', // ćŁ°æè·ćçšæ·äžȘäșșäżĄæŻćççšéïŒćç»­äŒć±ç€șćšćŒčçȘäž­ïŒèŻ·è°šæćĄ«ć
            success: (res) => {
                console.log(res.userInfo)
            }
        })
    }


    componentDidHide() {
        this.props.actions.updateTopGoods(null);
        this.setState({ show: false, value: '' })
    }

    componentWillUnmount() {
        if (!this.props.user.memberID) {
            this.saveAuthToken(null);
        }
    }

    handleKindClick = kind => {
        this.props.actions.updateTopGoods(null)
        this.props.actions.getGoodsByKind({ kindID: kind.kindID })
        this.setState({ text: kind.kindName })
    }

    checkAuth = () => {
        //ä»çŒć­èŻ»ćææäżĄæŻ
        return this.props.user.authorize || Taro.getStorageSync('authorize');
    }

    login = async () => {
        //login
        let res = await Taro.login();

        //console.log("login", res)
        //è·ćtoken
        let response = await Taro.request({
            url: `${axios.defaults.baseURL}/users/getAccessToken?code=${res.code}&referee=${Taro.getCurrentInstance().router.params.referee}`,
            method: 'GET'
        })
        //console.log(res);
        //ć€æ­æŻćŠæć
        if (response.data && response.data.token) {
            //ćć„token
            let authorize = response.data.token;
            //console.log(response.data.token);


            if (response.data.status === 0) {
                this.props.userActions.updateInfoCompleted(true)
            } else if (response.data.status === 1) {
                this.props.userActions.updateInfoCompleted(false)
            } else {
                Taro.showToast({
                    title: response.data.msg,
                    icon: "error",
                    duration: 2000
                })
                this.props.userActions.updateInfoCompleted(false)
                return
            }

            
            this.props.userActions.updateSessionKey(response.data.session_key)
            this.props.userActions.updateMemberID(response.data.memberID);
            this.saveAuthToken(authorize);
            this.props.actions.getGoodsKind();
            this.props.actions.getTopGoods();
            if ((response.data.status === 0 || response.data.status === 1) && response.data.membership === 1) {
                this.props.orderActions.postPayPreOrder({ ID: response.data.preID })
                this.setState({amount: response.data.amount})
            }
            return true;
        } else {
            console.log('è·ćtokenć€±èŽ„');
            Taro.showToast({
                title: response.data.msg,
                icon: "error",
                duration: 2000
            })
            return false;
        }
    }

    handlePay = () => {
        if (!this.props.order.postPayPreOrder) {
            Taro.showToast({
                title: 'è·ćä»æŹŸäżĄæŻć€±èŽ„ïŒèŻ·éèŻ',
                icon: 'error',
                duration: 2000
            })
            this.setState({ isOpened: false });
            this.props.orderActions.updatePostPayPreOrder(null)
            return;
        };

        const { timeStamp, nonceStr, signType, paySign } = this.props.order.postPayPreOrder.data
        Taro.requestPayment({
            timeStamp: timeStamp.toString(),
            nonceStr: nonceStr,
            package: this.props.order.postPayPreOrder.data.package,
            signType: signType,
            paySign: paySign,
            success(res) {
                Taro.showToast({
                    title: 'ä»æŹŸæć',
                    icon: 'success',
                    duration: 2000
                })
            },
            fail(res) {
                console.log(res);
                Taro.showToast({
                    title: 'ä»æŹŸć€±èŽ„',
                    icon: 'error',
                    duration: 2000
                })
            },
            complete: (res) => {
                this.props.orderActions.updatePostPayPreOrder(null);
                this.setState({ isOpened: false });
            }
        })
    }

    saveAuthToken = (authorize) => {
        //ćć„ç¶æçźĄç
        //console.log("chengle", authorize);
        this.props.userActions.updateUserLogin(authorize)
        //ćć„çŒć­
        Taro.setStorageSync('authorize', authorize)
    }

    render() {
        //console.log("goodsKInd", this.props.goods.goodsKind)
        if (!this.props.goods.goodsKind || !this.props.goods.topGoods) {
            return (
                <View>
                    loading
                </View>
            )
        } else {
            const { topGoods } = this.props.goods;
            return (

                <View>
                    <AtModal isOpened={this.state.isOpened}>
                        <AtModalHeader>æç€ș</AtModalHeader>
                        <AtModalContent>
                            <Text style='padding: 15px 10px;background-color: #FAFBFC;text-align: left; font-size:1.3em;'>èŻ·æŻä»ćčŽèŽč{this.state.amount}ćă</Text>
                        </AtModalContent>
                        <AtModalAction> <Button onClick={() => { this.setState({ isOpened: false }); }}>ćæ¶</Button> <Button onClick={() => this.handlePay()}>çĄźèź€æŻä»</Button> </AtModalAction>
                    </AtModal>
                    <Popup isOpened={!this.props.user.infoCompleted} />
                    <AtSearchBar actionName='æäžäž' value={this.state.value} onChange={this.onChange.bind(this)} onActionClick={this.onActionClick.bind(this)} />
                    <View className='at-row at-row__justify--around'>
                        {this.props.goods.goodsKind.map(kind => (
                            <View className='at-col at-col-2'> <AtButton circle size="small" type='secondary' onClick={() => this.handleKindClick(kind)}>{kind.kindName}</AtButton></View>
                        ))}
                    </View>
                    <View style={{ textAlign: "center", margin: "30rpx" }}><image className="table-icon-tuijian" src="http://shznxfxx.cn/images/recommend.png"></image> {this.state.text}</View>
                    <View className="goods-container">
                        {topGoods ? topGoods.map(good => (
                            <View className="goods-box" key={good.ID} onClick={() => this.onClickItem(good)}>
                                <View className='img-box'><Image className="image" src={`${axios.defaults.baseURL}${good.filename}`} mode="aspectFill"></Image></View>
                                <View className='goods-title van-multi-ellipsis--l2'>{good.goodsName + '  ' + good.size}</View>
                                <View style={{ display: "flex" }}>
                                    <View className="goods-price">Â„{good.price}</View>
                                </View>
                            </View>
                        )) : <AtActivityIndicator size={64}></AtActivityIndicator>}
                    </View>
                </View>
            )
        }

    }
}

const mapStateToProps = (state) => ({
    goods: state.goods,
    user: state.user,
    order: state.order
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(GoodsActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
    orderActions: bindActionCreators(OrderActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(goods);
