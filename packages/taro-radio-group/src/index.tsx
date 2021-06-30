import React, { Component } from 'react';
import { RadioGroup, Radio } from '@tarojs/components';
import noop from '@jswork/noop';
import ReactList from '@jswork/react-list';

interface EventTarget {
  target: {
    value: any;
  };
}

interface Props {
  items: any[];
  template?: any;
  value?: any;
  onChange?: (e: EventTarget) => void;
}

/**
 * Taro.Radio
 * https://developers.weixin.qq.com/miniprogram/dev/component/Radio.html
 * https://docs.taro.zone/docs/components/forms/Radio
 */

const DEFAULT_TEMPLATE = ({ item }, cb) => {
  return (
    <Radio checked={cb()} value={item.value}>
      {item.label}
    </Radio>
  );
};

export default class extends Component<Props, any> {
  static defaultProps = {
    items: [],
    template: DEFAULT_TEMPLATE,
    onChange: noop
  };

  private handleChange = (inEvent) => {
    const { onChange } = this.props;
    const { value } = inEvent.detail;
    onChange!({ target: { value } });
  };

  template = (args) => {
    const { template, value } = this.props;
    const cb = () => {
      return value?.includes(args.item.value);
    };
    return template(args, cb);
  };

  public render() {
    const { items, template, onChange, ...props } = this.props;

    return (
      <RadioGroup onChange={this.handleChange} {...props}>
        <ReactList virtual items={items} template={this.template} />
      </RadioGroup>
    );
  }
}
