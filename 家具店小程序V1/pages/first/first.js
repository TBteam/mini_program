// pages/first/first.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  data1:[1,1,1,1,1,1,,1],
  all_brand:[]
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
    var all_brand=[]
    wx.request({
      url: 'https://furniture.jxggdxw.com/api/v1/get_all_brand_info/',
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        for (var i = 0; i < res.data.all_brand_info.length;i++){
          var brand_info={}
          brand_info.brand_name = decodeURI(res.data.all_brand_info[i].brand_name)
          brand_info.brand_logo = res.data.all_brand_info[i].brand_logo
          brand_info.brand_id = res.data.all_brand_info[i].brand_id
          all_brand.push(brand_info)
        }
        that.setData({
          all_brand: all_brand
        })
      }
    })
  },
  enter_brand:function(res){
    var that=this 
    var all_brand = that.data.all_brand
    console.log(res)
    var id = res.currentTarget.id
    app.globalData.brand_detail_brand_id = all_brand[id].brand_id
    console.log(app.globalData.brand_detail_brand_id)
    wx.navigateTo({
      url: '../cate_info_test/cate_info_test',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  enter_home_page:function(){
    wx.navigateTo({
      url: '../home_page/home_page',
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