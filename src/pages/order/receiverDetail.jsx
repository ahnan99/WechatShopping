import React, { Component } from "react";
import { View, Button, Text, Form, Picker } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/form.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/loading.scss";
import { AtInput, AtButton, AtList, AtListItem } from 'taro-ui'

import { actions as OrderActions } from "../../modules/order";

class receiverDetail extends Component {

    constructor() {
        super()
        this.state = {
            receiver: '',
            region: '',
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
        if (!prevProps.order.postAddress && this.props.order.postAddress) {
            Taro.showToast({
                title: '添加收件人成功',
                icon: 'success',
                duration: 1000
            })
            this.props.actions.updatePostAddress(null)
            Taro.navigateBack()
        }
    }

    componentDidShow() {
        this.props.actions.getRegionList({ level: 1 });
    }

    handleChangeReceiver = (receiver) => {
        this.setState({
            receiver
        })
        return receiver
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

    onSubmit(event) {
        if (!this.state.region || !this.state.receiver || !this.state.city || !this.state.mobile || !this.state.address) {
            Taro.showToast({
                title: '请填写省、市、地址、姓名、手机',
                icon: 'none',
                duration: 2000
            })
            return
        }
        var telReg = /^1\d{10}$/;
        if (!telReg.test(this.state.mobile)) {
            Taro.showToast({
                title: '手机号码错误',
                icon: 'none',
                duration: 2000
            })
            return
        }
        this.props.actions.postAddress({
            ID: 0,
            receiver: this.state.receiver,
            region: this.state.region.cityName,
            city: this.state.city.cityName,
            district: this.state.district?.cityName,
            address: this.state.address,
            zip: this.state.zip,
            mobile: this.state.mobile,
            hot: 0,
            status: 0,
            memo: "",
            regDate: "2021-02-11"
        })
        this.setState({ disabled: true })
        this.setState({ loading: true })
    }

    onChangeRegion = e => {
        this.setState({ region: this.props.order.regionList[e.detail.value] }, () => {
            this.setState({ city: '', district: '' })
            this.props.actions.getCityList({
                level: 2, pID: this.state.region.cityID
            })
        })
    }
    onChangeCity = e => {
        this.setState({ city: this.props.order.cityList[e.detail.value] }, () => {
            this.props.actions.getDistrictList({ level: 3, pID: this.state.city.cityID })
            this.setState({ district: '' })
        })
    }
    onChangeDistrict = e => {
        this.setState({ district: this.props.order.districtList[e.detail.value] })
    }

    render() {
        if (!this.props.order.regionList) {
            return (
                <View>loading</View>
            )
        }
        const regionSelections = this.props.order.regionList.map(region => { return { key: region.cityName, value: region.cityID } })
        const citySelections = this.props.order.cityList?.map(region => { return { key: region.cityName, value: region.cityID } })
        const districtSelections = this.props.order.districtList?.map(region => { return { key: region.cityName, value: region.cityID } })
        return (
            <Form onSubmit={this.onSubmit.bind(this)} >
                <AtInput
                    name='receiver'
                    title='收件人'
                    type='text'
                    placeholder='单行文本'
                    value={this.state.receiver}
                    onChange={value => this.handleChangeReceiver(value)}
                />
                <Picker mode='selector' range={regionSelections} rangeKey="key" onChange={this.onChangeRegion}>
                    <AtList>
                        <AtListItem
                            title='省'
                            extraText={this.state.region.cityName}
                        />
                    </AtList>
                </Picker>
                <Picker mode='selector' range={citySelections} rangeKey="key" onChange={this.onChangeCity}>
                    <AtList>
                        <AtListItem
                            title='城市'
                            extraText={this.state.city.cityName}
                        />
                    </AtList>
                </Picker>
                <Picker mode='selector' range={districtSelections} rangeKey="key" onChange={this.onChangeDistrict}>
                    <AtList>
                        <AtListItem
                            title='区县'
                            extraText={this.state.district.cityName}
                        />
                    </AtList>
                </Picker>
                <AtInput
                    name='address'
                    title='地址'
                    type='text'
                    placeholder='单行文本'
                    value={this.state.address}
                    onChange={value => this.handleChangeAddress(value)}
                />
                <AtInput
                    name='zip'
                    title='邮编'
                    type='text'
                    placeholder='单行文本'
                    value={this.state.zip}
                    onChange={value => this.handleChangeZip(value)}
                />
                <AtInput
                    name='mobile'
                    title='手机'
                    type='text'
                    placeholder='单行文本'
                    value={this.state.mobile}
                    onChange={value => this.handleChangeMobile(value)}
                />
                <View className='at-row at-row__justify--around' style={{ margin: "20rpx 0" }}>
                    <View className='at-col at-col-2'></View>
                    <View className='at-col at-col-2'> <AtButton circle size="small" type='primary' loading={this.state.loading} disabled={this.state.disabled} onClick={e => this.onSubmit(e)}>保存</AtButton></View>
                    <View className='at-col at-col-2'></View>
                </View>
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
