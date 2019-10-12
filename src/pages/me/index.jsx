import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, OpenData } from "@tarojs/components";
import { AtButton, AtIcon, AtList, AtTag, AtAvatar, AtListItem } from "taro-ui";
import "./index.scss";
import faceImg from "../../assets/img/face.png";

export default class Book extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: "我的"
  };
  render() {
    return (
      <View className="user-center">
        <View className="user-center-top">
          <View className="user-info gap">
            <View className="user-info-avatar">
              {process.env.TARO_ENV === "h5" ? (
                <Image mode="aspectFill" src={faceImg} />
              ) : (
                <OpenData type="userAvatarUrl" />
              )}
            </View>
            <View className="user-info-detail">
              <AtList className="gap" hasBorder={false}>
                {process.env.TARO_ENV === "h5" ? (
                  <Text className="user-name">名称</Text>
                ) : (
                  <OpenData type="userNickName" lang="zh_CN" class="setName" />
                )}
                <AtTag type="primary" circle style="margin-left:5px">
                  💗
                </AtTag>
              </AtList>
            </View>
          </View>
          <View className="user-center-list">
            <AtList className="gap" hasBorder={false}>
              <AtListItem title="我的账户" arrow="right" />
              <AtListItem title="书单" arrow="right" />
            </AtList>
            <AtList className="gap" hasBorder={false}>
              <AtListItem title="阅读时长排行榜" arrow="right" />
              <AtListItem title="关注" arrow="right" />
              <AtListItem title="我的收藏" arrow="right" />
            </AtList>
          </View>
        </View>
      </View>
    );
  }
}
