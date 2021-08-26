import {Component} from 'react'
import { View, Button, Text } from "@tarojs/components";

class cart extends Component {

    componentDidMount(){
        console.log("cart loaded")
    }

    componentDidShow() {
        console.log("cart show")
    }

    render(){
        return(
            <Text>Cart Cart</Text>
        )
    }
}

export default cart