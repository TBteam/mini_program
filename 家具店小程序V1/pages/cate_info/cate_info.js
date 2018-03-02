// pages/cate_info/cate_info.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    main_select: false,
    case_select: false,
    about_us_select: false,
    cate_select: true,
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
    wx.setNavigationBarTitle({
      title: 'NORYA-D5'
    })
    
   
  },
  brand_select_main: function (res) {
    console.log(res)
    var brand_select = this.data.brand_select;
    var brand_item1_checked = this.data.brand_item1_checked
    var brand_item2_checked = this.data.brand_item2_checked
    var brand_item3_checked = this.data.brand_item3_checked
    if (res.currentTarget.id == "1") {
      if ((!brand_select) || (!brand_item1_checked)) {
        var brands = [{ brand: '品牌1', select_flag: false },
        { brand: '品牌2', select_flag: false },
        { brand: '品牌2', select_flag: false },
        { brand: '品牌2', select_flag: false },
        { brand: '品牌2', select_flag: false },
        { brand: '品牌3', select_flag: false }]
        this.setData({
          brand_select: true,
          brands: brands,
          brand_item1_checked: true,
          brand_item2_checked: false,
          brand_item3_checked: false
        })
      }
      else if (brand_select && brand_item1_checked) {
        brand_select = !brand_select;
        this.setData({
          brand_select: brand_select
        })
      }
    } else if (res.currentTarget.id == "2") {
      if ((!brand_select) || (!brand_item2_checked)) {
        var brands = [{ brand: '客厅', select_flag: false },
        { brand: '卧室', select_flag: false },
        { brand: '户外', select_flag: false },
        { brand: '会议室', select_flag: false }]
        this.setData({
          brand_select: true,
          brands: brands,
          brand_item1_checked: false,
          brand_item2_checked: true,
          brand_item3_checked: false
        })
      } else if (brand_select && brand_item2_checked) {
        brand_select = !brand_select;
        this.setData({
          brand_select: brand_select
        })
      }
    }
    else if (res.currentTarget.id == "3") {
      if ((!brand_select) || (!brand_item3_checked)) {
        var brands = [{ brand: "沙发", select_flag: false },
        { brand: "茶几", select_flag: false },
        { brand: "书桌", select_flag: false },
        { brand: "床", select_flag: false },
        { brand: "柜子", select_flag: false },
        { brand: "电视柜", select_flag: false },
        { brand: "小类7", select_flag: false },
        { brand: "小类8", select_flag: false },
        { brand: "小类9", select_flag: false }]
        this.setData({
          brand_select: true,
          brands: brands,
          brand_item1_checked: false,
          brand_item2_checked: false,
          brand_item3_checked: true
        })
      } else if (brand_select && brand_item3_checked) {
        brand_select = !brand_select;
        this.setData({
          brand_select: brand_select
        })
      }
    }

  },
  brand_select_complet: function () {
    var brand_select = this.data.brand_select;
    brand_select = !brand_select;
    this.setData({
      brand_select: brand_select
    })
  },
  brands_check: function (res) {
    console.log(res)
    var brands = this.data.brands;
    for (var i = 0; i < brands.length; i++) {
      if (i == res.currentTarget.id)
        brands[i].select_flag = true;
      else
        brands[i].select_flag = false;
    }
    this.setData({
      brands: brands
    })
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
  bottom_select: function (res) {
    //console.log(res);
    var that = this;
    if (res.currentTarget.id == '1') {
      var res = getCurrentPages()
      var flag=false;
      console.log(res)
      for (var i = 0; i < res.length; i++) {
        if (res[i].route =='pages/main/main'){
          flag=true;
        }
      }
      if(flag){
        wx.navigateBack({
          delta: 1
        })
      }else{
        wx.redirectTo({
          url: '../main/main',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
      
    } else if (res.currentTarget.id == '2') {
      that.setData({
        case_select: false,
        about_us_select: false,
        cate_select: true,
      })
    } else if (res.currentTarget.id == '3') {
      that.setData({
        case_select: true,
        about_us_select: false,
        cate_select: false,
      })
    } else if (res.currentTarget.id == '4') {
      that.setData({
        user_wechat_info: app.globalData.userInfo
      })
      that.setData({
        case_select: false,
        about_us_select: true,
        cate_select: false,
      })
    }
  },
  case_detail: function () {
    wx.navigateTo({
      url: '../case_detail/case_detail',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
    console.log('res')
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