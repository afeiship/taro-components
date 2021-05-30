import React, { Component } from 'react';
import { View, Canvas } from '@tarojs/components';
import noop from '@jswork/noop';
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import * as echarts from 'echarts';
import EcCanvas from './ec-canvas';
/**
 * @reference: https://developers.weixin.qq.com/miniprogram/dev/component/canvas.html#Canvas-2D-%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81
 */

export default class extends Component<any, any> {
  private chart;
  private $instance = getCurrentInstance();
  static defaultProps = {
    onChange: noop
  };

  public componentDidMount() {
    const { canvasId } = this.props;
    const ctx = Taro.createCanvasContext(canvasId, this);
    const canvas = new EcCanvas(ctx, canvasId);
    const canvasDpr = Taro.getSystemInfoSync().pixelRatio;
    echarts.setCanvasCreator(() => canvas);
    this.chart = echarts.init(canvas, null, {
      // width: inRes[0].width,
      // height: inRes[0].height,
      width: 375,
      height: 200,
      devicePixelRatio: canvasDpr
    });
    canvas.setChart(this.chart);
    console.log('init chart:', this.chart);
    setTimeout(() => {
      console.log('rnder. data');

      this.chart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }, 1000);
  }

  private onCanvasReady = (inRes) => {
    const { canvasId } = this.props;
    const ctx = Taro.createCanvasContext(canvasId, this);
    const canvas = new EcCanvas(ctx, canvasId);
    const canvasDpr = Taro.getSystemInfoSync().pixelRatio;
    echarts.setCanvasCreator(() => canvas);
    this.chart = echarts.init(canvas, null, {
      // width: inRes[0].width,
      // height: inRes[0].height,
      width: 375,
      height: 200,
      devicePixelRatio: canvasDpr
    });
    // canvas.setChart(this.chart);
    console.log('init chart:', this.chart);
    this.chart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  };

  public render() {
    const { onChange, canvasId, ...props } = this.props;

    console.log(props);

    return (
      <View style={{ width: 375, height: 200, border: '1px solid red', boxSizing: 'border-box' }}>
        <Canvas
          style={{ width: 375, height: 200, border: '2px solid green', boxSizing: 'border-box' }}
          type="2d"
          id={canvasId}
          canvasId={canvasId}
          {...props}
        />
      </View>
    );
  }
}
