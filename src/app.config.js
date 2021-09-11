export default {
  pages: ["pages/index/index", 
  "pages/cart/cart", 
  "pages/goods/goods", 
  "pages/goods/details", 
  "pages/order/preOrder", 
  "pages/order/receiverDetail",
  "pages/order/orderList",
  "pages/account/myAccount"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "./image/icon-home.png",
        selectedIconPath: "./image/icon-home-a.png",
        text: "首页",
      },
      {
        pagePath: "pages/goods/goods",
        iconPath: "./image/shopping-bag.png",
        selectedIconPath: "./image/shopping-bag-a.png",
        text: "全部商品",
      },
      {
        pagePath: "pages/cart/cart",
        iconPath: "./image/shopping-cart.png",
        selectedIconPath: "./image/shopping-cart-a.png",
        text: "购物车",
      },
      {
        pagePath: "pages/account/myAccount",
        iconPath: "./image/user.png",
        selectedIconPath: "./image/user-a.png",
        text: "我的",
      },
    ],
  },
};
