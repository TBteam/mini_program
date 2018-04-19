// pages/message_suggest/message_suggest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: '',
    contact: '',
    content: '',
    noteinfo: '',
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
  input:function(res){
    var that=this
    console.log(res)
    if (res.currentTarget.id==1){
      that.setData({
        user_name:res.detail.value
      })
    } else if (res.currentTarget.id == 2) {
      that.setData({
        contact: res.detail.value
      })
    } else if (res.currentTarget.id == 3) {
      that.setData({
        content: res.detail.value
      })
    } else if (res.currentTarget.id == 4) {
      that.setData({
        noteinfo: res.detail.value
      })
    }
    console.log(that.data.user_name)
  },
  submit:function(){
    var that=this
    var user_name = that.data.user_name
    var contact = that.data.contact
    var content = that.data.content
    var noteinfo = that.data.noteinfo
    if (user_name==''){
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
    } else if (content == '') {
      wx.showToast({
        title: '请填写建议或留言',
        icon: 'loading',
        duration: 2000
      })
    }else{
      wx.request({
        url: 'https://furniture.jxggdxw.com/api/v1/uplaod_feedback/',
        method: 'POST',
        data: {
          user_name: encodeURI(user_name),
          contact: encodeURI(contact),
          content: encodeURI(content),
          noteinfo: encodeURI(noteinfo),
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          if(res.data.ret=='succ'){
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