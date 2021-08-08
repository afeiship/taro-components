import React, { Component } from 'react';
import { CheckboxGroup, Checkbox } from '@tarojs/components';
import noop from '@jswork/noop';
import ReactList from '@jswork/react-list';
import { StandardProps } from '@tarojs/components';

interface EventTarget {
  target: {
    value: any;
  };
}

type Props = StandardProps & {
  items: any[];
  template?: any;
  value?: any[];
  onChange?: (e: EventTarget) => void;
};

/**
 * Taro.Checkbox
 * https://developers.weixin.qq.com/miniprogram/dev/component/checkbox.html
 * https://docs.taro.zone/docs/components/forms/checkbox
 */

const DEFAULT_TEMPLATE = ({ item }, cb) => {
  return (
    <Checkbox checked={cb()} value={item.value}>
      {item.label}
    </Checkbox>
  );
};

export default class extends Component<Props, any> {
  static defaultProps = {
    items: [],
    value: [],
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
      <CheckboxGroup onChange={this.handleChange} {...props}>
        <ReactList virtual items={items} template={this.template} />
      </CheckboxGroup>
    );
  }
}
