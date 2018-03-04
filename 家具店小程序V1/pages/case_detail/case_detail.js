// pages/case_detail/case_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect_flag:false,
    case1: [
      '../photo/NORYA1.jpg',
      '../photo/NORYA1.jpg',
      '../photo/NORYA1.jpg',
      '../photo/NORYA1.jpg',
      '../photo/NORYA1.jpg',
      '../photo/NORYA1.jpg',
      '../photo/NORYA1.jpg',
      '../photo/NORYA1.jpg',
      '../photo/NORYA1.jpg',
      '../photo/NORYA1.jpg'
    ],
  },
  desinger_info: function () {
    wx.navigateTo({
      url: '../desinger_info/desinger_info',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  collect: function () {
    var collect_flag = this.data.collect_flag;
    collect_flag = !collect_flag
    this.setData({
      collect_flag: collect_flag
    })
  },
  enter_brand:function(){
    wx.navigateTo({
      url: '../cate_info_test/cate_info_test',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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