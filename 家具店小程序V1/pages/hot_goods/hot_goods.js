// pages/hot_goods/hot_goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [
      { name: 'ddddddddddddd', old_price: 78, new_price: 58 },
      { name: 'ddddddddddddd', old_price: 78, new_price: 58 },
      { name: 'ddddddddddddd', old_price: 78, new_price: 58 },
      { name: 'ddddddddddddd', old_price: 78, new_price: 58 },
      { name: 'ddddddddddddd', old_price: 78, new_price: 58 },
      { name: 'ddddddddddddd', old_price: 78, new_price: 58 },
      { name: 'ddddddddddddd', old_price: 78, new_price: 58 },
      { name: 'ddddddddddddd', old_price: 78, new_price: 58 },
      { name: 'ddddddddddddd', old_price: 78, new_price: 58 },
      { name: 'ddddddddddddd', old_price: 78, new_price: 58 },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  }, bindtap: function () {
    wx.navigateTo({
      url: '../good_details/good_details',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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