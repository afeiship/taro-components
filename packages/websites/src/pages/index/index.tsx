import { Component } from "react";
import { View, Image, Picker, Text, Checkbox } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import TaroSelect from "@jswork/taro-select";
// import TaroEcharts from "@jswork/taro-echarts";
// import * as echarts from "@jswork/echarts-tiny/lib/echarts.min";
import { css } from "@linaria/core";
import { styled } from "linaria/react";
// import StyledBox from "@jswork/styled-box";
import { AtButton, AtFab, AtIcon } from "taro-ui";
// import

// http://jsonplaceholder.typicode.com/photos?_start=2&_limit=5

import TaroDataList from "@jswork/taro-data-list";
import TaroSelectGroup from "@jswork/taro-select-group";
// import CheckboxView from "@jswork/taro-checkbox-group";
import RadioGroupView from "@jswork/taro-radio-group";
import CheckBoxView from './checkbox';
// Object.assign(StyledBox.defaultProps, { engine: { styled, css } });

const Container = styled(View)``;


export default class Index extends Component {
  state = {
    ready: false,
    dataSource: [],
    items: [
      { name: "fei", id: 1 },
      { name: "zheng", id: 2 },
      { name: "afeiship", id: 3 },
    ],
    groupValue: [-1, -1],
    groupItems: [
      [
        { value: "xx", label: "小学" },
        { value: "cz", label: "初中" },
        { value: "gz", label: "高中" },
      ],
      [
        { value: "01", label: "01班" },
        { value: "02", label: "02班" },
        { value: "03", label: "03班" },
        { value: "04", label: "04班" },
        { value: "05", label: "05班" },
      ],
    ],
    radioItems: [
      { value: "xx", label: "小学" },
      { value: "cz", label: "初中" },
      { value: "gz", label: "高中" },
    ],
    checkItems: [
      { value: "01", label: "01班" },
      { value: "02", label: "02班" },
      { value: "03", label: "03班" },
      { value: "04", label: "04班" },
      { value: "05", label: "05班" },
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
        text: "某地区蒸发量和降水量",
        subtext: "纯属虚构",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["蒸发量", "降水量"],
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "蒸发量",
          type: "bar",
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
          ],
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }],
          },
        },
        {
          name: "降水量",
          type: "bar",
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
          ],
          markPoint: {
            data: [
              { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
              { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }],
          },
        },
      ],
    });
  };

  apiService = (options) => {
    return new Promise((resolve) => {
      Taro.request({
        method: "GET",
        url: `https://jsonplaceholder.typicode.com/todos?_page=${options.page}&_limit=${options.size}`,
        success: resolve,
      });
    });
  };

  checkTemplate = ({ item }) => {
    return (
      <View style={{ border: "1px solid red" }}>
        <Checkbox value={item.value}>{item.label}</Checkbox>
      </View>
    );
  };

  render() {
    // const header = css`
    //   font-size: 24px;
    //   font-weight: bold;
    //   border: 1px solid #ccc;
    // `;

    // console.log(header);

    const { dataSource, groupValue, radioItems, checkItems, groupItems } =
      this.state;
    const value = ["广东省", "广州市", "海珠区"];
    const customItem = "全部";
    const regions = [
      [
        { label: "初一", value: 7 },
        { label: "初二", value: 8 },
        { label: "初三", value: 9 },
      ],
      [
        { value: 1, label: "初三1班" },
        { value: 2, label: "初三2班" },
        { value: 3, label: "初三3班" },
        { value: 4, label: "初三4班" },
        { value: 5, label: "初三5班" },
        { value: 6, label: "初三6班" },
        { value: 7, label: "初三7班" },
        { value: 8, label: "初三8班" },
        { value: 9, label: "初三9班" },
        { value: 10, label: "初三10班" },
        { value: 11, label: "初三11班" },
        { value: 12, label: "初三12班" },
        { value: 13, label: "初三14班" },
      ],
    ];
    return (
      <View className="index">
        <Container>Container</Container>
        <Picker
          mode="region"
          value={value}
          onChange={(e) => {
            console.log(e.detail.value);
          }}
        >
          省市区
        </Picker>
        <RadioGroupView
          value="cz"
          items={radioItems}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <CheckBoxView />
        <TaroSelect
          labelKey="name"
          valueKey="id"
          noecho
          items={this.state.items}
          onChange={(e) => {
            console.log("e:", e.target.value);
          }}
        />
      </View>
    );
  }
}
