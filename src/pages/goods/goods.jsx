import {Component} from 'react'
import { View, Button, Text } from "@tarojs/components";
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";
import { actions as GoodsActions } from "../../modules/goods";

import "./goods.css";
import API_GOODS from '../../api/goods.json'

class goods extends Component {

    constructor () {
        super(...arguments)
        this.state = {
          value: ''
        }
      }

    componentDidMount(){
        
    }

    componentDidShow() {
       this.props.actions.getTopGoods();
    }

    componentDidUpdate = prevProps =>{
      if(prevProps.goods.topGoods != this.props.goods.topGoods){

      }
    }
 
      onChange (value) {
        this.setState({
          value: value
        })
      }
      onActionClick () {
        console.log('开始搜索')
      }


    onClickItem = good => {
      Taro.navigateTo({
        url: `/pages/goods/details?goodsID=${good.goodsID}`
      })
    }

    render(){

      const {topGoods} = this.props.goods;
      if(topGoods === "err"){
        return(
          <View>
           没登陆
          </View>
        )
      }
        return(
            
            <View className='components-page'>
                
                <AtSearchBar actionName='搜一下' value={this.state.value} onChange={this.onChange.bind(this)} onActionClick={this.onActionClick.bind(this)} />
            
              {topGoods?topGoods.map(good=>(
                <View key={good.ID} className='tr bg-g' onClick={() => this.onClickItem(good)}>
                  <View className='td'>{good.goodsName}</View>
                  <View className='td'>{good.memo}</View>
                </View>
              )):"loading"}
            
          </View>
        )
    }
}

const mapStateToProps = (state) => ({
  goods: state.goods,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(GoodsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(goods);
