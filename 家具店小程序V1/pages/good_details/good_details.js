// pages/good_details/good_details.js
var Crypto = require('../../utils/cryptojs/cryptojs.js').Crypto
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_info:'',
    bottom_info_flag:false,
    good_info_flag:false,
    detail_info_flag:true,
    recommand_flag:false,
    preferential_info_flag:false,
    format_flag:false,
    collect_flag:false,
    imgUrls: [
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG1.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG2.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG3.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG4.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG5.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG6.jpg'
    ],
    imgUrls1: [
      '../photo/NORYA2.jpg',
      '../photo/NORYA2.jpg',
      '../photo/NORYA2.jpg',
      '../photo/NORYA2.jpg',
      '../photo/NORYA2.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG8.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG9.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG10.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG11.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG12.jpg'
    ],
    price:'28-98',
    formats:[{ format: '规格规格1', price: '28', checked: false },
             { format: '规格规格2', price: '38', checked: false },
             { format: '规格规格3', price: '48', checked: false },
             { format: '规格规格4', price: '58', checked: false },
             { format: '规格规格5', price: '68', checked: false },
             { format: '规格规格6', price: '78', checked: false },
             { format: '规格规格7', price: '88', checked: false },
             { format: '规格规格8', price: '98', checked: false },
    ],
    goods: [
      {
        name: 'ddddddddddddd', old_price: 78, new_price: 58,
        url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG1.jpg'
      },
      {
        name: 'ddddddddddddd', old_price: 78, new_price: 58,
        url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG2.jpg'
      },
      {
        name: 'ddddddddddddd', old_price: 78, new_price: 58,
        url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG3.jpg'
      },
      {
        name: 'ddddddddddddd', old_price: 78, new_price: 58,
        url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG4.jpg'
      },
      {
        name: 'ddddddddddddd', old_price: 78, new_price: 58,
        url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG5.jpg'
      },
      {
        name: 'ddddddddddddd', old_price: 78, new_price: 58,
        url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG6.jpg'
      },
      {
        name: 'ddddddddddddd', old_price: 78, new_price: 58,
        url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG7.jpg'
      },
      {
        name: 'ddddddddddddd', old_price: 78, new_price: 58,
        url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG8.jpg'
      },
      {
        name: 'ddddddddddddd', old_price: 78, new_price: 58,
        url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG9.jpg'
      },
      {
        name: 'ddddddddddddd', old_price: 78, new_price: 58,
        url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG10.jpg'
      },
    ],
    text: "￥GU0z04gtxuO￥"
  },
  collect:function(){
    var that = this
    var good_info = that.data.good_info;
    var product_id = app.globalData.good_detail_product_id
    var allow_login_flag = app.globalData.allow_login_flag
    if (allow_login_flag){
      var user_id = app.globalData.user_id
      if (!good_info.collect){
        wx.request({
          url: 'https://32906079.jxggdxw.com/api/v1/collect_product/',
          method: 'GET',
          data: {
            'product_id': product_id,
            "user_id": user_id,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            if(res.data.ret=='succ'){
              good_info.collect=true
              that.setData({
                good_info: good_info
              })
            }
          }
        })
      }else{
        wx.request({
          url: 'https://32906079.jxggdxw.com/api/v1/cancle_collect_product/',
          method: 'GET',
          data: {
            'product_id': product_id,
            "user_id": user_id,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            if (res.data.ret == 'succ') {
              good_info.collect = false
              that.setData({
                good_info: good_info
              })
            }
          }
        })
      }
    }else{
      wx.showToast({
        title: '请登陆',
        icon: 'none',
        duration: 1500
      })
    }
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
    var product_id = app.globalData.good_detail_product_id
    var allow_login_flag = app.globalData.allow_login_flag
    if (product_id == 0) {
      wx.redirectTo({
        url: '../home_page/home_page',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    console.log(product_id)
    console.log(allow_login_flag)
    if (allow_login_flag){
      var user_id = app.globalData.user_id
    }else{
      user_id='none'
    }
    var that = this;
    wx.request({
      url: 'https://32906079.jxggdxw.com/api/v1/get_product_detailed_info/',
      method: 'GET',
      data: {
        'product_id': product_id,
        'user_id': user_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.detail_images)
        if(res.data.ret=='succ'){
          var good_info={}
          good_info.top_images=res.data.top_images
          good_info.detail_images=res.data.detail_images
          good_info.product_name=decodeURI(res.data.name)
          good_info.product_price = decodeURI(res.data.price)
          good_info.brand_name = decodeURI(res.data.brand_name)
          good_info.product_size = decodeURI(res.data.size)
          good_info.product_color = decodeURI(res.data.color)
          good_info.collect = res.data.collect
          good_info.install = res.data.install
          good_info.warranty = res.data.warranty
         console.log(good_info)
         that.setData({
           good_info: good_info
         })
        }else if(res.data.ret=='fail'){
          wx.navigateBack({
            delta: 1
          })
        }
      }

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