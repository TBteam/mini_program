// pages/main/main.js
var app=getApp();
var login = require('../../utils/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      main_select:true,
      case_select:false,
      about_us_select:false,
      cate_select: false,
      brand_select:false,
      allow_login_flag:false,
      news: ['https://32906079.jxggdxw.com/WeappServer/D8/43/IMG1.jpg', 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG2.jpg', 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG3.jpg', 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG4.jpg', 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG5.jpg', 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG6.jpg', 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG7.jpg', 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG8.jpg', 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG9.jpg', 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG10.jpg', 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG1.jpg'],
      brands:[{brand:'品牌1',select_flag:true},
              { brand: '品牌2', select_flag: false },
              { brand: '品牌3', select_flag: false }],
      imgUrls: [
        'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG1.jpg',
        'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG2.jpg',
        'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG3.jpg',
        'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG4.jpg',
        'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG5.jpg'
      ],
      case1: [
        'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG6.jpg',
        'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG7.jpg',
        'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG8.jpg',
        'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG9.jpg',
        'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG10.jpg',
        'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG11.jpg',
        'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG12.jpg',
        'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG13.jpg'
      ],
      imgUrls1: [
        '../photo/NORYA1.jpg',
        '../photo/NORYA1.jpg',
        '../photo/NORYA1.jpg',
      ],
      goods: [
        { name: 'ddddddddddddd', old_price: 78, new_price: 58,
          url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG1.jpg'},
        {
          name: 'ddddddddddddd', old_price: 78, new_price: 58,
          url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG2.jpg' },
        {
          name: 'ddddddddddddd', old_price: 78, new_price: 58,
          url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG3.jpg' },
        {
          name: 'ddddddddddddd', old_price: 78, new_price: 58,
          url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG4.jpg' },
        {
          name: 'ddddddddddddd', old_price: 78, new_price: 58,
          url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG5.jpg' },
        {
          name: 'ddddddddddddd', old_price: 78, new_price: 58,
          url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG6.jpg' },
        {
          name: 'ddddddddddddd', old_price: 78, new_price: 58,
          url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG7.jpg' },
        {
          name: 'ddddddddddddd', old_price: 78, new_price: 58,
          url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG8.jpg' },
        {
          name: 'ddddddddddddd', old_price: 78, new_price: 58,
          url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG9.jpg' },
        {
          name: 'ddddddddddddd', old_price: 78, new_price: 58,
          url: 'https://32906079.jxggdxw.com/WeappServer/D8/43/IMG10.jpg' },
      ],
      user_wechat_info:''
  },
  bottom_select:function(res){
    //console.log(res);
    var that=this;
    if (res.currentTarget.id=='1'){
      that.setData({
        main_select: true,
        case_select: false,
        about_us_select: false,
        cate_select: false,
      })
    } else if (res.currentTarget.id == '2') {
      that.setData({
        main_select: false,
        case_select: false,
        about_us_select: false,
        cate_select: true,
      })
    } else if (res.currentTarget.id == '3') {
      that.setData({
        main_select: false,
        case_select: true,
        about_us_select: false,
        cate_select: false,
      })
    } else if (res.currentTarget.id == '4') {
      that.setData({
        user_wechat_info: app.globalData.userInfo
      })
      that.setData({
        main_select: false,
        case_select: false,
        about_us_select: true,
        cate_select: false,
      })
    }
  },
  title_select:function(res){
    var that = this;
    if (res.currentTarget.id == '1') {
      wx.navigateTo({
        url: '../hot_goods/hot_goods',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (res.currentTarget.id == '2') {
      wx.navigateTo({
        url: '../new_goods/new_goods',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (res.currentTarget.id == '3') {
      wx.navigateTo({
        url: '../time_goods/time_goods',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (res.currentTarget.id == '4') {
      wx.navigateTo({
        url: '../all_goods/all_goods',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (res.currentTarget.id == '5') {
      wx.navigateTo({
        url: '../cate_info_test/cate_info_test',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (res.currentTarget.id == '6') {
      wx.navigateTo({
        url: '../my_integral/my_integral',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    else if (res.currentTarget.id == '7') {
      app.globalData.coubons_flag = false;
      wx.navigateTo({
        url: '../coupons_center/coupons_center',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }


  },
  left_select: function (res) {
    console.log(this.data.item1[res.currentTarget.id].value)
    console.log(res)
    var item1 = this.data.item1;
    for (var i = 0; i < item1.length; i++) {
      if (i == res.currentTarget.id) {
        item1[i].checked = true
      }
      else {
        item1[i].checked = false
      }
    }
    this.setData({
      item1: item1,
    })
  },
  bindtap: function () {
    wx.navigateTo({
      url: '../good_details/good_details',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  news_select: function () {
    wx.navigateTo({
      url: '../home_decoration_news_datails/home_decoration_news_datails',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  case_detail: function () {
    wx.navigateTo({
      url: '../case_detail/case_detail',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  show_map: function () {
    var show_map_flag = this.data.show_map_flag;
    show_map_flag = !show_map_flag;
    this.setData({
      show_map_flag: show_map_flag
    })
  },
  call_phone: function () {
    wx.makePhoneCall({
      phoneNumber: '12345678999'
    })
  },
  copy: function () {
    wx.setClipboardData({
      data: '12345678999',
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 800
        })
      }
    })
  },
  brand_select_main:function(){
    var brand_select = this.data.brand_select;
    brand_select = !brand_select;
    this.setData({
      brand_select: brand_select
    })
  },
  brands_check: function (res) {
    console.log(res)
    var brands = this.data.brands;
    for(var i=0;i<brands.length;i++){
      if (i == res.currentTarget.id)
        brands[i].select_flag=true;
      else
        brands[i].select_flag = false;
    }
    this.setData({
      brands: brands
    })
  },
  desinger_info: function () {
    wx.navigateTo({
      url: '../desinger_info/desinger_info',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  brand_select:function(){
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
    //login.login_first();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.request({
      url: 'https://32906079.jxggdxw.com/shop/homepage.do',  //需要修改的地方
      data: {
        flag:0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded,charset=UTF-8', // 默认值
      },
      success: function (res) {
        console.log(res)
      },
      complete: function () {
      },
      fail: function (res) {
      }
    })
  },
  allow_login:function(){
    var that=this;
     wx.openSetting({
        success: function(res) {
          console.log(res)
          console.log(res.authSetting["scope.userInfo"])
          if (res.authSetting["scope.userInfo"]){
            wx.getUserInfo({
              success: function (res) {
                console.log('用户允许获取信息')
                console.log(res)
                app.globalData.allow_login_flag = true;
                app.globalData.userInfo = res.userInfo
                that.setData({
                  allow_login_flag: app.globalData.allow_login_flag,
                  user_wechat_info: app.globalData.userInfo
                })
                wx.checkSession({
                  success: function () {
                    login.login_upload_session()
                  },
                  fail: function () {
                    login.login_upload_code()
                  }
                })
              },
              fail: function () {
                app.globalData.allow_login_flag = false;
                console.log('用户不允许获取信息')
              }

            })
          }
    }
      })
  },
  my_collect:function(){
    wx.navigateTo({
      url: '../my_collect/my_collect',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  my_integral: function () {
    wx.navigateTo({
      url: '../my_integral/my_integral',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  my_tickets: function () {
    app.globalData.coubons_flag = true;
    wx.navigateTo({
      url: '../coupons_center/coupons_center',
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
      allow_login_flag: app.globalData.allow_login_flag
    })
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
  

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  onPageScroll:function(res){
    //console.log(res)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})