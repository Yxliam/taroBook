import helper from "../utils/helper";
const baseUrl = "https://novel.juhe.im";
const Api = {
  bookClassify: `${baseUrl}/sub-categories`
};

export async function getList() {
  // return Taro.request(helper.postParams(`http://ah.yxlblog.com/api/homeList`));
  return helper.ajax(helper.postParams(`http://ah.yxlblog.com/api/homeList`));
}

export function getClassifyList() {
  return helper.ajax(helper.getParams(`${Api.bookClassify}`));
}
