import React, { Component } from 'react';
import { ScrollView } from '@tarojs/components';
import noop from '@jswork/noop';
import ReactList from '@jswork/react-list';
import RCM from '@jswork/react-condition-manager';
import { Current } from '@tarojs/taro';

type TemplateAction = 'INIT' | 'LOAD_MORE' | 'NO_MORE' | 'ITEM' | 'EMPTY';
type ScrollViewProps = React.ComponentProps<typeof ScrollView>;
type Props = ScrollViewProps & {
  api: (args: any) => Promise<any>;
  height?: number | string;
  options?: (args: any) => any;
  onChange?: (args: any) => any;
  dataGetter?: (response: any) => any;
  hasMore?: (response: any) => boolean;
  template?: (action: TemplateAction, opts?: any) => any;
  min?: number;
  size?: number;
  pagination?: {
    start?: number;
    page?: string;
    size?: string;
    total?: string;
    rows?: string;
  };
};

interface State {
  loading: boolean;
  current: number;
  more: boolean;
  timestamp: number;
  dataSource: any[];
}

export default class extends Component<Props, State> {
  static defaultProps = {
    api: Promise.resolve(),
    height: '100%',
    onChange: noop,
    options: (args) => args,
    hasMore: () => true,
    dataGetter: noop,
    template: noop,
    min: 5,
    size: 10,
    pagination: {
      start: 1,
      page: 'page',
      size: 'size',
      total: 'total',
      rows: 'rows'
    }
  };

  constructor(inProps: Props) {
    super(inProps);
    const current = inProps?.pagination?.start as number;
    this.state = {
      loading: false,
      more: true,
      timestamp: 0,
      current,
      dataSource: []
    };
  }

  componentDidMount() {
    this.handleRefresherRefresh();
  }

  handleChange = (inDataSource) => {
    const { onChange } = this.props;
    onChange!({
      target: {
        value: {
          items: inDataSource,
          more: this.state.more
        }
      }
    });
  };

  handleRefresherRefresh = () => {
    this.setState({ loading: true });
    this.init().then((res) => {
      this.setState({ loading: false });
      this.handleChange(res);
    });
  };

  handleScrollToLower = () => {
    const { more } = this.state;
    more &&
      this.more().then((res) => {
        this.handleChange(res);
      });
  };

  init = () => {
    const { size, pagination, dataGetter } = this.props;
    return new Promise((resolve) => {
      const current = pagination?.start as number;
      this.setState({ more: true, current: current + 1 }, () => {
        this.load(current, size).then((res) => {
          const dataSource = dataGetter!(res);
          this.setState({ dataSource, timestamp: Date.now() }, () => {
            resolve(dataSource);
          });
        });
      });
    });
  };

  more = () => {
    const { size, hasMore, dataGetter } = this.props;
    let { current, dataSource } = this.state;
    return new Promise((resolve) => {
      this.load(current, size).then((res) => {
        const more = hasMore!(res);
        dataSource = dataSource.concat(dataGetter!(res));
        more && current++;
        this.setState({ current, more, dataSource }, () => {
          resolve(dataSource);
        });
      });
    });
  };

  load = (inPage, inSize) => {
    const { api, pagination, options } = this.props;
    const params = Current.router?.params;
    const opts = typeof options === 'function' ? options(params) : options;
    return api({
      [pagination?.page!]: inPage,
      [pagination?.size!]: inSize,
      ...opts
    });
  };

  public render() {
    const { dataSource, more, timestamp } = this.state;
    const { height, min, template, ...props } = this.props;
    return (
      <ScrollView
        refresherTriggered={this.state.loading}
        onRefresherRefresh={this.handleRefresherRefresh}
        onScrollToLower={this.handleScrollToLower}
        style={{ height }}
        {...props}>
        <RCM
          virtual
          items={[
            dataSource.length > 0 && dataSource.length <= min!,
            dataSource.length > min!,
            !more,
            dataSource.length && more,
            dataSource.length === 0 && timestamp === 0,
            dataSource.length === 0 && timestamp > 0
          ]}>
          <ReactList virtual items={dataSource} template={(opt) => template!('ITEM', opt)} />
          <React.Fragment></React.Fragment>
          {template!('NO_MORE')}
          {template!('LOAD_MORE')}
          {template!('INIT')}
          {template!('EMPTY')}
        </RCM>
      </ScrollView>
    );
  }
}
