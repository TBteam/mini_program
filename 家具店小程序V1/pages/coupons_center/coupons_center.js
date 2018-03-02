// pages/coupons_center/coupons_center.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tickets:[
       {select: false, image1: '../photo/1000_unselect.jpg', image2: '../photo/1000_select.jpg'},
       {select: false, image1: '../photo/500_unselect.jpg', image2: '../photo/500_select.jpg'},
       { select: false, image1: '../photo/1000_unselect.jpg', image2: '../photo/1000_select.jpg' },
       { select: false, image1: '../photo/500_unselect.jpg', image2: '../photo/500_select.jpg' },
       { select: false, image1: '../photo/1000_unselect.jpg', image2: '../photo/1000_select.jpg' },
       { select: false, image1: '../photo/500_unselect.jpg', image2: '../photo/500_select.jpg' }
     ],
     tickets1: [
       {  image2: '../photo/1000_select.jpg' },
       {  image2: '../photo/500_select.jpg' },
     ],
     flag:false
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
    var flag = app.globalData.coubons_flag
    if (!flag){
      wx.setNavigationBarTitle({
        title: '领券中心'
      })
    }
    if (flag) {
      wx.setNavigationBarTitle({
        title: '我的优惠券'
      })
    }
    this.setData({
      flag: flag
    })
  },
  coupons:function(res){
    console.log(res)
    var tickets = this.data.tickets;
    tickets[res.currentTarget.id].select=true;
    this.setData({
      tickets: tickets
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