// pages/about_store_detail/about_store_detail.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_map_flag:false,
    shop_info:'',
    longitude:0,
    latitude:0,
    markers: [{
      //iconPath: "/resources/others.png",
      id: 0,
      title: 'TPS微信小程序',
      longitude: 114.06667,
      latitude: 22.61667,
      width: 100,
      height: 50,
      callout: { content: 'XXX家具', color: 'white', fontSize: 20, borderRadius: 2, bgColor: 'red', padding: '', boxShadow: '', display: 'ALWAYS' }
    }],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  show_map: function () {
    var show_map_flag = this.data.show_map_flag;
    show_map_flag = !show_map_flag;
    this.setData({
      show_map_flag: show_map_flag
    })
  },
  call_phone: function (res) {
    var that=this
    console.log(res)
    var shop_info=that.data.shop_info;
    if (res.currentTarget.id=='1'){
       wx.makePhoneCall({
          phoneNumber: shop_info.shop_contact
        })
    } else if (res.currentTarget.id == '2'){
      wx.makePhoneCall({
        phoneNumber: shop_info.phone_contact
      })
    }
    
  },
  copy: function () {
    var that=this
    var shop_info = that.data.shop_info;
    wx.setClipboardData({
      data: shop_info.wechat_contact,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 800
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
    var brand_id = app.globalData.brand_detail_brand_id
    var shop_info={}
    var markers = that.data.markers
    wx.request({
      url: 'https://furniture.jxggdxw.com/api/v1/get_shop_info/',
      method: 'GET',
      data: {
        'brand_id': brand_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        shop_info.shop_name=decodeURI(res.data.shop_info.shop_name)
        markers[0].title = shop_info.shop_name
        shop_info.shop_addr = decodeURI(res.data.shop_info.shop_addr)
        shop_info.shop_contact = decodeURI(res.data.shop_info.shop_contact)
        shop_info.phone_contact = decodeURI(res.data.shop_info.phone_contact)
        shop_info.wechat_contact = decodeURI(res.data.shop_info.wechat_contact)
        shop_info.shop_pic = res.data.shop_info.shop_pic
        var locate = res.data.shop_info.shop_locate
        locate = locate.replace('(', '')
        locate = locate.replace(')', '')
        var locate1 = locate.split(",")
        markers[0].callout.content = shop_info.shop_name
        markers[0].longitude = parseFloat(locate1[1]) 
        markers[0].latitude = parseFloat(locate1[0]) 
        wx.setNavigationBarTitle({
          title: shop_info.shop_name
        })
        that.setData({
          shop_info: shop_info,
          markers: markers,
          longitude: markers[0].longitude,
          latitude: markers[0].latitude
        })
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