import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, CheckboxGroup, View } from "@tarojs/components";

export class Default extends Component {
  render() {
    return (
      <View>
        <CheckboxGroup
          onChange={(e) => {
            console.log(e.detail);
          }}
        >
          <Checkbox value="ck1">选中1</Checkbox>
          <Checkbox value="ck2">选中2</Checkbox>
        </CheckboxGroup>
      </View>
    );
  }
}

export default Default;
