import React, { Component } from "react";
import { View, Button, Text, Form } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/loading.scss";
import { AtInput, AtButton, AtForm }  from 'taro-ui'

import { actions as OrderActions } from "../../modules/order";

class receiverDetail extends Component {

    constructor () {
        super()
        this.state = {
          receiver: '',
          province: '',
          city: '',
          district: '',
          address: '',
          zip: '',
          mobile: '',
          disabled: false,
          loading: false
        }
      }

      componentDidUpdate = prevProps => {
        if(!prevProps.order.postAddress && this.props.order.postAddress){
           Taro.showToast({
               title: '添加收件人成功',
               icon: 'success',
               duration: 1000
             })
           this.props.actions.updatePostAddress(null)
            Taro.navigateBack()
        }
    }

      handleChangeReceiver = (receiver) => {
        this.setState({
            receiver
        })
        return receiver
      }

      handleChangeProvince = (province) => {
        this.setState({
            province
        })
        return province
      }

      handleChangeCity = (city) => {
        this.setState({
            city
        })
        return city
      }

      handleChangeDistrict = (district) => {
        this.setState({
            district
        })
        return district
      }

      handleChangeAddress = (address) => {
        this.setState({
            address
        })
        return address
      }

      handleChangeZip = (zip) => {
        this.setState({
            zip
        })
        return zip
      }

      handleChangeMobile = (mobile) => {
        this.setState({
            mobile
        })
        return mobile
      }

      onSubmit (event) {
        this.props.actions.postAddress({
            ID: 0,
            receiver: this.state.receiver,
            province: this.state.province,
            city: this.state.city,
            district: this.state.district,
            address: this.state.address,
            zip: this.state.zip,
            mobile: this.state.mobile,
            hot: 0,    
            status: 0,
            memo: "",
            regDate: "2021-02-11"
        })
        this.setState({disabled: true})
        this.setState({loading: true})
      }
 

  render() {
    return(
    <Form onSubmit={this.onSubmit.bind(this)} >
    <AtInput 
      name='receiver' 
      title='收件人' 
      type='text' 
      placeholder='单行文本' 
      value={this.state.receiver} 
      onChange={value=>this.handleChangeReceiver(value)} 
    />
    <AtInput 
      name='province' 
      title='省份' 
      type='text' 
      placeholder='单行文本' 
      value={this.state.province} 
      onChange={value=>this.handleChangeProvince(value)} 
    />
    <AtInput 
      name='city' 
      title='城市' 
      type='text' 
      placeholder='单行文本' 
      value={this.state.city} 
      onChange={value=>this.handleChangeCity(value)} 
    />
    <AtInput 
      name='district' 
      title='区县' 
      type='text' 
      placeholder='单行文本' 
      value={this.state.district} 
      onChange={value=>this.handleChangeDistrict(value)} 
    />
    <AtInput 
      name='address' 
      title='地址' 
      type='text' 
      placeholder='单行文本' 
      value={this.state.address} 
      onChange={value=>this.handleChangeAddress(value)} 
    />
    <AtInput 
      name='zip' 
      title='邮编' 
      type='text' 
      placeholder='单行文本' 
      value={this.state.zip} 
      onChange={value=>this.handleChangeZip(value)} 
    />
    <AtInput 
      name='mobile' 
      title='手机' 
      type='text' 
      placeholder='单行文本' 
      value={this.state.mobile} 
      onChange={value=>this.handleChangeMobile(value)} 
    />
    <AtButton loading={this.state.loading} disabled={this.state.disabled} onClick={e => this.onSubmit(e)}>提交</AtButton>
    <AtButton formType='reset'>重置</AtButton>
  </Form>
  )
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(OrderActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(receiverDetail);
