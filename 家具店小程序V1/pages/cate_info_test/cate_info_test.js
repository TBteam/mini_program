// pages/cate_info_test/cate_info_test.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top_flag:false,
    first_flag: true,
    all_good_flag: false,
    hot_good_flag:false,
    new_good_flag: false,
    classfiy_flag:false,
    secne_flag: false,
    item: ['1', '1', '1', '1', '1', '1', '1', '1', '1'],
    classfiy: ['沙发', '床', '餐桌', '梳妆台', '电视柜', '写字台', '沙发', '沙发', '沙发', '沙发', '沙发', '沙发', '沙发',],
    classfiy1: ['客厅', '卧室', '餐厅', '户外'],
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
    ],
    imgUrls1: [
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG11.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG12.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG13.jpg',
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG14.jpg',
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
    var brand_id = app.globalData.brand_detail_brand_id
    var all_product=[]
    var cases=[]
    
    wx.request({
      url: 'https://32906079.jxggdxw.com/api/v1/get_brand_info/',
      method: 'GET',
      data: {
        'brand_id': brand_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
      }

    })
  },
  good_details_recommand_select: function (res) {
    console.log(res)
    var that = this;
    if (res.currentTarget.id == '1') {
      wx.pageScrollTo({
        scrollTop: 0
      })
      that.setData({
        first_flag: true,
        all_good_flag: false,
        hot_good_flag: false,
        new_good_flag: false,
        classfiy_flag: false,
        classfiy_flag1: false,
      })
    }
    else if (res.currentTarget.id == '2') {
      wx.pageScrollTo({
        scrollTop: 0
      })
      that.setData({
        first_flag: false,
        all_good_flag: true,
        hot_good_flag: false,
        new_good_flag: false,
        classfiy_flag: false,
        classfiy_flag1: false,
      })
    }
    else if (res.currentTarget.id == '3') {
      wx.pageScrollTo({
        scrollTop: 0
      })
      that.setData({
        first_flag: false,
        all_good_flag: false,
        hot_good_flag: true,
        new_good_flag: false,
        classfiy_flag: false,
        classfiy_flag1: false,
      })
    }
    else if (res.currentTarget.id == '4') {
      wx.pageScrollTo({
        scrollTop: 0
      })
      that.setData({
        first_flag: false,
        all_good_flag: false,
        hot_good_flag: false,
        new_good_flag: true,
        classfiy_flag: false,
        classfiy_flag1: false,
      })
    }
  },
  bottom_select: function (res) {
    console.log(res)
    var that = this;
    if (res.currentTarget.id == '1') {
      var classfiy_flag = !that.data.classfiy_flag
      that.setData({
        classfiy_flag: classfiy_flag,
        secne_flag: false,
      })
    }
    else if (res.currentTarget.id == '2') {
      var secne_flag = !that.data.secne_flag
      that.setData({
        classfiy_flag: false,
        secne_flag: secne_flag,
      })
    }
  },
  back_main:function(){
    var res = getCurrentPages()
    var flag = false;
    console.log(res)
    for (var i = 0; i < res.length; i++) {
      if (res[i].route == 'pages/main/main') {
        flag = true;
      }
    }
    if (flag) {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.redirectTo({
        url: '../main/main',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  about_store:function(){
    wx.navigateTo({
      url: '../about_store_detail/about_store_detail',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
  touchStart:function(res){
    console.log(res)
  },
  touchMove: function (res) {
    console.log(res)
  },
  touchEnd: function (res) {
    console.log(res)
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
  onPageScroll: function (res) {
    console.log(res.scrollTop)
    
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