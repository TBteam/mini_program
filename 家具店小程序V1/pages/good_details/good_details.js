// pages/good_details/good_details.js
var Crypto = require('../../utils/cryptojs/cryptojs.js').Crypto
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      'https://32906079.jxggdxw.com/WeappServer/D8/169/IMG7.jpg',
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
    var collect_flag = this.data.collect_flag;
    collect_flag = !collect_flag
    this.setData({
      collect_flag: collect_flag
    })
  },
 
  bindtap:function(res){
    console.log(res)
    var that = this;
 if (res.currentTarget.id == '2') {
      that.setData({
        bottom_info_flag: true,
        preferential_info_flag: true
      })
    } 
    else if (res.currentTarget.id == '1') {
      var format_flag = that.data.format_flag;
      //format_flag = !format_flag;
      that.setData({
        bottom_info_flag: true,
        format_flag: true
      })
    } 
  },
  cancel:function(res){
    this.setData({
      bottom_info_flag: false,
      preferential_info_flag: false,
      format_flag: false
    })
  },
  format_checked:function(res){
    console.log(res);
    var formats=this.data.formats;
    var price;
    for(var i=0;i<formats.length;i++){
      if (i == res.currentTarget.id){
        formats[i].checked=true;
        price = formats[i].price;
      }
      else{
        formats[i].checked = false;
      }
    }
    this.setData({
      formats:formats,
      price:price
    })
  },
  good_details_recommand_select:function(res){
       console.log(res)
       var that=this;
       if (res.currentTarget.id == '1') {
         that.setData({
           detail_info_flag: true,
           recommand_flag: false
         })
       }
       else if (res.currentTarget.id == '2') {
         that.setData({
           detail_info_flag: false,
           recommand_flag: true
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