import { Component } from "react";
import { View, Text } from "@tarojs/components";
import "./index.scss";
import TaroSelect from "@jswork/taro-select";

export default class Index extends Component {
  state = {
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
    const { items } = this.state;
    return (
      <View className="index">
        <Text>Hello world!</Text>
        <TaroSelect
          labelKey="name"
          valueKey="value"
          onChange={this.handleChange}
          items={items}
        />
      </View>
    );
  }
}
