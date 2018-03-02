// pages/home_decoration_news_datails/home_decoration_news_datails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news_details: ['https://32906079.jxggdxw.com/WeappServer/D8/169/IMG11.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG12.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG13.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG14.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG15.jpg'],
    ollect_flag: false,
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
  collect: function () {
    var collect_flag = this.data.collect_flag;
    collect_flag = !collect_flag
    this.setData({
      collect_flag: collect_flag
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