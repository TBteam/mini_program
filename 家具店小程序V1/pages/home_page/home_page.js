// pages/home_page/home_page.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    open: false,
    hot_flag:false,
    new_flag:false,
    user_wechat_info: '',
    mark: 0,
    newmark: 0,
    startmark: 0,
    endmark: 0,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    staus: 1,
    translate: '',
    item: ['1', '1', '1', '1', '1', '1', '1', '1', '1'],
    style:''
  },
  tap_ch: function (e) {
    if (this.data.open) {
      this.setData({
        translate: 'transform: translateX(0px)'
      })
      this.data.open = false;
      this.data.staus = 1
    } else {
      this.setData({
        translate: 'transform: translateX(' + this.data.windowWidth * 0.6 + 'px)'
      })
      this.data.open = true;
      this.data.staus = 2
    }
  },
  tap_start: function (e) {
    this.data.mark = this.data.newmark = e.touches[0].pageX;
    if (this.data.staus == 1) {
      // staus = 1指默认状态
      this.data.startmark = e.touches[0].pageX;
    } else {
      // staus = 2指屏幕滑动到右边的状态
      this.data.startmark = e.touches[0].pageX;
    }

  },
  tap_drag: function (e) {
    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].pageX;
    if (this.data.mark < this.data.newmark) {
      if (this.data.staus == 1) {
        if (this.data.windowWidth * 0.6 > Math.abs(this.data.newmark - this.data.startmark)) {
          this.setData({
            translate: 'transform: translateX(' + (this.data.newmark - this.data.startmark) + 'px)'
          })
        }else{
          this.setData({
            translate: 'transform: translateX(' + this.data.windowWidth * 0.6 + 'px)'
          })
          this.data.staus = 2;
        }
      }

    }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if (this.data.mark > this.data.newmark) {
      if (this.data.staus == 1 && (this.data.newmark - this.data.startmark) > 0) {
        this.setData({
          translate: 'transform: translateX(' + (this.data.newmark - this.data.startmark) + 'px)'
        })
      } else if (this.data.staus == 2 && this.data.startmark - this.data.newmark < this.data.windowWidth * 0.6) {
        this.setData({
          translate: 'transform: translateX(' + (this.data.newmark + this.data.windowWidth * 0.6 - this.data.startmark) + 'px)'
        })
      }

    }
    this.data.mark = this.data.newmark;

  },
  tap_end: function (e) {
    console.log(e)
    if (this.data.startmark > this.data.newmark){
      this.setData({
        translate: 'transform: translateX(0px)',
      })
      this.data.staus = 1;
    }
    else if (this.data.staus == 1 && this.data.startmark < this.data.newmark){
      if (Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth * 0.15)) {
        this.setData({
          translate: 'transform: translateX(0px)'
        })
        this.data.staus = 1;
      } else {
        this.setData({
          translate: 'transform: translateX(' + this.data.windowWidth * 0.6 + 'px)'
        })
        this.data.staus = 2;
      }
    }
    /*
    else if (this.data.staus == 1 && this.data.startmark < this.data.newmark) {
      if (Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth * 0.15)) {
        this.setData({
          translate: 'transform: translateX(0px)'
        })
        this.data.staus = 1;
      } else {
        this.setData({
          translate: 'transform: translateX(' + this.data.windowWidth * 0.6 + 'px)'
        })
        this.data.staus = 2;

      }
    } else {
      if (Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth * 0.15)) {
        this.setData({
          translate: 'transform: translateX(' + this.data.windowWidth * 0.6 + 'px)'
        })
        this.data.staus = 2;
      } else {
        this.setData({
          translate: 'transform: translateX(0px)'
        })
        this.data.staus = 1;
      }
    }*/

    this.data.mark = 0;
    this.data.newmark = 0;
  },
  add_more:function(){
    var item=this.data.item;
    item.push('2');
    item.push('2');
    item.push('2');
    item.push('2');
    this.setData({
      item:item
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  hot_new_bintap:function(res){
    console.log(res)
    var that=this
    var hot_flag=that.data.hot_flag
    var new_flag = that.data.new_flag
    if (res.currentTarget.id == '2') {
      hot_flag=!hot_flag
      that.setData({
        hot_flag:hot_flag,
        new_flag:false
      })
    } else if (res.currentTarget.id == '1') {
      new_flag = !new_flag
      that.setData({
        new_flag:new_flag,
        hot_flag:false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    console.log(wx.getSystemInfoSync().windowHeight)
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          user_wechat_info: res.userInfo,
        })
        console.log('用户允许获取信息')
        console.log(res)    
      }
    })
    var style = "height:" + wx.getSystemInfoSync().windowHeight+"px"
    that.setData({
      user_wechat_info: app.globalData.userInfo,
      style:style
    })
  },
  bintap: function (res) {
    //console.log(res);
    var that = this;
    if (res.currentTarget.id == '1') {
      wx.navigateTo({
        url: '../cate_info_test/cate_info_test',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (res.currentTarget.id == '2') {
      wx.navigateTo({
        url: '../case_detail/case_detail',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  me_bintap:function(res){
    var that = this;
    if (res.currentTarget.id == '1') {
      wx.navigateTo({
        url: '../my_collect/my_collect',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (res.currentTarget.id == '2') {
      wx.navigateTo({
        url: '../coupons_center/coupons_center',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (res.currentTarget.id == '3') {
      wx.navigateTo({
        url: '../my_integral/my_integral',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (res.currentTarget.id == '4') {
     /* wx.navigateTo({
        url: '../case_detail/case_detail',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })*/
    } else if (res.currentTarget.id == '5') {
      /*wx.navigateTo({
        url: '../case_detail/case_detail',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })*/
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