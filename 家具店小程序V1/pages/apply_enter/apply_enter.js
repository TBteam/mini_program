// pages/apply_enter/apply_enter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    style: ['中式', '新中式', '美式', '欧式','其他'],
    style_index:0,
    name:'',
    contact:'',
    address:'',
    brand_name:'',
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
  style_select:function(res){
    this.setData({
      style_index: res.detail.value
    })
  },
  input:function(res){
    console.log(res)
    var that=this
    var apply_info={}
    if (res.currentTarget.id=='1'){
      that.setData({
        name: res.detail.value
      })
    } else if (res.currentTarget.id == '2') {
      that.setData({
        contact: res.detail.value
      })
    } else if (res.currentTarget.id == '3') {
      that.setData({
        address: res.detail.value
      })
    } else if (res.currentTarget.id == '4') {
      that.setData({
        brand_name: res.detail.value
      })
    }
  },
  submit:function(){
    var that=this
    var style = that.data.style
    var style_index = that.data.style_index
    var name = that.data.name
    console.log(name)
    var contact = that.data.contact
    var address = that.data.address
    var brand_name = that.data.brand_name
    if (name == '') {
      wx.showToast({
        title: '请填写姓名',
        icon: 'loading',
        duration: 2000
      })
    } else if (contact == '') {
      wx.showToast({
        title: '请填写联系方式',
        icon: 'loading',
        duration: 2000
      })
    } else if (address == '') {
      wx.showToast({
        title: '请填写地址',
        icon: 'loading',
        duration: 2000
      })
    } else if (brand_name == '') {
      wx.showToast({
        title: '请填写品牌',
        icon: 'loading',
        duration: 2000
      })
    }else {
      var style=style[style_index]
      console.log(name)
      console.log(contact)
      console.log(address)
      console.log(brand_name)
      console.log(style)
      wx.request({
        url: 'https://32906079.jxggdxw.com/api/v1/uplaod_enter_apply/',
        method: 'POST',
        data: {
          user_name: encodeURI(name),
          contact: encodeURI(contact),
          address: encodeURI(address),
          brand_name: encodeURI(brand_name),
          brand_style: encodeURI(style),
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          if (res.data.ret == 'succ') {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
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
  
  }
})