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
    user_wechat_info:''
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
    this.setData({
      allow_login_flag: app.globalData.allow_login_flag,
      user_wechat_info: app.globalData.userInfo
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