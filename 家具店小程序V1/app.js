//app.js
App({
  data:{
  },
  onLaunch: function () {
    //var login = require('../../utils/login.js');
    //this.login_upload_session();
    //this.login_first();
  },
  getUserInfo:function(cb){
  },
  globalData:{
    userInfo:null,
    login_OK:false,
    allow_login_flag:false,
    enter_brand_flag:false,
    coubons_flag:false,
    brand_detail_brand_id:0,
    user_id:0,
    all_area:[],
    all_price:[],
    all_style:[],
    all_house_style:[],
    case_detail_case_id:0,
    good_detail_product_id:0,
    case_detail_is_show_brand_info:false
    },

  /************以下为自定义的登录函数***************/  
  login_first:function(){
    var that=this;
    wx.getUserInfo({
      success: function (res) {
        console.log('用户允许获取信息')
        console.log(res)
        that.globalData.allow_login_flag = true;
        that.globalData.userInfo = res.userInfo
        wx.checkSession({
          success: function () {
            that.login_upload_session()
          },
          fail: function () {
            that.login_upload_code();
          }
        })
      },
      fail: function () {
        that.globalData.allow_login_flag = false;
        console.log('用户不允许获取信息')
      }
    })
  },
  login_upload_code:function(){
    var code
    var that=this
    wx.login({
      success: function (res) {
        console.log(res)
        code = res.code
        wx.request({
          url: 'https://32906079.jxggdxw.com/api/v1/webapp_login/',
          method: 'POST',
          data: {
            "code": code
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            var session = res.data.cookie
            that.globalData.user_id = res.data.user_id
            try {
              wx.setStorageSync('session', session)
            } catch (e) {
            }
          }
        })
      }
    })
  },
  login_upload_session:function() {
    var that=this
    try {
      var session = wx.getStorageSync('session')
      if (session) {
        wx.request({
          url: 'https://32906079.jxggdxw.com/api/v1/check_session/',
          method: 'POST',
          data: {
            "key": session
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            if(res.data.ret=='fail'){
              that.login_upload_code()
            } else if (res.data.ret == 'succ') {
              that.globalData.user_id=res.data.user_id
            }
          }
        })

      }
      else {
        console.log('获取错误')
        that.login_upload_code()
      }
    } catch (e) {
      console.log('获取错误')
    }
  }

})

