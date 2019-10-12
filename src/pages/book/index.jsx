import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtButton, AtIcon } from "taro-ui";
import "./index.scss";
import defaultImg from "../../assets/img/1.jpg";

export default class Book extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: "我的书架"
  };
  constructor(props) {
    super(props);
    this.state = {
      bookList: [
        {
          image: defaultImg,
          text: "这是书籍这是书籍这是书籍这是书籍"
        },
        {
          image: defaultImg,
          text: "这是书籍这是书籍这是书籍这是书籍"
        },
        {
          image: defaultImg,
          text: "这是书籍这是书籍这是书籍这是书籍"
        },
        {
          image: defaultImg,
          text: "这是书籍这是书籍这是书籍这是书籍"
        }
      ]
    };
  }
  render() {
    const { bookList } = this.state;
    return (
      <View className="book-box">
        {/* <View className="my-title">我的书架</View> */}
        <View className="signIn-box at-row at-row__justify--between">
          <View className="at-col at-col-9 read-time">阅读时长:12小时</View>
          <AtButton
            circle={true}
            type="primary"
            size="small"
            className="at-col-2"
          >
            签到
          </AtButton>
        </View>
        <View className="book-list">
          {bookList.map((item, key) => {
            return (
              <View key={key} className="book-item">
                <Image className="book-img" src={item.image} />
                <View className="book-text">{item.text}</View>
              </View>
            );
          })}
          <View className="book-item add-book">
            <View className="book-add-inner">
              <View className="at-icon at-icon-add book-add-icon"></View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
