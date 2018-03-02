// pages/about_store_detail/about_store_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_map_flag:false,
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