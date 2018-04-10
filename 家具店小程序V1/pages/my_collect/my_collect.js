// pages/my_collect/my_collect.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect_good_flag: true,
    collect_case_flag: false,
    collect_news_flag: false,
    collect_good_page:0,
    collect_good_more_flag:false,
    collect_case_page:0,
    collect_case_more_flag:false,
    collect_good:[],
    collect_case:[],
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
    var that=this
    var collect_good_page = that.data.collect_good_page
    var collect_case_page = that.data.collect_case_page
    
    that.get_collect_product(collect_good_page)
    that.get_collect_case(collect_case_page)
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
    var that = this;
    if (res.currentTarget.id == '1') {
      console.log(res.currentTarget.dataset.case_id)
      var brand_id = res.currentTarget.dataset.case_id
      var cases = that.data.collect_case
      app.globalData.brand_detail_brand_id = cases[brand_id].brand_id
      console.log(app.globalData.brand_detail_brand_id)
      wx.navigateTo({
        url: '../cate_info_test/cate_info_test',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (res.currentTarget.id == '2') {
        console.log(res.currentTarget.dataset.case_id)
        var case_id = res.currentTarget.dataset.case_id
        var cases = that.data.collect_case
        app.globalData.case_detail_case_id = cases[case_id].case_id
        app.globalData.case_detail_is_show_brand_info = true
        console.log(app.globalData.case_detail_case_id)
          wx.navigateTo({
            url: '../case_detail/case_detail',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
    }
  },
  good_detail:function(res){
     console.log(res)
     var that=this
     var product=that.data.collect_good
     var product_id=res.currentTarget.id
     app.globalData.good_detail_product_id = product[product_id].product_id
     wx.navigateTo({
       url: '../good_details/good_details',
       success: function (res) { },
       fail: function (res) { },
       complete: function (res) { },
     })
  },
  add_more:function(){
    var that=this
    var collect_good_page = that.data.collect_good_page+1
    var collect_case_page = that.data.collect_case_page+1
    var collect_good_flag = that.data.collect_good_flag
    var collect_case_flag = that.data.collect_case_flag
    if (collect_good_flag){
      that.get_collect_product(collect_good_page)
    } else if (collect_case_flag){
      that.get_collect_case(collect_case_page)
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
  
  },
  get_collect_product:function(page){
    var that=this
    var page=page
    var user_id = app.globalData.user_id 
    var products = that.data.collect_good
    wx.request({
      url: 'https://32906079.jxggdxw.com/api/v1/get_collect_product/',
      method: 'GET',
      data: {
        'user_id': user_id,
        'page': page,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.ret == 'succ') {
          if (res.data.products.length < 10) {
            var collect_good_more_flag = true
          } else {
            var collect_good_more_flag = false
          }
          for (var i = 0; i < res.data.products.length; i++) {
            var product = {}
            product.product_name = decodeURI(res.data.products[i].product_name)
            product.product_price = decodeURI(res.data.products[i].product_price)
            product.product_id = res.data.products[i].product_id
            product.item_image_url = res.data.products[i].product_item_url
            products.push(product)
          }
          that.setData({
            collect_good: products,
            collect_good_more_flag: collect_good_more_flag,
          })
          console.log(that.data.collect_good)
        } else if (res.data.ret == 'fail' && page==0) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  get_collect_case:function(page){
    var that = this
    var page = page
    var user_id = app.globalData.user_id 
    var all_area = app.globalData.all_area
    var all_style = app.globalData.all_style
    var all_house_style = app.globalData.all_house_style
    var all_price = app.globalData.all_price
    var cases=that.data.collect_case
    wx.request({
      url: 'https://32906079.jxggdxw.com/api/v1/get_collect_case/',
      method: 'GET',
      data: {
        'user_id': user_id,
        'page': page,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.ret == 'succ') {
          if (res.data.cases.length < 10) {
            var collect_case_more_flag = true
          } else {
            var collect_case_more_flag = false
          }
          for (var i = 0; i < res.data.cases.length; i++) {
            var case_info = {}
            case_info.name = decodeURI(res.data.cases[i].case_name)
            case_info.brand_name = decodeURI(res.data.cases[i].brand_name)
            case_info.case_id = res.data.cases[i].case_id
            case_info.brand_id = res.data.cases[i].brand_id
            case_info.item_imgae_url = res.data.cases[i].item_image_url
            case_info.brand_logo = res.data.cases[i].brand_logo
            for (var j = 0; j < all_area.length; j++) {
              if (all_area[j].id == res.data.cases[i].area_id) {
                case_info.area_name = all_area[j].name
                case_info.area_id = all_area[j].id
              }
            }
            for (var j = 0; j < all_price.length; j++) {
              if (all_price[j].id == res.data.cases[i].price_id) {
                case_info.price_name = all_price[j].name
                case_info.price_id = all_price[j].id
              }
            }
            for (var j = 0; j < all_house_style.length; j++) {
              if (all_house_style[j].id == res.data.cases[i].house_style_id) {
                case_info.house_style_name = all_house_style[j].name
                case_info.house_style_id = all_house_style[j].id
              }
            }
            cases.push(case_info) 
          }
          that.setData({
            collect_case: cases,
            collect_case_more_flag: collect_case_more_flag
          })
          console.log(that.data.collect_case)
        } else if (res.data.ret == 'fail' && page == 0) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  }
})