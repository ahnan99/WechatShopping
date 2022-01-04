export default {
    pages: [
        "pages/goods/goods",
        "pages/cart/cart",
        "pages/goods/details",
        "pages/order/preOrder",
        "pages/order/order",
        "pages/order/receiverDetail",
        "pages/order/orderList",
        "pages/account/myAccount",
        "pages/order/payment",
        "pages/account/myPointList",
        "pages/account/myPoint",
        "pages/account/myProfile",
        "pages/account/myReferee"],
    window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fff",
        navigationBarTitleText: "轻松购",
        navigationBarTextStyle: "black",
    },
    plugins: {
        kdPlugin: {
            version: "1.1.2",
            provider: "wx6885acbedba59c14"
        }
    },
    tabBar: {
        list: [
            {
                pagePath: "pages/goods/goods",
                iconPath: "./image/shopping-bag.png",
                selectedIconPath: "./image/shopping-bag-a.png",
                text: "首页",
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
