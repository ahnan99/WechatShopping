import { Component } from "react";
import { View, Button, Text, Swiper, SwiperItem } from "@tarojs/components";
import Taro from "@tarojs/taro";
import {
    AtModal,
    AtModalHeader,
    AtModalContent,
    AtModalAction,
    AtInputNumber,
    AtButton, AtActivityIndicator
} from "taro-ui";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "taro-ui/dist/style/components/input-number.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/modal.scss";
import "taro-ui/dist/style/components/toast.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/loading.scss";
import "taro-ui/dist/style/components/flex.scss";

import { actions as GoodsActions } from "../../modules/goods";
import { actions as CartActions } from "../../modules/cart";
import { actions as OrderActions } from "../../modules/order";
import axios from "taro-axios";
import "./details.css";
import "taro-ui/dist/style/components/activity-indicator.scss";
import 'taro-ui/dist/style/components/loading.scss';

class details extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            value: 1,
            isOpen: false,
            cart: false,
        };
    }

    componentDidMount() {
        console.log(
            "detail loaded",
            Taro.getCurrentInstance().router.params.goodsID
        );
        this.props.actions.getGoodsDetail({
            goodsID: Taro.getCurrentInstance().router.params.goodsID,
        });
    }

    handleChange(value) {
        this.setState({
            value,
        });
    }

    handleOpen = (cart) => {
        this.setState(
            {
                cart,
            },
            () => {
                this.setState({ isOpen: true });
                this.setState({ value: 1 });
            }
        );
    };

    handleClose = () => {
        this.setState({ isOpen: false });
    };

    handleSubmit = (good) => {
        if (this.state.cart) {
            this.props.cartActions.postNewGoods({
                goodsID: good.goodsID,
                qty: this.state.value,
            });
        } else {
            this.props.orderActions.postPreOrderGoods({
                goodsID: good.goodsID,
                qty: this.state.value,
            });
        }

    };

    componentDidUpdate = (prevProps) => {
        console.log("updated!", prevProps.cart.postNewGoods);
        if (!prevProps.cart.postNewGoods && this.props.cart.postNewGoods) {
            if (this.props.cart.postNewGoods.status === 0) {
                this.handleClose();
                Taro.showToast({
                    title: "加入购物车成功",
                    icon: "success",
                    duration: 2000,
                });
                this.props.cartActions.updatePostNewGoods(null);
            }
        }
        if (!prevProps.order.postPreOrderGoods && this.props.order.postPreOrderGoods) {
            if (this.props.order.postPreOrderGoods.status === 0) {
                console.log('结算成功')
                Taro.navigateTo({ url: `/pages/order/preOrder?orderID=${this.props.order.postPreOrderGoods.preOrderID}` })
            } else {
                Taro.showToast({
                    title: '生成预订单错误',
                    icon: 'error',
                    duration: 2000
                })
            }
            this.props.orderActions.updatePostPreOrderGoods(null)
        }
    };

    componentWillUnmount() {
        this.props.actions.updateGoodsDetail(null);
    }

    render() {
        const good = this.props.goods.goodsDetail;
        const { isOpen, cart } = this.state;
        if (!good) {
            return <View><AtActivityIndicator size={64}></AtActivityIndicator></View>;
        }
        return (
            <View>
                <AtModal isOpened={isOpen}>
                    <AtModalHeader>{cart ? "加入购物车" : "立即购买"}</AtModalHeader>
                    <AtModalContent>
                        购买数量&nbsp;
                        <AtInputNumber
                            min={0}
                            max={10}
                            step={1}
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                        />
                    </AtModalContent>
                    <AtModalAction>
                        <AtButton onClick={this.handleClose} type='secondary' size='small'>取消</AtButton>
                        <AtButton onClick={() => this.handleSubmit(good)} type='primary' size='small'>确定</AtButton>
                    </AtModalAction>
                </AtModal>
                <View class="swiper-container" id="swiper-container">
                    <Swiper className="swiper_box" indicator-dots="true" indicator-active-color="#fff"
                        autoplay="1" circular>
                        {good?.pics?.map(pic => (
                            <SwiperItem key="id">
                                <image src={axios.defaults.baseURL + pic.filename} style={{height:"100%"}} mode="aspectFill" lazy-load="true" />
                            </SwiperItem>
                        ))}
                    </Swiper>
                </View>
                <View className="goods-info">
                    <View className="goods-info-top-container">
                        <View className="goods-profile">
                            <View className="p">¥{good.price}</View>
                            <View className='at-row'>
                                <View className='at-col at-col-1'></View>
                                <View className='at-col at-col-6'>
                                    <AtButton onClick={() => this.handleOpen(true)} type='primary' size='small'>加入购物车</AtButton>
                                </View>
                                <View className='at-col at-col-0'></View>&nbsp;&nbsp;
                                <View className='at-col at-col-5'>
                                    <AtButton onClick={() => this.handleOpen(false)} type='primary' size='small' style={{ paddingleft: "30px" }}>立即购买</AtButton>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className="goods-title">
                        <Text>{good.item_detail}</Text>
                    </View>
                    <View className="characteristic">
                        <View>规格：{good.size}&nbsp;&nbsp;&nbsp;&nbsp;生产商：{good.manufacturer}</View>
                        {good.returnDays===0?
                            <View>本商品不支持退货</View>:                          
                            <View>支持{good.returnDays}天无理由退货</View>
                        }
                    </View>
                    <View className="goods-share">
                        <Text>积分奖励：{good.points}点</Text>
                    </View>
                </View>
                <View className="goods-des-info" id="goods-des-info">
                    <View className="label-title"> 
                        <View className="left">商品详情</View>
                    </View>
                    <View className="goods-text">
                        <View className="left">{good.memo}</View>
                    </View>
                </View>

            </View>
        );
    }
}
const mapStateToProps = (state) => ({
    goods: state.goods,
    cart: state.cart,
    order: state.order
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(GoodsActions, dispatch),
    cartActions: bindActionCreators(CartActions, dispatch),
    orderActions: bindActionCreators(OrderActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(details);
