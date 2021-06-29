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
  value?: any[];
  valueKey: string;
  labelKey: string;
  placeholder?: string;
  current?: string;
  noecho?: boolean;
  labelTemplate?: (values: any[]) => string;
  onChange: (e: EventTarget) => void;
}

interface State {
  indexes: number[];
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
    labelTemplate: (values) => values.join(''),
    items: [],
    value: [],
    onChange: noop
  };

  get children() {
    const { placeholder, current, items, labelKey, labelTemplate } = this.props;
    const { indexes } = this.state;
    const hasTruthy = indexes.some((index) => index !== -1);
    const values = indexes.map((index, idx) => {
      const item = items[idx][index];
      return item ? item[labelKey] : '';
    });

    if (!hasTruthy) return <View className="is-placeholder">{placeholder}</View>;
    return (
      <View className="is-selected">
        {current}
        {labelTemplate!(values)}
      </View>
    );
  }

  constructor(inProps: Props) {
    super(inProps);
    const { value } = inProps;
    const indexes = this.toIndexes(value);
    this.state = { indexes };
  }

  shouldComponentUpdate(inProps) {
    const { value } = inProps;
    const indexes = this.toIndexes(value);
    if (indexes.join() !== this.state.indexes.join()) {
      this.setState({ indexes });
    }
    return true;
  }

  private handleChange = (inEvent: any) => {
    const indexes = inEvent.detail.value;
    const { onChange } = this.props;
    const value = this.toValue(indexes);
    onChange({ target: { value } });
  };

  private toIndexes(inValue) {
    const { items, valueKey } = this.props;
    return items.map((list, idx) => {
      return list.findIndex((item) => item[valueKey] === inValue[idx]);
    });
  }

  private toValue(inIndexes) {
    const { items, valueKey } = this.props;
    return inIndexes.map((index, idx) => {
      const list = items[idx];
      return index === -1 ? null : list[index][valueKey];
    });
  }

  public render() {
    const { items, placeholder, value, onChange, labelKey, valueKey, ...props } = this.props;
    const { indexes } = this.state;

    return (
      <Picker
        mode="multiSelector"
        range={items}
        onChange={this.handleChange}
        rangeKey={labelKey}
        value={indexes}
        {...props}>
        {this.children}
      </Picker>
    );
  }
}
