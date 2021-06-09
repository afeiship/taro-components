import React, { Component } from 'react';
import { ScrollView, View } from '@tarojs/components';
import noop from '@jswork/noop';
import ReactList from '@jswork/react-list';
import RCM from '@jswork/react-condition-manager';

type TemplateAction = 'INIT' | 'LOAD_MORE' | 'NO_MORE' | 'ITEM';
type ScrollViewProps = React.ComponentProps<typeof ScrollView>;
type Props = ScrollViewProps & {
  api: (args: any) => Promise<any>;
  options?: (args: any) => any;
  onChange?: (args: any) => any;
  dataGetter?: (response: any) => any;
  hasMore?: (response: any) => boolean;
  template?: (action: TemplateAction, opts?: any) => any;
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
  dataSource: any[];
}

export default class extends Component<Props, State> {
  static defaultProps = {
    api: Promise.resolve(),
    onChange: noop,
    options: () => null,
    hasMore: () => true,
    dataGetter: noop,
    template: noop,
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
          this.setState({ dataSource }, () => {
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
    return api({
      [pagination?.page!]: inPage,
      [pagination?.size!]: inSize,
      ...options
    });
  };

  public render() {
    const { dataSource, more } = this.state;
    const { template } = this.props;
    return (
      <ScrollView
        refresherTriggered={this.state.loading}
        onRefresherRefresh={this.handleRefresherRefresh}
        onScrollToLower={this.handleScrollToLower}
        {...this.props}>
        <RCM
          virtual
          items={[
            dataSource.length > 0,
            !more,
            dataSource.length && more,
            dataSource.length === 0
          ]}>
          <ReactList virtual items={dataSource} template={(opt) => template!('ITEM', opt)} />
          {template!('NO_MORE')}
          {template!('LOAD_MORE')}
          {template!('INIT')}
        </RCM>
      </ScrollView>
    );
  }
}
