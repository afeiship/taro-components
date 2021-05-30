import React, { Component } from 'react';
import { View } from '@tarojs/components';
import noop from '@jswork/noop';

/**
 * @reference: https://developers.weixin.qq.com/miniprogram/dev/component/picker.html
 */

export default class extends Component<any, any> {
  static defaultProps = {
    onChange: noop
  };

  public render() {
    const { onChange, ...props } = this.props;
    return <View>xxx.</View>;
  }
}
