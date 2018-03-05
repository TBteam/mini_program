// pages/my_collect/my_collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect_good_flag: true,
    collect_case_flag: false,
    collect_news_flag: false,
    item: ['1', '1', '1', '1', '1', '1', '1', '1', '1'],
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
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  top_select: function (res) {
    console.log(res)
    var that = this;
    if (res.currentTarget.id == '1') {
      wx.pageScrollTo({
        scrollTop: 0
      })
      that.setData({
        collect_good_flag: true,
        collect_case_flag: false,
        collect_news_flag: false,
      })
    }
    else if (res.currentTarget.id == '2') {
      wx.pageScrollTo({
        scrollTop: 0
      })
      that.setData({
        collect_good_flag: false,
        collect_case_flag: true,
        collect_news_flag: false,
      })
    }
    else if (res.currentTarget.id == '3') {
      wx.pageScrollTo({
        scrollTop: 0
      })
      that.setData({
        collect_good_flag: false,
        collect_case_flag: false,
        collect_news_flag: true,
      })
    }
  },
  bintap: function (res) {
    //console.log(res);
    var that = this;
    if (res.currentTarget.id == '1') {
      wx.navigateTo({
        url: '../cate_info_test/cate_info_test',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (res.currentTarget.id == '2') {
      wx.navigateTo({
        url: '../case_detail/case_detail',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
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