// pages/my_integral/my_integral.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    use_rules: ['1、积分使用规则，积分使用规则，积分使用规则，积分使用规则，积分使用规则', 
      '2、积分使用规则，积分使用规则，积分使用规则，积分使用规则，积分使用规则', 
      '3、积分使用规则，积分使用规则，积分使用规则，积分使用规则，积分使用规则'
    ],
    get_rules: ['1、积分获取规则，积分获取规则，积分获取规则，积分获取规则，积分获取规则',
      '2、积分获取规则，积分获取规则，积分获取规则，积分获取规则，积分获取规则',
      '3、积分获取规则，积分获取规则，积分获取规则，积分获取规则，积分获取规则'
    ],
    user_wechat_info:'',
    my_integral:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    var user_id = app.globalData.user_id 
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
    wx.request({
      url: 'https://32906079.jxggdxw.com/api/v1/get_user_integrate/',
      method: 'GET',
      data: {
        "user_id": user_id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if(res.data.ret=='succ'){
          var my_integral = res.data.integrate
          that.setData({
            allow_login_flag: app.globalData.allow_login_flag,
            user_wechat_info: app.globalData.userInfo,
            my_integral: my_integral
          })
        } else if (res.data.ret == 'fail' && page == 0) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })  
  },
  integral_detail:function(){
    wx.navigateTo({
      url: '../integral_detail/integral_detail',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})