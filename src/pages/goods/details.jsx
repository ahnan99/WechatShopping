import { Component } from "react";
import { View, Button, Text } from "@tarojs/components";
import Taro from '@tarojs/taro'
import {
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtInputNumber,
} from "taro-ui";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "taro-ui/dist/style/components/input-number.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/modal.scss";
import API_GOODS from "../../api/goodDetail.json";

import { actions as GoodsActions } from "../../modules/goods";

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
    console.log("detail loaded", Taro.getCurrentInstance().router.params.goodsID);
    this.props.actions.getGoodsDetail({goodsID: Taro.getCurrentInstance().router.params.goodsID})
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

  componentDidShow() {
    console.log("cart show");
  }

  render() {
    const good = this.props.goods.goodsDetail;
    const { isOpen, cart } = this.state;
    if(!good){
        return (
            <View>
                loading
            </View>
        )
    }
    return (
      <View>
        <AtModal isOpened={isOpen}>
          <AtModalHeader>{cart ? "加入购物车" : "立即购买"}</AtModalHeader>
          <AtModalContent>
            选择数量&nbsp;
            <AtInputNumber
              min={0}
              max={10}
              step={1}
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.handleClose}>取消</Button>{" "}
            <Button onClick={this.handleClose}>确定</Button>
          </AtModalAction>
        </AtModal>
        <Text>{good.goodsName}</Text>
        <Text>{good.item_detail}</Text>
        <Text>{good.memo}</Text>
        <Text>价格：{good.pirce}</Text>
        <Text>折后价格：{good.discountPrice}</Text>
        <Text>退换货：{good.returnDaysName}</Text>
        <Button onClick={() => this.handleOpen(true)}>加入购物车</Button>
        <Button onClick={() => this.handleOpen(false)}>李炯股买</Button>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
    goods: state.goods,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(GoodsActions, dispatch),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(details);
