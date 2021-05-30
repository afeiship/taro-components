import React, { Component } from 'react';
import { View, Canvas } from '@tarojs/components';
import noop from '@jswork/noop';
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import * as echarts from '@jswork/echarts-tinny/lib/echarts.min';
import EcCanvas from './ec-canvas';
/**
 * @reference: https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html#Canvas-2D-%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81
 */

export default class extends Component<any, any> {
  private chart;
  private $instance = getCurrentInstance();
  static defaultProps = {
    width: 375,
    height: 200,
    onInit: noop
  };

  public componentDidMount() {
    const { canvasId } = this.props;
    const onReadyEventId = this?.$instance?.router?.onReady || '';
    eventCenter.once(onReadyEventId, () => {
      Taro.createSelectorQuery()
        .select(`#${canvasId}`)
        .fields({ size: true })
        .exec((res) => {
          this.onCanvasReady(res);
        });
    });
  }

  private onCanvasReady = (inRes) => {
    const { onInit, canvasId } = this.props;
    const ctx = Taro.createCanvasContext(canvasId, this);
    const canvas = new EcCanvas(ctx);
    echarts.setCanvasCreator(() => canvas);
    this.chart = echarts.init(canvas, null, { width: inRes[0].width, height: inRes[0].height });
    canvas.setChart(this.chart);
    onInit({ target: { value: this.chart } });
  };

  public render() {
    const { width, height, onInit, canvasId, ...props } = this.props;
    return (
      <View style={{ width, height }}>
        <Canvas className={`ec-chart ${canvasId}`} id={canvasId} canvasId={canvasId} {...props} />
      </View>
    );
  }
}
