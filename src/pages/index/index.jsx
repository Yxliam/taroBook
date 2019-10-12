import Taro, { Component } from "@tarojs/taro";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { AtButton, AtSearchBar, AtToast } from "taro-ui";
import "./index.scss";
import Skeleton from "taro-skeleton";
// import { getList } from "../../apis";

import defaultImg from "../../assets/img/1.jpg";

@inject("commonStore")
@observer
export default class Index extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: "首页"
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchText: "",
      dataSource: [
        {
          image: defaultImg,
          value: "围城"
        },
        {
          image: defaultImg,
          value: "围城"
        },
        {
          image: defaultImg,
          value: "围城"
        },
        {
          image: defaultImg,
          value: "围城"
        }
      ]
    };
  }

  componentWillMount() {}

  componentDidMount() {
    Taro.showLoading({
      title: "加载中..."
    }).then(res => {
      //获取banner
      // this.getData();
      setTimeout(() => {
        this.setState({
          loading: false
        });
        Taro.hideLoading();
      }, 2000);
    });
  }

  async getData() {
    const res = await getList();
    console.log("结果sdsdsd");
    console.log(res);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onSearchChange() {}

  render() {
    const { searchText, dataSource, loading } = this.state;

    return (
      <View className="index">
        <AtSearchBar
          value={searchText}
          onChange={this.onSearchChange.bind(this)}
        />
        <Swiper circular className="swipter-box" indicatorDots autoplay>
          <SwiperItem className="swiper-item">
            <Image src={defaultImg} />
          </SwiperItem>
          <SwiperItem className="swiper-item">
            <Image src={defaultImg} />
          </SwiperItem>
        </Swiper>
        <View className="hot-recomment">热门推荐 </View>
        <View className="recomment-content">
          {dataSource.map((item, key) => {
            return (
              <Skeleton title row={3} loading={loading}>
                <View className="recomment-item">
                  <Image className="recomment-img" src={item.image} />
                  <View className="recomment-text">{item.value}</View>
                </View>
              </Skeleton>
            );
          })}
        </View>
      </View>
    );
  }
}
