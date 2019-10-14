import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtButton, AtActivityIndicator, AtTag } from "taro-ui";
import { getBookInfo } from "../../apis";
import helper from "../../utils/helper";
import "./index.scss";
import moment from "moment";
import defaultImg from "../../assets/img/1.jpg";

export default class BookInfo extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: "书籍信息"
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      bookInfo: null
    };
  }
  componentDidMount() {
    const id = this.$router.params.id;
    this.getBookInfoHandle(id);
  }
  async getBookInfoHandle(id) {
    const res = await getBookInfo(id);
    this.setState({
      bookInfo: res,
      loading: false
    });
    console.log(res);
    console.log("结果");
  }

  //加入收藏
  followAction = () => {};

  render() {
    const { loading, bookInfo } = this.state;

    return (
      <View>
        {loading ? (
          <AtActivityIndicator mode="center"></AtActivityIndicator>
        ) : (
          <View>
            <View className="book-info-content">
              <View className="book-info-cover">
                <Image
                  className="cover"
                  src={`${helper.staticPath}${bookInfo.cover}`}
                />
              </View>
              <View className="book-info-describle">
                <View className="book-info-title">{bookInfo.title}</View>
                <View className="p">作者：{bookInfo.author}</View>
                <View className="p">
                  字数：
                  {bookInfo.wordCount - 10000 > 0
                    ? parseInt(bookInfo.wordCount / 10000) + "万"
                    : bookInfo.wordCount}
                </View>
                <View className="p">
                  收藏人数：
                  {bookInfo.latelyFollower - 10000 > 0
                    ? parseInt(bookInfo.latelyFollower / 10000) + "万"
                    : bookInfo.latelyFollower}
                </View>
                <View className="p">
                  最后更新：{moment(bookInfo.updated).fromNow()}
                </View>
              </View>
            </View>
            <View className="btn-box">
              <AtButton size="small" className="btn" type="primary">
                开始阅读
              </AtButton>
              <AtButton
                size="small"
                className="btn"
                onClick={this.followAction}
              >
                加入收藏
              </AtButton>
            </View>
            <View className="info-longintro">
              <View>{bookInfo.longIntro}</View>
            </View>
            <View className="last-time">
              <View className="info-last-chapter">
                <View>
                  最后更新：
                  <Text className="last-update">{bookInfo.lastChapter}</Text>
                </View>
              </View>
              <View className="info-tags">
                {bookInfo.tags.map((tagItem, tabKey) => {
                  return (
                    <AtTag className="tag-item" active type="primary" circle>
                      {tagItem}
                    </AtTag>
                  );
                })}
              </View>
            </View>
            <View>
              <View className="recomment-title">相关推荐</View>
              <View>
                <View className="recomment-item">
                  <Image className="recomment-img" src={defaultImg} />
                  <View className="recomment-name">书名</View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}
