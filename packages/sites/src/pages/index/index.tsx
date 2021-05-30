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

  handleInit = (e) => {
    const { value } = e.target;
    value.setOption({
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
    console.log("e.", value);
  };

  render() {
    console.log(this.state.items);
    return (
      <View className="index">
        <View>Hello wrold</View>
        <TaroEcharts
          height={300}
          onInit={this.handleInit}
          canvasId="myCanvas"
        />
      </View>
    );
  }
}
