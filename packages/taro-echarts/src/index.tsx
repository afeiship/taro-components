import React, { Component } from 'react';
import { View, Canvas } from '@tarojs/components';
import noop from '@jswork/noop';
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import EcCanvas from './ec-canvas';

/**
 * @reference: https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html#Canvas-2D-%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81
 */

function wrapTouch(event) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return event;
}

export default class extends Component<any, any> {
  private chart;
  private $instance = getCurrentInstance();
  public static defaultProps = {
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

  public onCanvasReady = (inRes) => {
    const { echarts, onInit, canvasId } = this.props;
    const ctx = Taro.createCanvasContext(canvasId, this);
    const canvas = new EcCanvas(ctx);
    echarts.setCanvasCreator(() => canvas);
    this.chart = echarts.init(canvas, null, { width: inRes[0].width, height: inRes[0].height });
    canvas.setChart(this.chart);
    onInit({ target: { value: this.chart } });
  };

  public handleStart = (e) => {
    if (this.chart && e.touches.length > 0) {
      const touch = e.touches[0];
      const handler = this.chart.getZr().handler;
      const detail = { zrX: touch.x, zrY: touch.y };
      handler.dispatch('mousedown', detail);
      handler.dispatch('mousemove', detail);
      handler.processGesture(wrapTouch(e), 'start');
    }
  };

  public handleMove = (e) => {
    if (this.chart && e.touches.length > 0) {
      const touch = e.touches[0];
      const handler = this.chart.getZr().handler;
      const detail = { zrX: touch.x, zrY: touch.y };
      handler.dispatch('mousemove', detail);
      handler.processGesture(wrapTouch(e), 'change');
    }
  };

  handleEnd = (e) => {
    if (this.chart) {
      const touch = e.changedTouches ? e.changedTouches[0] : {};
      const handler = this.chart.getZr().handler;
      const detail = { zrX: touch.x, zrY: touch.y };
      handler.dispatch('mouseup', detail);
      handler.dispatch('click', detail);
      handler.processGesture(wrapTouch(e), 'end');
    }
  };

  public render(): JSX.Element {
    const { width, height, onInit, canvasId, ...props } = this.props;
    return (
      <View style={{ width, height }}>
        <Canvas
          className={`ec-chart ${canvasId}`}
          id={canvasId}
          canvasId={canvasId}
          onTouchStart={this.handleStart}
          onTouchMove={this.handleMove}
          onTouchEnd={this.handleEnd}
          {...props}
        />
      </View>
    );
  }
}
