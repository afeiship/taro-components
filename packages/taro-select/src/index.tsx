import React, { Component } from 'react';
import { View, Picker } from '@tarojs/components';
import noop from '@jswork/noop';

interface EventTarget {
  target: {
    value: any;
  };
}

interface Props {
  items: any[];
  valueKey: string;
  labelKey: string;
  placeholder?: string;
  current?: string;
  value?: any;
  onChange: (e: EventTarget) => void;
}

interface State {
  index: number | undefined;
}

/**
 * Taro.Picker 的 mode="selector" 版本
 * @reference: https://developers.weixin.qq.com/miniprogram/dev/component/picker.html
 */

export default class extends Component<Props, State> {
  static defaultProps = {
    valueKey: 'value',
    labelKey: 'label',
    placeholder: '请选择',
    current: '当前选择',
    items: [],
    onChange: noop
  };

  get item(): any {
    const { items } = this.props;
    const { index } = this.state;
    return items[index || -1];
  }

  get children(): JSX.Element {
    const { placeholder, current, labelKey } = this.props;
    const { index } = this.state;
    if (index === -1) return <View className="is-placeholder">{placeholder}</View>;
    return (
      <View className="is-selected">
        {current} {this.item[labelKey]}
      </View>
    );
  }

  constructor(inProps: Props) {
    super(inProps);
    this.state = {
      index: inProps.value
    };
  }

  private handleChange = (inEvent: any) => {
    const { onChange, valueKey } = this.props;
    const { value } = inEvent.detail;
    this.setState({ index: value }, () => {
      onChange({ target: { value: this.item[valueKey] } });
    });
  };

  public render() {
    const { items, placeholder, value, onChange, labelKey, valueKey, ...props } = this.props;
    const { index } = this.state;

    return (
      <Picker
        mode="selector"
        range={items}
        onChange={this.handleChange}
        rangeKey={labelKey}
        value={index}
        {...props}>
        {this.children}
      </Picker>
    );
  }
}
