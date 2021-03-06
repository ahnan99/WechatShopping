import Taro from '@tarojs/taro'
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { actions as UserActions } from "../../modules/user";

function saveAuthToken (authorize) {
    //写入状态管理
    this.props.actions.updateUserLogin(authorize)
    //写入缓存
    Taro.setStorageSync('authorize',authorize)
  }
  
  async function getAuthToken(){
    const state = Taro.$store.getState();
    //login
    let res = await Taro.login();
    //获取token
    let response = await Taro.request({
            url : `${state.app.baseURL}api/xxx/xxx` ,
            data : {
                code : res.code 
            } ,
            method : 'POST'
    })
    //判断是否成功
    if( response.data.data && response.data.data.authorize ){
        //写入token
        let authorize = response.data.data.authorize;
        saveAuthToken(authorize);
        return true;
    }else{
        console.log('获取token失败');
        return false;
    }
  }

  class Auth {
    static appCheckAuth(){

        return new Promise(function (resolve) {
            const state = Taro.$store.getState();
            //如果有授权信息
            if( this.checkAuth() && !state.app.appOnLaunch ){
                //直接返回
                resolve(true);
            }else{
                //判断session_key是否过期
                Taro.checkSession().then(async ()=>{
                    //未过期检查token是否有效
                    if( !this.checkAuth() ){
                        //判断是否 token 请求成功
                        let flag = await getAuthToken();
                        if( flag ) {
                            //更新app状态
                            this.props.actions.changeAppOnLaunch();
                            resolve(true);
                        }else{
                          //提示
                            Taro.showToast({
                            title : '获取授权信息失败' ,
                            icon : 'none' ,
                            mask : true
                            })
                        }
                    }else{
                        //更新app状态
                        this.props.actions.changeAppOnLaunch();
                        //token 没有过期，直接返回
                        resolve(true);
                    }
                }).catch(async (err)=> {
                    console.log(err);
                    let flag = await getAuthToken();
                    //判断是否 token 请求成功
                    if( flag ) {
                        //更新app状态
                        this.props.actions.changeAppOnLaunch();
                        resolve(true);
                    }else{
                        //提示
                        Taro.showToast({
                            title : '获取授权信息失败' ,
                            icon : 'none' ,
                            mask : true
                        })
                    }
                })
            }
        })
    }
      
          // 检查令牌是否有效 true--> 有效  false--> 无效
          static checkAuth(){
            const state = Taro.$store.getState();
            //从缓存读取授权信息
            let authorize = state.authorize || Taro.getStorageSync('authorize') || {},
                expiryTime = 0,
                nowTime = ~~(Date.now() / 1000);
        
            if (authorize.exp) {
                expiryTime = authorize.exp;
            }
        
            return expiryTime - nowTime > 300;
        }
    
  }


  const mapStateToProps = (state) => ({
    user: state.user,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(UserActions, dispatch),
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Auth);