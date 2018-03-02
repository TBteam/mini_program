// pages/first/first.js
var login = require('../../utils/login.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:10,
    count_fown_flag:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //console.log('sss')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //this.countdown();
    //login.login_first();
    //console.log('sss')
  },
  enter_main:function(){
    this.setData({
      count_fown_flag: true
    })
    wx.redirectTo({
      url: '../main/main',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  enter_brand:function(){
    this.setData({
      count_fown_flag: true
    })
    app.globalData.enter_brand_flag=true;
    //cate_info_test
    wx.redirectTo({
      url: '../main/main',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      count_fown_flag: false
    })
    this.countdown();
    //console.log('sss')
  },
  countdown:function(){
    var that=this;
    var count=that.data.count;
    var count_fown_flag = that.data.count_fown_flag
    //console.log(count_fown_flag)
    count--;
    setTimeout(function () {
      if ((count > 0) && (!count_fown_flag)){
        that.setData({
          count: count
        })
        that.countdown();
      } else if (count==0){
        wx.redirectTo({
          url: '../main/main',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      } else if (count_fown_flag){
        return;
      }
    }, 1000);
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