var app=getApp()
function Login() {
  var that = this;
  wx.getUserInfo({
    success: function (res) {
      console.log('用户允许获取信息')
      console.log(res)
      app.globalData.userInfo = res.userInfo
      console.log(app.globalData.userInfo )
      that.login_upload_code1();
    },
    fail: function () {
      app.globalData.allow_login_flag = false;
      console.log('用户不允许获取信息')
    }
  })
}
function login_upload_code() {
  var code
  var that = this
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
            app.globalData.user_id = res.data.user_id
            app.globalData.allow_login_flag = true;
            try {
              wx.setStorageSync('session', session)
            } catch (e) {
            }
          
        }
      })
    }
  })
}

function login_upload_code1() {
  var code
  var that = this
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
            console.log('login succ')
            var session = res.data.cookie
            app.globalData.user_id = res.data.user_id
            console.log(app.globalData.user_id)
            app.globalData.allow_login_flag = true;
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1500
            })
            try {
              wx.setStorageSync('session', session)
            } catch (e) {
            }
          
        }
      })
    }
  })
}

function login_upload_session() {
  var that = this
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
          if (res.data.ret == 'fail') {
            that.login_upload_code()
          } else if (res.data.ret == 'succ') {
            app.globalData.user_id = res.data.user_id
            app.globalData.allow_login_flag = true;
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
function share_succ(){
  var allow_login_flag = app.globalData.allow_login_flag
  if (allow_login_flag){
    var user_id = app.globalData.user_id
    wx.request({
      url: 'https://32906079.jxggdxw.com/api/v1/share_succ/',
      method: 'GET',
      data: {
        "user_id": user_id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
      }
    })
  }
}

module.exports.Login = Login
module.exports.login_upload_code = login_upload_code
module.exports.login_upload_code1 = login_upload_code1
module.exports.login_upload_session = login_upload_session
module.exports.share_succ = share_succ
