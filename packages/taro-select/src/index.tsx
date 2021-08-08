import React, { Component } from 'react';
import { View, Picker, StandardProps } from '@tarojs/components';
import noop from '@jswork/noop';

interface EventTarget {
  target: {
    value: any;
  };
}

type Props = StandardProps & {
  items: any[];
  valueKey: string;
  labelKey: string;
  placeholder?: string;
  current?: string;
  value?: any;
  noecho?: boolean;
  onChange: (e: EventTarget) => void;
};

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
    noecho: false,
    items: [],
    onChange: noop
  };

  get item(): any {
    const { items } = this.props;
    const { index } = this.state;
    return items[index as number];
  }

  get children() {
    const { placeholder, current, noecho, labelKey } = this.props;
    const { index } = this.state;
    if (index === -1 || noecho) return <View className="is-placeholder">{placeholder}</View>;
    if (noecho) return null;
    return (
      <View className="is-selected">
        {current} {this.item[labelKey]}
      </View>
    );
  }

  constructor(inProps: Props) {
    super(inProps);
    const { value, valueKey } = inProps;
    const index = inProps.items.findIndex((item) => item[valueKey] === value);
    this.state = { index };
  }

  shouldComponentUpdate(inProps) {
    const { value, valueKey } = inProps;
    const index = inProps.items.findIndex((item) => item[valueKey] === value);
    if (index !== this.state.index) {
      this.setState({ index });
    }
    return true;
  }

  private handleChange = (inEvent: any) => {
    const { onChange, valueKey } = this.props;
    const { value } = inEvent.detail;
    this.setState({ index: parseInt(value) }, () => {
      onChange({ target: { value: this.item ? this.item[valueKey] : null } });
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
