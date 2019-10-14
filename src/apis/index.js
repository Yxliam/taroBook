import helper from "../utils/helper";
const baseUrl = "api";
const Api = {
  bookClassify(res) {
    return `${baseUrl}/cats/lv2/statistics`;
  },
  classifyByList(query) {
    return `${baseUrl}/book/by-categories?${query}`;
  },
  gookInfo(id) {
    return `${baseUrl}/book/${id}`;
  }
};

export async function getList() {
  // return Taro.request(helper.postParams(`http://ah.yxlblog.com/api/homeList`));
  return helper.ajax(helper.postParams(`http://ah.yxlblog.com/api/homeList`));
}

//获取子分类
export function getClassifyList() {
  return helper.ajax(helper.getParams(`${Api.bookClassify()}`));
}

//获取子分类详情
export function getclassifyByList(query) {
  return helper.ajax(helper.getParams(`${Api.classifyByList(query)}`));
}

//获取书籍详情
export function getBookInfo(id) {
  return helper.ajax(helper.getParams(`${Api.gookInfo(id)}`));
}
