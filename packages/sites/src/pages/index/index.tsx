import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import TaroPicker from '@jswork/taro-picker';

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <TaroPicker />
      </View>
    )
  }
}
