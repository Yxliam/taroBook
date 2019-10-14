import Taro, { Component } from "@tarojs/taro";
import "@tarojs/async-await";
import Index from "./pages/index";
import { Provider } from "@tarojs/mobx";
import stores from "./stores/index";
import moment from "moment";
moment.locale("zh-cn");
// 这里修改了taro-ui 的主题颜色
import "./assets/css/custom-theme.scss";

import "./app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      "pages/index/index",
      "pages/classify/index",
      "pages/book/index",
      "pages/forum/index",
      "pages/me/index",
      "pages/classifyBookList/index",
      "pages/bookInfo/index"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      color: "#717172",
      selectedColor: "#353436",
      backgroundColor: "#FBFBFB",
      borderStyle: "white",
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "assets/img/icon/home.png",
          selectedIconPath: "assets/img/icon/home-active.png"
        },
        {
          pagePath: "pages/classify/index",
          text: "分类",
          iconPath: "assets/img/icon/classify.png",
          selectedIconPath: "assets/img/icon/classify-active.png"
        },
        {
          pagePath: "pages/book/index",
          text: "书架",
          iconPath: "assets/img/icon/book.png",
          selectedIconPath: "assets/img/icon/book-active.png"
        },
        {
          pagePath: "pages/forum/index",
          text: "论坛",
          iconPath: "assets/img/icon/forum.png",
          selectedIconPath: "assets/img/icon/forum-active.png"
        },
        {
          pagePath: "pages/me/index",
          text: "我的",
          iconPath: "assets/img/icon/me.png",
          selectedIconPath: "assets/img/icon/me-active.png"
        }
      ]
    }
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={stores}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
