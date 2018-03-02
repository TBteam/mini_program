// pages/all_goods/all_goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    brand_select: false,
    brand_item1_checked:false,
    brand_item2_checked: false,
    brand_item3_checked: false,
    brands: [{ brand: '品牌1', select_flag: false },
    { brand: '品牌2', select_flag: false },
    { brand: '品牌2', select_flag: false },
    { brand: '品牌2', select_flag: false },
    { brand: '品牌2', select_flag: false },
    { brand: '品牌3', select_flag: false }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindtap: function () {
    wx.navigateTo({
      url: '../good_details/good_details',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  brand_select_main: function (res) {
    console.log(res)
    var brand_select = this.data.brand_select; 
    var brand_item1_checked = this.data.brand_item1_checked
    var brand_item2_checked = this.data.brand_item2_checked
    var brand_item3_checked = this.data.brand_item3_checked
    if (res.currentTarget.id=="1"){
      if ((!brand_select) || (!brand_item1_checked)){
         var brands= [{ brand: '品牌1', select_flag: false },
           { brand: '品牌2', select_flag: false },
           { brand: '品牌2', select_flag: false },
           { brand: '品牌2', select_flag: false },
           { brand: '品牌2', select_flag: false },
           { brand: '品牌3', select_flag: false }]
          this.setData({
             brand_select:true,
             brands:brands,
             brand_item1_checked: true,
             brand_item2_checked: false,
             brand_item3_checked: false
      })
      }
      else if (brand_select && brand_item1_checked){
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
  brand_select_complet:function(){
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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