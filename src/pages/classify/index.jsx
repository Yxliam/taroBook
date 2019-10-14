import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { getClassifyList } from "../../apis";
import helper from "../../utils/helper";
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
      resultData: null,
      screenArray: [
        {
          label: "男生",
          value: "male"
        },
        {
          label: "女生",
          value: "female"
        }
      ], //左侧导航栏内容
      childrenArray: []
    };
  }

  componentDidMount() {
    this.getClassify();
  }

  // 获取分类
  async getClassify() {
    const { male, female } = await getClassifyList();
    const chiArr = male.length ? male : [];
    const newResult = { male: male, female: female };
    this.setState({
      childrenArray: chiArr,
      loading: false,
      resultData: newResult
    });
  }

  navHandle = (item, key) => e => {
    const { resultData } = this.state;
    this.setState({
      currentTab: key,
      scrollTop: 0,
      childrenArray: resultData[item.value]
    });
  };
  //跳转
  goClassList = item => e => {
    const male = this.state.currentTab === 0 ? "male" : "female";
    Taro.navigateTo({
      url: `/pages/classifyBookList/index?gender=${male}&type=hot&major=${item.name}&start=0&limit=50`
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
                    {item.label}
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
            <View className="good-list">
              {childrenArray.length ? (
                childrenArray.map((item, key) => {
                  return (
                    <View
                      className="good-item"
                      onClick={this.goClassList(item)}
                    >
                      <Image
                        className="good-img"
                        src={`${helper.staticPath}${item.bookCover[1]}`}
                      />
                      <View className="good-right-cont">
                        <View className="good-title">{item.name}</View>
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
