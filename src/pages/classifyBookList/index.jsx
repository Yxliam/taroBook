import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { getclassifyByList } from "../../apis";
import helper from "../../utils/helper";
import Skeleton from "taro-skeleton";
// import ListView, { LazyBlock } from "taro-listview";
import "./index.scss";
import defaultImg from "../../assets/img/1.jpg";

export default class Classify extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    navigationBarTitleText: "书籍分类列表"
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: false,
      hasMore: true,
      isEmpty: false,
      total: 0,
      params: {},
      bookList: []
    };
  }
  componentDidMount() {
    const params = this.$router.params,
      page = params.start;
    const querParams = {
      gender: params.gender,
      type: "hot",
      major: params.major,
      start: page
    };

    this.setState(
      {
        params: querParams
      },
      () => {
        this.getClassList();
      }
    );
  }

  async getClassList() {
    const { params, bookList } = this.state;
    let query = `gender=${params.gender}&type=hot&major=${params.major}&start=${params.start}&limit=50`;
    const { books, total, ok } = await getclassifyByList(query);
    if (ok) {
      books.forEach(list => {
        list.cover = helper.staticPath + list.cover;
        bookList.push(list);
      });

      this.setState({
        total: total,
        bookList: bookList
      });
    }
  }

  //加载更多
  scroppDownHandle = () => {
    const { params } = this.state;
    params.start = Number(params.start) + 50;
    this.setState(
      {
        params
      },
      () => {
        this.getClassList();
      }
    );
  };
  scropUpHandle() {
    //刷新
  }

  goBookInfoHandle = item => {
    Taro.navigateTo({
      url: `/pages/bookInfo/index?id=${item._id}`
    });
  };

  render() {
    const { bookList, isLoaded, error, hasMore, isEmpty } = this.state;
    return (
      <View>
        <ScrollView
          style={{ height: "100vh" }}
          scrollY
          scrollWithAnimation
          onScrollToLower={this.scroppDownHandle}
          onScrollToUpper={this.scropUpHandle}
        >
          <View className="classify-list">
            {bookList.map((item, key) => {
              return (
                <View
                  className="classify-item"
                  onClick={() => this.goBookInfoHandle(item)}
                >
                  <View className="cover-img-box">
                    <Image className="cover-img" src={item.cover} />
                  </View>
                  <View className="class-right-cont">
                    <View>
                      <Text>{item.latelyFollower}人在追</Text>
                    </View>
                    <View className="book-name">{item.title}</View>
                    <View>
                        作者：<Text>{item.author}</Text>
                       类型:<Text>{item.majorCate}</Text>
                    </View>
                    <View className="book-desc">{item.shortIntro}</View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
