import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { getClassifyList } from "../../apis";
import { AtTag, AtDivider } from "taro-ui";
import Skeleton from "taro-skeleton";
import "./index.scss";
import defaultImg from "../../assets/img/1.jpg";

export default class Classify extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: "分类"
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      scrollTop: 0,
      currentTab: 0, //用作跳转后右侧视图回到顶部
      screenArray: [], //左侧导航栏内容
      childrenArray: []
    };
  }

  componentDidMount() {
    this.getClassify();
  }

  // 获取分类
  async getClassify() {
    const { male, female, picture, press, ok } = await getClassifyList();
    const major = [...male, ...female, ...picture, ...press];
    const chiArr = male[0] && male[0].mins ? male[0].mins : [];
    this.setState({
      screenArray: major,
      childrenArray: chiArr,
      loading: false
    });
  }

  navHandle = (item, key) => e => {
    this.setState({
      currentTab: key,
      scrollTop: 0,
      childrenArray: item.mins
    });
  };

  render() {
    const {
      scrollTop,
      currentTab,
      screenArray,
      childrenArray,
      loading
    } = this.state;
    return (
      <View className="classify">
        {/* 分类导航栏 */}
        <ScrollView className="left-navbar" scrollY={true}>
          <Skeleton title row={3} loading={loading}>
            {screenArray &&
              screenArray.map((item, key) => {
                return (
                  <View
                    onClick={this.navHandle(item, key)}
                    className={`nav-text${currentTab === key ? " active" : ""}`}
                  >
                    {item.major}
                  </View>
                );
              })}
          </Skeleton>
        </ScrollView>
        <ScrollView
          className="right-content"
          scrollY={true}
          scrollTop={scrollTop}
        >
          <Skeleton title row={3} loading={loading}>
            <View className="title">小说分类：</View>
            <View className="good-list">
              {childrenArray.length ? (
                childrenArray.map((item, key) => {
                  return (
                    <View className="good-item">
                      <View className="good-right-cont">
                        <View className="good-title">
                          <AtTag circle>{item}</AtTag>
                        </View>
                      </View>
                    </View>
                  );
                })
              ) : (
                <AtDivider content="没有数据" />
              )}
            </View>
          </Skeleton>
        </ScrollView>
      </View>
    );
  }
}
