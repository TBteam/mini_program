// pages/about_store_detail/about_store_detail.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_map_flag:false,
    shop_info:'',
    shop_pic:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  show_map: function (res) {
    console.log(res)
    var shop_info = this.data.shop_info
    shop_info[res.currentTarget.id].show_map_flag = !shop_info[res.currentTarget.id].show_map_flag
    this.setData({
      shop_info: shop_info
    })
  },
  call_phone: function (res) {
    var that=this
    console.log(res)
    var shop_info=that.data.shop_info;
    if (res.target.dataset.style == 'phone1') {
      wx.makePhoneCall({
        phoneNumber: shop_info[res.currentTarget.id].shop_contact
      })
    } else
      if (res.target.dataset.style == 'phone2') {
        wx.makePhoneCall({
          phoneNumber: shop_info[res.currentTarget.id].phone_contact
        })
    }
    
  },
  copy: function (res) {
    var that=this
    var shop_info = that.data.shop_info;
    wx.setClipboardData({
      data: shop_info[res.currentTarget.id].wechat_contact,
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
    
    var all_shop_info=[]
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
        for(var i=0;i<res.data.shop_info.length;i++){
          var shop_info = {}
          var marker = [{
            id: 0,
            title: 'TPS微信小程序',
            longitude: 114.06667,
            latitude: 22.61667,
            width: 100,
            height: 50,
            callout: { content: 'XXX家具', color: '#ffffff', fontSize: 15, borderRadius: 2, bgColor: '#22393c', padding: '', boxShadow: '', display: 'ALWAYS' }
          }]
          shop_info.shop_name = decodeURI(res.data.shop_info[i].shop_name)
           marker.title = shop_info.shop_name
           shop_info.shop_addr = decodeURI(res.data.shop_info[i].shop_addr)
           shop_info.shop_contact = decodeURI(res.data.shop_info[i].shop_contact)
           shop_info.phone_contact = decodeURI(res.data.shop_info[i].phone_contact)
           shop_info.wechat_contact = decodeURI(res.data.shop_info[i].wechat_contact)
           var locate = res.data.shop_info[i].shop_locate
           locate = locate.replace('(', '')
           locate = locate.replace(')', '')
           var locate1 = locate.split(",")
           marker[0].callout.content = shop_info.shop_name
           marker[0].longitude = parseFloat(locate1[1]) 
           marker[0].latitude = parseFloat(locate1[0])
           marker[0].id=i
           shop_info.marker = marker
           shop_info.longitude = marker[0].longitude
           shop_info.latitude = marker[0].latitude
           shop_info.show_map_flag=false
           all_shop_info.push(shop_info)
        }
        console.log(all_shop_info)
        wx.setNavigationBarTitle({
          title: decodeURI(res.data.online_shop_name)
        })
        that.setData({
          shop_pic: res.data.shop_pic,
          shop_info: all_shop_info
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