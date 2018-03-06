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
    colligate_flag:true,      //综合标志位
    filter_is_open_flag:false,
    filter_is_selected:false,
    user_allow_login:false,
    filter_item: [
      {item_name:"5万以下",selected:false},
      { item_name: "5-8万", selected: false }, 
      { item_name: "8-10万", selected: false }, 
      { item_name: "10-15万", selected: false }, 
      { item_name: "15万以上", selected: false },  
     ],
    filter_item1: [
      { item_name: "二居室", selected: false },
      { item_name: "三居室", selected: false },
      { item_name: "四居室", selected: false },
      { item_name: "四居室以上", selected: false },
      ],
    filter_item2: [
      { item_name: "70平以下", selected: true },  
      { item_name: "70-90平", selected: false },  
      { item_name: "90-120平", selected: false },  
      { item_name: "120-150平", selected: false },  
      { item_name: "150平以上", selected: false },  
     ],
    filter_item3: [
      { item_name: "中式", selected: false },
      { item_name: "新中式", selected: false },
      { item_name: "欧式", selected: false },
      { item_name: "美式", selected: false },
      ],
    filter_item4: ["二居室", "三居室", "四居室", "四居室以上"],
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
      that.reset()
      that.setData({
        hot_flag:hot_flag,
        colligate_flag:false,
        new_flag:false,
        filter_is_open_flag:false,
        filter_is_selected: false
      })
    } else if (res.currentTarget.id == '1') {
      new_flag = !new_flag
      that.reset()
      that.setData({
        new_flag:new_flag,
        hot_flag:false,
        colligate_flag:false,
        filter_is_open_flag: false,
        filter_is_selected:false
      })
    }
    else if (res.currentTarget.id == '3') {
      //colligate_flag = !colligate_flag
      that.reset()
      that.setData({
        colligate_flag: true,
        new_flag: false,
        hot_flag: false,
        filter_is_open_flag: false,
        filter_is_selected: false
      })
    }
  },
  filter:function(e){
    console.log(e)
    var filter_is_open_flag = this.data.filter_is_open_flag
      this.setData({
        filter_is_open_flag:true
      })
  },
  /*******筛选页面项目选择函数********/
  filter_item_select:function(res){
    var that=this
    console.log(res.currentTarget.dataset.id)
    console.log(res.currentTarget.id)
    if (res.currentTarget.dataset.id=="one"){
        var filter_item=that.data.filter_item
        console.log(filter_item)
        for (var i = 0; i < filter_item.length;i++){
          filter_item[i].selected=false
        }
        filter_item[res.currentTarget.id].selected = !filter_item[res.currentTarget.id].selected
        console.log(filter_item)
        that.setData({
          filter_item: filter_item
        })
    } else if (res.currentTarget.dataset.id == "two") {
      var filter_item1 = that.data.filter_item1
      for (var i = 0; i < filter_item1.length; i++) {
        filter_item1[i].selected = false
      }
      filter_item1[res.currentTarget.id].selected = !filter_item1[res.currentTarget.id].selected
      that.setData({
        filter_item1: filter_item1
      })
    } else if (res.currentTarget.dataset.id == "three") {
      var filter_item2 = that.data.filter_item2
      for (var i = 0; i < filter_item2.length; i++) {
        filter_item2[i].selected = false
      }
      filter_item2[res.currentTarget.id].selected = !filter_item2[res.currentTarget.id].selected
      that.setData({
        filter_item2: filter_item2
      })
    } else if (res.currentTarget.dataset.id == "four") {
      var filter_item3 = that.data.filter_item3
      for (var i = 0; i < filter_item3.length; i++) {
        filter_item3[i].selected = false
      }
      filter_item3[res.currentTarget.id].selected = !filter_item3[res.currentTarget.id].selected
      that.setData({
        filter_item3: filter_item3
      })
    }
  },
