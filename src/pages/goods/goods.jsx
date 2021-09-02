import {Component} from 'react'
import { View, Button, Text } from "@tarojs/components";
import { AtSearchBar, AtDrawer } from 'taro-ui'
import Taro from '@tarojs/taro'
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/drawer.scss";
import "taro-ui/dist/style/components/list.scss";
import { actions as GoodsActions } from "../../modules/goods";

import "./goods.css";
import API_GOODS from '../../api/goods.json'

class goods extends Component {

    constructor () {
        super(...arguments)
        this.state = {
          value: '',
          show: false
        }
      }

    componentDidMount(){
        
    }

    
  
    componentDidUpdate = prevProps =>{
      if(prevProps.goods.topGoods != this.props.goods.topGoods){

      }
    }

   componentDidShow() {
      this.props.actions.getGoodsKind();
      this.props.actions.getTopGoods();
    }

      onChange (value) {
        this.setState({
          value
        })
      }
      onActionClick () {
        const {value} = this.state 
        console.log('开始搜索', value)
        this.props.actions.updateTopGoods(null)
        if(value === ''){
          this.props.actions.getTopGoods();
        }else{
          this.props.actions.getGoodsBySearch({keyword : value})
        }
        
      }


    onClickItem = good => {
      Taro.navigateTo({
        url: `/pages/goods/details?goodsID=${good.goodsID}`
      })
    }

    onClose(){

    }

    componentDidHide(){
      this.props.actions.updateTopGoods(null);
      this.setState({show: false, value: ''})
    }

    handleKindClick = index => {
      console.log('Clicked', index)
      this.props.actions.updateTopGoods(null)
      this.props.actions.getGoodsByKind({kindID: this.props.goods.goodsKind[index].kindID})
      this.setState({show: false})
    }

    render(){

      const {topGoods} = this.props.goods;
      const kindList = this.props.goods.goodsKind?.map(obj=>{ if(obj) { return obj.kindName } })
      if(topGoods === "err"){
        return(
          <View>
           没登陆
          </View>
        )
      }
        return(
            
            <View className='components-page'>
                <AtDrawer show={this.state.show} mask onClose={this.onClose.bind(this)} items={kindList} onItemClick={this.handleKindClick}></AtDrawer>
                <AtSearchBar actionName='搜一下' value={this.state.value} onChange={this.onChange.bind(this)} onActionClick={this.onActionClick.bind(this)} />
              <Button onClick={()=>this.setState({show: true})}>分类查找</Button>
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
