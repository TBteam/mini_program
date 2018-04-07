var app=getApp()
//  function login_first() {
//   var that = this;
//   wx.getUserInfo({
//     success: function (res) {
//       console.log('用户允许获取信息')
//       console.log(res)
//       app.globalData.allow_login_flag = true;
//       app.globalData.userInfo = res.userInfo
//       wx.checkSession({
//         success: function () {
//           app.login_upload_session()
//         },
//         fail: function () {
//           app.login_upload_code();
//         }
//       })
//     },
//     fail: function () {
//       app.globalData.allow_login_flag = false;
//       console.log('用户不允许获取信息')
//     }
//   })
// }
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


//module.exports.login_first = login_first
module.exports.login_upload_code = login_upload_code
module.exports.login_upload_session = login_upload_session
