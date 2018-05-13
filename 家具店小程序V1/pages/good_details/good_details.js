// pages/good_details/good_details.js
var login = require('../../utils/login.js');
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_info:'',
    good_price:'',
    bottom_info_flag:false,
    good_info_flag:false,
    detail_info_flag:true,
    recommand_flag:false,
    preferential_info_flag:false,
    format_flag:false,
    collect_flag:false,
    format_flag:true,
    select_format_name:'',
    formats: [],
    benefit_show_falg:true,
    benefit:[1,1,1],
    is_have_benefit:false
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
          url: 'https://furniture.jxggdxw.com/api/v1/collect_product/',
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
          url: 'https://furniture.jxggdxw.com/api/v1/cancle_collect_product/',
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
  benefit:function(){
    var that=this
    var benefit_show_falg = !that.data.benefit_show_falg
    console.log(benefit_show_falg)
    that.setData({
      benefit_show_falg: benefit_show_falg
    })
  },
  format_select:function(res){
    var that=this
    var formats=that.data.formats
    var id = res.currentTarget.id
    for(var i=0;i<formats.length;i++){
      if(i==id){
        formats[i].checked=true
      }else{
        formats[i].checked = false
        }
    }
    that.setData({
      formats: formats,
      good_price: formats[id].price,
      select_format_name: formats[id].format_name
    })
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
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
      url: 'https://furniture.jxggdxw.com/api/v1/get_product_detailed_info/',
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
          var formates=[]
          var benefits=[]
          var is_have_benefit=false
          good_info.top_images=res.data.top_images
          good_info.detail_images=[]
          good_info.product_name=decodeURI(res.data.name)
          var product_price = decodeURI(res.data.price)
          good_info.brand_name = decodeURI(res.data.brand_name)
          good_info.product_size = decodeURI(res.data.size)
          good_info.product_color = decodeURI(res.data.color)
          good_info.collect = res.data.collect
          good_info.install = res.data.install
          good_info.warranty = res.data.warranty
          good_info.order = res.data.order
          is_have_benefit = res.data.benefit_flag
          if(res.data.benefit_flag){
            for (var i = 0; i < res.data.benefits.length; i++) {
                var benefit={}
                benefit.benefit_style = decodeURI(res.data.benefits[i].benefit_style)
                benefit.benefit_text = decodeURI(res.data.benefits[i].benefit_text)
                benefits.push(benefit)
            }
          }
          
          for (var i = 0; i < res.data.detail_images.length;i++){
               var pic_detail={}
               pic_detail.url = res.data.detail_images[i].url
               var height = res.data.detail_images[i].size.height * 720 / res.data.detail_images[i].size.width
               pic_detail.style1 = 'height:' + height + 'rpx'
               good_info.detail_images.push(pic_detail)
          }
          for (var i = 0; i < res.data.formates.length;i++){
              var formate={}
              formate.format_name = decodeURI(res.data.formates[i].formate_name)
              formate.price = decodeURI(res.data.formates[i].formate_price)
              if(i==0){
                formate.checked = true
              }else{
                formate.checked = false
              }
              formates.push(formate)
          }
         console.log(good_info)
         that.setData({
           good_info: good_info,
           good_price: product_price,
           formats: formates,
           select_format_name: formates[0].format_name,
           benefit: benefits,
           is_have_benefit: is_have_benefit
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
      var that=this
      var good_info = that.data.good_info
      var product_id = app.globalData.good_detail_product_id
      var data = { style: 'share', product_id: product_id}
      return {
        title: good_info.product_name,
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