/************重置&确定函数**************/
reset_ensure:function(res){
  var that=this
  console.log(res)
  if (res.currentTarget.dataset.type == "reset") {
    that.reset();
  } else if (res.currentTarget.dataset.type == "ensure") {
    var filter_item = that.data.filter_item
    var filter_item1 = that.data.filter_item1
    var filter_item2 = that.data.filter_item2
    var filter_item3 = that.data.filter_item3
    var filter_is_selected = that.data.filter_is_selected
    filter_item = filter_item.concat(filter_item1)
    filter_item = filter_item.concat(filter_item2)
    filter_item = filter_item.concat(filter_item3)
    console.log(filter_item)
    var filter_is_selected_flag=false
    for (var i = 0; i < filter_item.length; i++) {
      if (filter_item[i].selected){
        filter_is_selected_flag=true
      }
    }
    if (filter_is_selected_flag){
      filter_is_selected=true;
      var new_flag=false;
      var hot_flag = false;
      var colligate_flag=false
    }else{
      filter_is_selected = false;
      var new_flag = that.data.new_flag;
      var hot_flag = that.data.hot_flag;
      var colligate_flag = that.data.colligate_flag;
    }
    that.setData({
      filter_is_selected: filter_is_selected,
      filter_is_open_flag:false,
      new_flag: new_flag,
      hot_flag: hot_flag,
      colligate_flag: colligate_flag
    })
  }
  
},
reset:function(){
  var that=this
  var filter_item = that.data.filter_item
  var filter_item1 = that.data.filter_item1
  var filter_item2 = that.data.filter_item2
  var filter_item3 = that.data.filter_item3
  for (var i = 0; i < filter_item.length; i++) {
    filter_item[i].selected = false
  }
  for (var i = 0; i < filter_item1.length; i++) {
    filter_item1[i].selected = false
  }
  for (var i = 0; i < filter_item2.length; i++) {
    filter_item2[i].selected = false
  }
  for (var i = 0; i < filter_item3.length; i++) {
    filter_item3[i].selected = false
  }
  that.setData({
    filter_item: filter_item,
    filter_item1: filter_item1,
    filter_item2: filter_item2,
    filter_item3: filter_item3
  })
},

/********从筛选页面返回主页面********/
back_top:function(e){      
  console.log(e)
  var filter_is_open_flag = this.data.filter_is_open_flag
  if (filter_is_open_flag){
    this.setData({
      filter_is_open_flag: false
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
          user_allow_login:true,
        })
        console.log('用户允许获取信息')
        console.log(res)    
      },
      fail:function(res){
        user_allow_login:false    
      }
    })
    var style = "height:" + wx.getSystemInfoSync().windowHeight+"px"
    that.setData({
      user_wechat_info: app.globalData.userInfo,
      style:style
    })
  },
  allow_login: function () {
    var that = this;
    wx.openSetting({
      success: function (res) {
        console.log(res)
        console.log(res.authSetting["scope.userInfo"])
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: function (res) {
              console.log('用户允许获取信息')
              console.log(res)
              app.globalData.allow_login_flag = true;
              app.globalData.userInfo = res.userInfo
              that.setData({
                allow_login_flag: app.globalData.allow_login_flag,
                user_wechat_info: app.globalData.userInfo,
                user_allow_login: true,
              })
              wx.checkSession({
                success: function () {
                },
                fail: function () {
                }
              })
            },
            fail: function () {
              app.globalData.allow_login_flag = false;
              console.log('用户不允许获取信息')
            }

          })
        }
      }
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
      var filter_is_open_flag = that.data.filter_is_open_flag
      if (filter_is_open_flag){
          that.setData({
            filter_is_open_flag:false
          })
      }else {
      wx.navigateTo({
        url: '../case_detail/case_detail',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
        })
      }
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
      wx.navigateTo({
        url: '../apply_enter/apply_enter',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (res.currentTarget.id == '5') {
      wx.navigateTo({
        url: '../message_suggest/message_suggest',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    else if (res.currentTarget.id == '6') {
      /*wx.navigateTo({
        url: '../message_suggest/message_suggest',
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