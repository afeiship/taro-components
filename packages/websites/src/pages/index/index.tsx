import { Component } from "react";
import { View, Image, Text, Checkbox } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import TaroSelect from "@jswork/taro-select";
// import TaroEcharts from "@jswork/taro-echarts";
// import * as echarts from "@jswork/echarts-tiny/lib/echarts.min";
import { css } from "@linaria/core";
import { styled } from "linaria/react";
import StyledBox from "@jswork/styled-box";
import { AtButton, AtFab, AtIcon } from "taro-ui";
// import

// http://jsonplaceholder.typicode.com/photos?_start=2&_limit=5

import TaroDataList from "@jswork/taro-data-list";
import TaroSelectGroup from "@jswork/taro-select-group";
import CheckboxView from "@jswork/taro-checkbox-group";
import RadioGroupView from "@jswork/taro-radio-group";

Object.assign(StyledBox.defaultProps, { engine: { styled, css } });

const StyledList = styled(View)`
  scroll-view {
    padding: 20px;
    border: 1px solid red;
    box-sizing: border-box;
    height: 600px;
  }
  .template-item {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 24px;
  }

  .template-init,
  .template-no-more {
    text-align: center;
    padding: 20px;
    color: #999;
  }
`;

const TaroGroupContainter = styled(View)`
  padding: 10px;
  margin: 20px auto;
  width: 80%;
  text-align: center;
  border: 1px solid #ccc;
  .is-placeholder {
    color: #999;
  }
`;

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
    return (
      <View className="index">
        <RadioGroupView
          value="cz"
          items={radioItems}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <CheckboxView
          items={checkItems}
          value={["01", "02"]}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <CheckboxView
          items={checkItems}
          template={this.checkTemplate}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        {/* <Picks /> */}
        <TaroGroupContainter>
          <TaroSelectGroup
            items={groupItems}
            value={groupValue}
            onChange={(e) => {
              this.setState({ groupValue: e.target.value });
            }}
          />
        </TaroGroupContainter>
        {/* <StyledBox p={10} debug auto wp={8}>
          StyleBox comming.
        </StyledBox> */}
        {/* <TaroEcharts
          echarts={echarts}
          width={"100%"}
          height={300}
          onInit={this.handleInit}
          canvasId="myCanvas"
        /> */}

        <TaroSelect
          labelKey="name"
          valueKey="id"
          noecho
          items={this.state.items}
          onChange={(e) => {
            console.log("e:", e.target.value);
          }}
        />

        <StyledList>
          <TaroDataList
            scrollY
            refresherEnabled
            api={this.apiService}
            size={20}
            dataGetter={(e) => e.data}
            hasMore={(e) => {
              console.log("e", e, e.data.length <= 10);
              return e.data.length === 20;
            }}
            onChange={(e) => {
              const { items } = e.target.value;
              this.setState({ dataSource: items });
            }}
            template={(action, args) => {
              if (action === "ITEM") {
                const { item, index } = args;
                return (
                  <View className="template-item">
                    <Text>{item.id}</Text>
                    <Checkbox checked={item.complete} />
                    <Text>Hello {item.title}</Text>
                  </View>
                );
              }

              if (action === "LOAD_MORE") {
                return <View className="template-init">上滑加载更多...</View>;
              }

              if (action === "INIT") {
                return <View className="template-init">数据加载中...</View>;
              }

              if (action === "NO_MORE") {
                return (
                  <View className="template-no-more">没有可以加载的数据啦</View>
                );
              }
            }}
          />
        </StyledList>
      </View>
    );
  }
}
