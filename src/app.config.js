export default {
  pages: [
    'pages/index/index',
    'pages/cart/cart'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [{
      pagePath: "pages/index/index",
      iconPath: "./image/icon-home.png",
      selectedIconPath: "./image/icon-home-a.png",
      text: "首页"
    },{
      pagePath: "pages/cart/cart",
      iconPath: "./image/icon-home.png",
      selectedIconPath: "./image/icon-home-a.png",
      text: "购物车"
    }]
}
}