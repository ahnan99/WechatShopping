import { Component } from "react";
import { View, Button, Text } from "@tarojs/components";
import {
    AtInputNumber,
  } from "taro-ui";

import "taro-ui/dist/style/components/input-number.scss";
import "./cart.css";
import API_CART from "../../api/cart.json";

class cart extends Component {
  componentDidMount() {
    console.log("cart loaded");
  }

  componentDidShow() {
    console.log("cart show");
  }

  handleChange(value) {
    console.log(value);
  }

  

  render() {
    const cartData = API_CART;
    return (
      <View>
        {cartData.map((item) => (
          <View className='tr'>
            <Text>{item.goodsName}</Text>
            <AtInputNumber
              min={0}
              max={10}
              step={1}
              value={item.qty}
              onChange={this.handleChange.bind(this)}
            />
          </View>
        ))}
      </View>
    );
  }
}

export default cart;
