// pages/good_details/good_details.js
var Crypto = require('../../utils/cryptojs/cryptojs.js').Crypto
var login = require('../../utils/login.js');
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
      that.show_login()
    }
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload')
    console.log(options)
    console.log(options.info)
    if (options.data){
      var data = JSON.parse(options.data)
      console.log(data)
      app.globalData.good_detail_product_id = data.product_id
    }
    //app.globalData.good_detail_product_id = options.product_id
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
    console.log(res)
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
  onShareAppMessage: function (res) {
      console.log(res)
      var product_id = app.globalData.good_detail_product_id
      var data = { style: 'share', product_id: product_id}
      return {
        title: '商品详情',
        path: '/pages/good_details/good_details?data=' + JSON.stringify(data),
        success: function (res) {
          // 转发成功
          console.log(res)
          login.share_succ()
        },
        fail: function (res) {
          // 转发失败
        }
      }
  },
  show_login: function () {
    wx.showModal({
      title: '请登录',
      // content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          var that = this;
          wx.openSetting({
            success: function (res) {
              console.log(res)
              console.log(res.authSetting["scope.userInfo"])
              if (res.authSetting["scope.userInfo"]) {
                wx.getUserInfo({
                  success: function (res) {
                    console.log('用户允许获取信息')
                    console.log(res)
                    app.globalData.allow_login_flag = true;
                    app.globalData.userInfo = res.userInfo
                    login.Login()
                  },
                  fail: function () {
                    app.globalData.allow_login_flag = false;
                    console.log('用户不允许获取信息')
                  }

                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})