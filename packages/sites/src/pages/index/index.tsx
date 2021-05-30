import { Component } from "react";
import { View, Canvas, Text } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import TaroSelect from "@jswork/taro-select";
import TaroEcharts from "@jswork/taro-echarts";

export default class Index extends Component {
  state = {
    ready: false,
    items: [
      { name: "fei", value: "f" },
      { name: "zheng", value: "z" },
      { name: "afeiship", value: "a" },
    ],
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleChange = (e) => {
    const { value } = e.target;
    console.log("e.", value);
  };

  render() {
    console.log(this.state.items);
    return (
      <View className="index">
        <View>Hello wrold</View>
        <TaroEcharts canvasId="myCanvas" />
      </View>
    );
  }
}
