import { Component } from "react";
import { View, Button, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import { AtRadio, AtTextarea }  from 'taro-ui'

import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/textarea.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/radio.scss";
import { actions as OrderActions } from "../../modules/order";

class preOrder extends Component {
    constructor () {
        super(...arguments)
        this.state = {
          value: this.props.order.preOrder?this.props.order.preOrder.addressID:'',
          text:{},
        }
      }
    
  componentDidMount() {
    
  }

  componentDidUpdate = prevProps => {
      if(!prevProps.order.postSubmitPreOrder && this.props.order.postSubmitPreOrder){
          if(this.props.order.postSubmitPreOrder.status !== 0){
            Taro.showToast({
                title: '生成订单错误',
                icon: 'error',
                duration: 2000
              })
          }
          this.props.actions.updatePostSubmitPreOrder(null)
          Taro.navigateBack()
          Taro.navigateTo({url: `/pages/order/payment?orderID=${Taro.getCurrentInstance().router.params.orderID}`})
      }

      if(!prevProps.order.postPreOrderMemo && this.props.order.postPreOrderMemo){
        if(this.props.order.postPreOrderMemo.status === 0){
          this.props.actions.getPreOrderDetail({
            ID: Taro.getCurrentInstance().router.params.orderID,
          });
          this.props.actions.updatePostSubmitPreOrder(null)
        }else{
          Taro.showToast({
            title: '更新失败',
            icon: 'error',
            duration: 2000
          })
        } 
      }

      if(!prevProps.order.postCancelPreOrder && this.props.order.postCancelPreOrder){
        if(this.props.order.postCancelPreOrder.status === 0){
          Taro.navigateBack()
        }else{
          Taro.showToast({
            title: '更新失败',
            icon: 'error',
            duration: 2000
          })
        } 
        this.props.actions.updatePostCancelPreOrder(null)
      }

      if(this.props.order.preOrderDetail && prevProps.order.preOrderDetail != this.props.order.preOrderDetail){
        let textState = {}
        this.props.order.preOrderDetail.map(item => {textState[item.ID] = item.memo_order})
        console.log(textState)
        this.setState({text: textState}) 
      }

    }


    

  

  handleAddReceiver = () => {
    Taro.navigateTo({url: `/pages/order/receiverDetail`})
  }

  componentDidShow(){
    console.log(
        "fetching order: ",
        Taro.getCurrentInstance().router.params.orderID
      );
      this.props.actions.getPreOrder({
        ID: Taro.getCurrentInstance().router.params.orderID,
      });
      this.props.actions.getPreOrderDetail({
        ID: Taro.getCurrentInstance().router.params.orderID,
      });
      this.props.actions.getAddressList();
  }
  

  handleChange (value) {
    this.setState({
      value
    })
    this.props.actions.postSelAddress({ID: Taro.getCurrentInstance().router.params.orderID, addressID: value})
  }

  handleTextChange = (value, item) => {
    let textState = this.state.text
    textState[item.ID] = value
    this.setState({text: textState})
  }

  handleSubmit = () => {
       //console.log(this.state.text)
     this.props.actions.postSubmitPreOrder({ID: Taro.getCurrentInstance().router.params.orderID, detailMemo: this.state.text})
  }

  handleCancel = () => {
    //console.log(this.state.text)
    this.props.actions.postCancelPreOrder({ID: Taro.getCurrentInstance().router.params.orderID, detailMemo: this.state.text})
  }

  render() {
    if (!this.props.order.preOrder || !this.props.order.preOrderDetail || !this.props.order.addressList) {
      return <View>loading</View>;
    }
    
    let options = this.props.order.addressList.map(address=>{return {
        label:address.receiver, value: address.ID, desc: `${address.mobile} ${address.city}${address.district}${address.address}`
    }})

    if(this.props.order.preOrder.status !== 0){
      options = options.filter(option => option.value === this.props.order.preOrder.addressID)
      options[0].disabled = true
    }
    return (
      <View className="components-page">
        {this.props.order.preOrder.amount}
        {this.props.order.preOrderDetail.map((orderItem) => (
          <View key={orderItem.ID}>
            <View>{orderItem.goodsName}</View>
            <View>{orderItem.price}</View>
            <View>{orderItem.qty}</View>
            <View>{orderItem.total}</View>
            <AtTextarea disabled={this.props.order.preOrder.status !== 0} count={false} value={this.state.text[orderItem.ID]} onChange={value=>this.handleTextChange(value, orderItem)} maxLength={150} placeholder='备注...' />
          </View>
        ))}
        <View>选择收件人</View>
        <View>
        <AtRadio options={options} value={this.state.value} onClick={this.handleChange.bind(this)} />
        </View>
        <Button onClick={this.handleAddReceiver}>添加收件人</Button>
        <View>状态: {this.props.order.preOrder.statusName}</View>
        <Button onClick={()=>this.handleSubmit()}>提交</Button>
        <Button onClick={()=>this.handleCancel()}>取消</Button>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(OrderActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(preOrder);
