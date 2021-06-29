import React from "react";
import { Picker } from "@tarojs/components";

export default class extends React.Component {
  state = {
    items: [
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
  };
  render() {
    return (
      <Picker
        mode="multiSelector"
        value="0"
        rangeKey={"label"}
        onChange={(e) => {
          console.log(e.detail);
        }}
        range={this.state.items}
      >
        Please select
      </Picker>
    );
  }
}
