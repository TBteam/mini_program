var app=getApp()
function login_first(){
  wx.getUserInfo({
    success: function (res) {
      console.log('用户允许获取信息')
      console.log(res)
      app.globalData.allow_login_flag=true;
      app.globalData.userInfo = res.userInfo
      wx.checkSession({
        success: function () {
          login_upload_session()
        },
        fail: function () {
          login_upload_code()
        }
})
    },
    fail:function(){
      app.globalData.allow_login_flag = false;
      console.log('用户不允许获取信息')
    }
    
  })
}
function login_upload_code(){
  var that=this
  wx.login({
    success: function (res) {
      console.log(res)
      if (res.code) {
        //console.log(res.code)
        var code = res.code
        console.log(code)
        wx.request({
          url: 'https://32906079.jxggdxw.com/shop/weichat_login.do',  //需要修改的地方
          data: {
            code: code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded,charset=UTF-8' // 默认值
          },
          success: function (res) {
            console.log(res)
            console.log('上传code成功')
            //console.log(res.header["Set-Cookie"])
            var session = res.data.detail_info.thd_sessionkey
            var cookie = 'JSESSIONID=' + res.data.detail_info.cookie
            //console.log(session)
           // console.log(cookie)
            try {
              wx.setStorageSync('cookie', cookie)
            } catch (e) {
            }
            try {
              wx.setStorageSync('session', session)
            } catch (e) {
            }
          },
          complete: function () {

          },
          fail: function (res) {

          }
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }

  });
}
function login_upload_session() {
  var session;
  var that=this
  try {
    var value = wx.getStorageSync('session')
    if (value) {
      //console.log(value)
      console.log('从本地获取session成功')
      session = value;
    }
    else {
      console.log('获取错误')
    }
  } catch (e) {
    //console.log('获取错误')
  }
  var cookie;
  try {
    var value = wx.getStorageSync('cookie')
    if (value) {
      //console.log(value)
      console.log('从本地获取cookie成功')
      cookie = value;
    }
    else {
      console.log('获取错误')
    }
  } catch (e) {
    //console.log('获取错误')
  }
  //console.log(session)
  //console.log(cookie)
  wx.request({
    url: 'https://32906079.jxggdxw.com/shop/check_session.do',  //需要修改的地方
    data: {
      sessionkey: session
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded,charset=UTF-8', // 默认值
      'cookie': cookie
    },
    success: function (res) {
      console.log(res)
      if(res.data.code==0){
        console.log('上传session登录成功')
      } if (res.data.code == 1) {
        console.log('上传session登录失败')
        login_upload_code()
      }
    },
    complete: function () {
    },
    fail: function (res) {
    }
  })
}

module.exports.login_first = login_first
module.exports.login_upload_code = login_upload_code
module.exports.login_upload_session = login_upload_session
