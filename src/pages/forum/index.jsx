import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { AtFab } from "taro-ui";
import Skeleton from "taro-skeleton";
import "./index.scss";
import faceImg from "../../assets/img/face.png";
import likeImg from "../../assets/img/icon/like.png";
import likeActiveImg from "../../assets/img/icon/like-active.png";
import collectImg from "../../assets/img/icon/collect.png";
import collectActiveImg from "../../assets/img/icon/collect-active.png";
import commentImg from "../../assets/img/icon/comment.png";

export default class Forum extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: "论坛"
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      thinkList: [
        {
          image: faceImg,
          auther: "作者",
          title: "这是想法"
        },
        {
          image: faceImg,
          auther: "作者",
          title: "这是想法"
        },
        {
          image: faceImg,
          auther: "作者",
          title: "这是想法"
        },
        {
          image: faceImg,
          auther: "作者",
          title: "这是想法"
        },
        {
          image: faceImg,
          auther: "作者",
          title: "这是想法"
        },
        {
          image: faceImg,
          auther: "作者",
          title: "这是想法"
        },
        {
          image: faceImg,
          auther: "作者",
          title: "这是想法"
        }
      ]
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  scroppDownHandle = () => {
    console.log("底部");
  };
  scropUpHandle = () => {
    console.log("顶部");
  };

  render() {
    const { thinkList, loading } = this.state;
    return (
      <View className="tink-box">
        {/* <View className="my-title">想法</View> */}
        <View className="think-bottom-box">
          <AtFab>
            <Text className="at-fab__icon at-icon at-icon-add"></Text>
          </AtFab>
        </View>
        {/* 列表 */}
        <ScrollView
          style={{ height: "100vh" }}
          scrollY
          scrollWithAnimation
          onScrollToLower={this.scroppDownHandle}
          onScrollToUpper={this.scropUpHandle}
        >
          <View className="think-list">
            {thinkList.map((item, key) => {
              return (
                <Skeleton title avatar row={3} loading={loading}>
                  <View className="think-item at-row">
                    <View className="face-img">
                      <Image
                        className="img"
                        mode="aspectFill"
                        src={item.image}
                      />
                    </View>
                    <View className="think-content-right">
                      <View className="auther">{item.auther}</View>
                      <View className="desc">{item.title}</View>
                      <View className="time">5小时前</View>
                      <View>
                        <View className="opration at-row at-row__justify--between">
                          <View className="icon-aspe">
                            <View className="img-icon">
                              <Image
                                className="icon"
                                mode="aspectFill"
                                src={likeImg}
                              />
                            </View>
                            <Text className="aspe-text">66</Text>
                          </View>
                          <View className="icon-aspe">
                            <View className="img-icon">
                              <Image
                                className="icon"
                                mode="aspectFill"
                                src={collectImg}
                              />
                            </View>
                            <Text className="aspe-text">66</Text>
                          </View>
                          <View className="img-icon">
                            <Image
                              className="icon"
                              mode="aspectFill"
                              src={commentImg}
                            />
                          </View>
                        </View>
                      </View>
                      <View className="comment-box">评论:111</View>
                    </View>
                  </View>
                </Skeleton>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
