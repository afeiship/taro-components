# taro-data-list
> Taro data list.

## installation
```shell
npm i @jswork/taro-data-list
```

## usage
```jsx
import TaroDataList from '@jswork/taro-data-list';

<TaroDataList
  scrollY
  refresherEnabled
  api={this.apiService}
  size={20}
  dataGetter={(e) => e.data}
  hasMore={(e) => {
    console.log("e", e, e.data.length <= 10);
    return e.data.length === 20;
  }}
  onChange={(e) => {
    const { items } = e.target.value;
    this.setState({ dataSource: items });
  }}
  template={(action, args) => {
    if (action === "ITEM") {
      const { item, index } = args;
      return (
        <View className="template-item">
          <Text>{item.id}</Text>
          <Checkbox checked={item.complete} />
          <Text>Hello {item.title}</Text>
        </View>
      );
    }

    if (action === "LOAD_MORE") {
      return <View className="template-init">上滑加载更多...</View>;
    }

    if (action === "INIT") {
      return <View className="template-init">数据加载中...</View>;
    }

    if (action === "NO_MORE") {
      return (
        <View className="template-no-more">没有可以加载的数据啦</View>
      );
    }
  }}
/>
```
