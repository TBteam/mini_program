// pages/home_page/home_page.js
var app=getApp()
var login = require('../../utils/login.js');
Page({

  /**
   * 页面的初始数据
   */

  data: {
    open: false,
    scroll_top:0,
    hot_flag:false,
    new_flag:false,
    colligate_flag:true,      //综合标志位
    filter_is_open_flag:false,
    filter_is_selected:false,
    user_allow_login:false,
    all_area:[],
    all_price:[],
    all_style:[],
    all_house_style:[],
    cases:[],
    new_case_page:0,
    hot_case_page:0,
    filter_case_page:0,
    colligate_case_page:0,
    new_case_more_flag:false,
    hot_case_more_flag:false,
    filter_case_more_flag:false,
    colligate_case_more_flag:false,
    new_cases:[],
    hot_cases:[],
    colligate_cases:[],
    filter_cases:[],
    filter_condition:[],
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
    var that=this
    hot_flag = that.data.hot_flag
    new_flag = that.data.new_flag
    colligate_flag = that.data.colligate_flag      //综合标志位
    filter_is_selected = that.data.filter_is_selected
    if(hot_flag){
      var page=that.data.hot_case_page
      page+=1
      that.get_hot_case(page)
      that.setData({
        hot_case_page: page
      })
    }else if(new_flag){
      var page = that.data.new_case_page
      page += 1
      that.get_new_case(page)
      that.setData({
        new_case_page: page
      })
    }
    else if (colligate_flag) {
      var page = that.data.colligate_case_page
      page += 1
      that.get_colligate_case(page)
      that.setData({
        colligate_case_page: page
      })
    } else if (filter_is_selected) {
      var page = that.data.filter_case_page
      page += 1
      that.get_filter_case(page)
      that.setData({
        filter_case_page: page
      })
    }
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
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      hot_flag=!hot_flag
      that.reset()
      that.setData({
        scroll_top:0
      })
      var hot_cases = that.data.hot_cases
      if (hot_cases.length == 0) {
        console.log('hot_cases=0')
        that.get_hot_case(0)
      } else {
        console.log('hot_cases!=0')
        that.setData({
          cases: hot_cases
        })
      }
      that.setData({
        hot_flag:true,
        colligate_flag:false,
        new_flag:false,
        filter_is_open_flag:false,
        filter_is_selected: false
      })
    } else if (res.currentTarget.id == '1') {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      new_flag = !new_flag
      that.reset()
      that.setData({
        scroll_top: 0
      })
      var new_cases=that.data.new_cases
      if(new_cases.length==0){
        console.log('new_cases=0')
        that.get_new_case(0)
      }else{
        console.log('new_cases!=0')
        that.setData({
          cases:new_cases
        })
      }
      that.setData({
        new_flag:true,
        hot_flag:false,
        colligate_flag:false,
        filter_is_open_flag: false,
        filter_is_selected:false
      })
    }
    else if (res.currentTarget.id == '3') {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      //colligate_flag = !colligate_flag
      that.reset()
      that.setData({
        scroll_top: 0
      })
      var colligate_cases = that.data.colligate_cases
      if (colligate_cases.length==0){

      }else{
        that.setData({
          cases: colligate_cases
        })
      }
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
        var all_price=that.data.all_price
        console.log(all_price)
        for (var i = 0; i < all_price.length;i++){
          all_price[i].checked=false
        }
        all_price[res.currentTarget.id].checked = !all_price[res.currentTarget.id].checked
        console.log(all_price)
        that.setData({
          all_price: all_price
        })
    } else if (res.currentTarget.dataset.id == "two") {
      var all_house_style = that.data.all_house_style
      for (var i = 0; i < all_house_style.length; i++) {
        all_house_style[i].checked = false
      }
      all_house_style[res.currentTarget.id].checked = !all_house_style[res.currentTarget.id].checked
      that.setData({
        all_house_style: all_house_style
      })
    } else if (res.currentTarget.dataset.id == "three") {
      var all_area = that.data.all_area
      for (var i = 0; i < all_area.length; i++) {
        all_area[i].checked = false
      }
      all_area[res.currentTarget.id].checked = !all_area[res.currentTarget.id].checked
      that.setData({
        all_area: all_area
      })
    } else if (res.currentTarget.dataset.id == "four") {
      var all_style = that.data.all_style
      for (var i = 0; i < all_style.length; i++) {
        all_style[i].checked = false
      }
      all_style[res.currentTarget.id].checked = !all_style[res.currentTarget.id].checked
      that.setData({
        all_style: all_style
      })
    }
  },
/************重置&确定函数**************/
reset_ensure:function(res){
  var that=this
  console.log(res)
  var filter_condition={price_id:'none',house_style_id:'none',area_id:'none',style_id:'none'}
  var filter_is_selected_flag = false
  if (res.currentTarget.dataset.type == "reset") {
    that.reset();
  } else if (res.currentTarget.dataset.type == "ensure") {
    var all_price = that.data.all_price
    var all_house_style = that.data.all_house_style
    var all_area = that.data.all_area
    var all_style = that.data.all_style
    var filter_is_selected = that.data.filter_is_selected
    console.log(all_price)
    for (var i = 0; i < all_price.length; i++) {
      if (all_price[i].checked){
        filter_condition.price_id = all_price[i].id
        filter_is_selected_flag=true
      }
    }
    for (var i = 0; i < all_house_style.length; i++) {
      if (all_house_style[i].checked) {
        filter_condition.house_style_id = all_house_style[i].id
        filter_is_selected_flag = true
      }
    }
    for (var i = 0; i < all_area.length; i++) {
      if (all_area[i].checked) {
        filter_condition.area_id = all_area[i].id
        filter_is_selected_flag = true
      }
    }
    for (var i = 0; i < all_style.length; i++) {
      if (all_style[i].checked) {
        filter_condition.style_id = all_style[i].id
        filter_is_selected_flag = true
      }
    }
    if (filter_is_selected_flag){
      that.get_filter_case(filter_condition,0)
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
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
      scroll_top: 0
    })
    that.setData({
      filter_is_selected: filter_is_selected,
      filter_is_open_flag:false,
      new_flag: new_flag,
      hot_flag: hot_flag,
      filter_condition:filter_condition,
      colligate_flag: colligate_flag,
      filter_cases:[]
    })
  }
  
},
reset:function(){
  var that=this
  var all_price = that.data.all_price
  var all_house_style = that.data.all_house_style
  var all_area = that.data.all_area
  var all_style = that.data.all_style
  for (var i = 0; i < all_price.length; i++) {
    all_price[i].checked = false
  }
  for (var i = 0; i < all_house_style.length; i++) {
    all_house_style[i].checked = false
  }
  for (var i = 0; i < all_area.length; i++) {
    all_area[i].checked = false
  }
  for (var i = 0; i < all_style.length; i++) {
    all_style[i].checked = false
  }
  that.setData({
    all_price: all_price,
    all_house_style: all_house_style,
    all_area: all_area,
    all_style: all_style
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
    var all_area = []
    var all_house_style = []
    var all_price = []
    var all_style = []
    var cases = []
    var user_wechat_info
    var colligate_case_more_flag = that.data.colligate_case_more_flag
    that.login_first()     //登陆
    var style = "height:" + wx.getSystemInfoSync().windowHeight+"px"
    that.setData({
      style: style,
    })
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    wx.request({
      url: 'https://32906079.jxggdxw.com/api/v1/get_first_page_info/',
      method: 'GET',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.all_area.length)
        for (var i = 0; i < res.data.all_area.length;i++){
          var area={}
          area.name = decodeURI(res.data.all_area[i].area_name)
          area.id = res.data.all_area[i].area_id
          area.checked=false
          all_area.push(area)
        }
        console.log(all_area)
        for (var i = 0; i < res.data.all_house_style.length; i++) {
          var house_style = {}
          house_style.name = decodeURI(res.data.all_house_style[i].house_style_name)
          house_style.id = res.data.all_house_style[i].house_style_id
          house_style.checked = false
          all_house_style.push(house_style)
        }
        console.log(all_house_style)
        for (var i = 0; i < res.data.all_price.length; i++) {
          var price = {}
          price.name = decodeURI(res.data.all_price[i].price_name)
          price.id = res.data.all_price[i].price_id
          price.checked = false
          all_price.push(price)
        }
        console.log(all_price)
        for (var i = 0; i < res.data.all_style.length; i++) {
          var style = {}
          style.name = decodeURI(res.data.all_style[i].style_name)
          style.id = res.data.all_style[i].style_id
          style.checked = false
          all_style.push(style)
        }
        console.log(all_style)
        if (res.data.cases.length < 10) {
          colligate_case_more_flag = true
        }
        for (var i = 0; i < res.data.cases.length; i++) {
          var case_info = {}
          case_info.name = decodeURI(res.data.cases[i].case_name)
          case_info.brand_name = decodeURI(res.data.cases[i].brand_name)
          case_info.case_id = res.data.cases[i].case_id
          case_info.brand_id = res.data.cases[i].brand_id
          case_info.item_imgae_url = res.data.cases[i].item_image_url
          case_info.brand_logo = res.data.cases[i].brand_logo
          console.log(res.data.cases[i].area_id)
          console.log(all_area[2].name)
          for(var j=0;j<all_area.length;j++){
            if (all_area[j].id == res.data.cases[i].area_id){
              case_info.area_name = all_area[j].name
              case_info.area_id = all_area[j].id
            }
          }
          for (var j = 0; j < all_price.length; j++) {
            if (all_price[j].id == res.data.cases[i].price_id) {
              case_info.price_name = all_price[j].name
              case_info.price_id = all_price[j].id
            }
          }
          for (var j = 0; j < all_house_style.length; j++) {
            if (all_house_style[j].id == res.data.cases[i].house_style_id) {
              case_info.house_style_name = all_house_style[j].name
              case_info.house_style_id = all_house_style[j].id
            }
          }
          cases.push(case_info)
        }
        console.log(cases)
        app.globalData.all_area = all_area
        app.globalData.all_price = all_price
        app.globalData.all_style = all_style
        app.globalData.all_house_style = all_house_style
        that.setData({
          all_area: all_area,
          all_price: all_price,
          all_style: all_style,
          all_house_style: all_house_style,
          cases: cases,
          colligate_cases:cases,
          colligate_case_more_flag: colligate_case_more_flag,
        })
      }
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
      console.log(res.currentTarget.dataset.case_id)
      var brand_id = res.currentTarget.dataset.case_id
      var cases = that.data.cases
      app.globalData.brand_detail_brand_id = cases[brand_id].brand_id
      console.log(app.globalData.brand_detail_brand_id)
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
        console.log(res.currentTarget.dataset.case_id)
        var case_id = res.currentTarget.dataset.case_id
        var cases=that.data.cases
        app.globalData.case_detail_case_id = cases[case_id].case_id
        console.log(app.globalData.case_detail_case_id)
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
  
  },
  /***登陆***/
  login_first: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log('用户允许获取信息')
        console.log(res)
        app.globalData.allow_login_flag = true;
        app.globalData.userInfo = res.userInfo
        wx.checkSession({
          success: function () {
            login.login_upload_session()
          },
          fail: function () {
            login.login_upload_code();
          }
        })
        that.setData({
          user_allow_login: true,
          user_wechat_info: res.userInfo
        })
      },
      fail: function () {
        app.globalData.allow_login_flag = false;
        that.setData({
          user_allow_login: false,
        })
        console.log('用户不允许获取信息')
      }
    })
  },
  get_new_case:function(page){
     var that=this
     var page=page
     var all_area = app.globalData.all_area
     var all_style = app.globalData.all_style
     var all_house_style = app.globalData.all_house_style
     var all_price = app.globalData.all_price
     var new_case_more_flag = that.data.new_case_more_flag
     wx.request({
       url: 'https://32906079.jxggdxw.com/api/v1/get_new_case/',
       method: 'GET',
       data: {
         'page': page
       },
       header: {
         'content-type': 'application/json'
       },
       success: function (res) {
         console.log(res)
         var cases = that.data.new_cases
         if(res.data.ret=='succ'){
           if (res.data.cases.length < 10) {
             new_case_more_flag = true
           }
           for (var i = 0; i < res.data.cases.length; i++) {
             var case_info = {}
             case_info.name = decodeURI(res.data.cases[i].case_name)
             case_info.brand_name = decodeURI(res.data.cases[i].brand_name)
             case_info.case_id = res.data.cases[i].case_id
             case_info.brand_id = res.data.cases[i].brand_id
             case_info.item_imgae_url = res.data.cases[i].item_image_url
             case_info.brand_logo = res.data.cases[i].brand_logo
             console.log(res.data.cases[i].area_id)
             console.log(all_area[2].name)
             for (var j = 0; j < all_area.length; j++) {
               if (all_area[j].id == res.data.cases[i].area_id) {
                 case_info.area_name = all_area[j].name
                 case_info.area_id = all_area[j].id
               }
             }
             for (var j = 0; j < all_price.length; j++) {
               if (all_price[j].id == res.data.cases[i].price_id) {
                 case_info.price_name = all_price[j].name
                 case_info.price_id = all_price[j].id
               }
             }
             for (var j = 0; j < all_house_style.length; j++) {
               if (all_house_style[j].id == res.data.cases[i].house_style_id) {
                 case_info.house_style_name = all_house_style[j].name
                 case_info.house_style_id = all_house_style[j].id
               }
             }
             cases.push(case_info)
           }
           console.log(cases)
           that.setData({
             cases:cases,
             new_cases:cases,
             new_case_more_flag: new_case_more_flag
           })
         }
       }
     })
  },
  get_hot_case: function (page) {
    var that = this
    var page = page
    var all_area = app.globalData.all_area
    var all_style = app.globalData.all_style
    var all_house_style = app.globalData.all_house_style
    var all_price = app.globalData.all_price
    var hot_case_more_flag = that.data.hot_case_more_flag
    wx.request({
      url: 'https://32906079.jxggdxw.com/api/v1/get_hot_case/',
      method: 'GET',
      data: {
        'page': page
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var cases = that.data.hot_cases
        if (res.data.ret == 'succ') {
          if (res.data.cases.length < 10) {
            hot_case_more_flag = true
          }
          for (var i = 0; i < res.data.cases.length; i++) {
            var case_info = {}
            case_info.name = decodeURI(res.data.cases[i].case_name)
            case_info.brand_name = decodeURI(res.data.cases[i].brand_name)
            case_info.case_id = res.data.cases[i].case_id
            case_info.brand_id = res.data.cases[i].brand_id
            case_info.item_imgae_url = res.data.cases[i].item_image_url
            case_info.brand_logo = res.data.cases[i].brand_logo
            console.log(res.data.cases[i].area_id)
            console.log(all_area[2].name)
            for (var j = 0; j < all_area.length; j++) {
              if (all_area[j].id == res.data.cases[i].area_id) {
                case_info.area_name = all_area[j].name
                case_info.area_id = all_area[j].id
              }
            }
            for (var j = 0; j < all_price.length; j++) {
              if (all_price[j].id == res.data.cases[i].price_id) {
                case_info.price_name = all_price[j].name
                case_info.price_id = all_price[j].id
              }
            }
            for (var j = 0; j < all_house_style.length; j++) {
              if (all_house_style[j].id == res.data.cases[i].house_style_id) {
                case_info.house_style_name = all_house_style[j].name
                case_info.house_style_id = all_house_style[j].id
              }
            }
            cases.push(case_info)
          }
          console.log(cases)
          that.setData({
            cases: cases,
            hot_cases: cases,
            hot_case_more_flag: hot_case_more_flag
          })
        }
      }
    })
  },
  get_colligate_case: function (page) {
    var that = this
    var page = page
    var all_area = app.globalData.all_area
    var all_style = app.globalData.all_style
    var all_house_style = app.globalData.all_house_style
    var all_price = app.globalData.all_price
    var colligate_case_more_flag = that.data.colligate_case_more_flag
    wx.request({
      url: 'https://32906079.jxggdxw.com/api/v1/get_colligate_case/',
      method: 'GET',
      data: {
        'page': page
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var cases = that.data.colligate_cases
        if (res.data.ret == 'succ') {
          if (res.data.cases.length < 10) {
            colligate_case_more_flag = true
          }
          for (var i = 0; i < res.data.cases.length; i++) {
            var case_info = {}
            case_info.name = decodeURI(res.data.cases[i].case_name)
            case_info.brand_name = decodeURI(res.data.cases[i].brand_name)
            case_info.case_id = res.data.cases[i].case_id
            case_info.brand_id = res.data.cases[i].brand_id
            case_info.item_imgae_url = res.data.cases[i].item_image_url
            case_info.brand_logo = res.data.cases[i].brand_logo
            console.log(res.data.cases[i].area_id)
            console.log(all_area[2].name)
            for (var j = 0; j < all_area.length; j++) {
              if (all_area[j].id == res.data.cases[i].area_id) {
                case_info.area_name = all_area[j].name
                case_info.area_id = all_area[j].id
              }
            }
            for (var j = 0; j < all_price.length; j++) {
              if (all_price[j].id == res.data.cases[i].price_id) {
                case_info.price_name = all_price[j].name
                case_info.price_id = all_price[j].id
              }
            }
            for (var j = 0; j < all_house_style.length; j++) {
              if (all_house_style[j].id == res.data.cases[i].house_style_id) {
                case_info.house_style_name = all_house_style[j].name
                case_info.house_style_id = all_house_style[j].id
              }
            }
            cases.push(case_info)
          }
          console.log(cases)
          that.setData({
            cases: cases,
            colligate_cases: cases,
            colligate_case_more_flag: colligate_case_more_flag
          })
        }
      }
    })
  },
  get_filter_case: function (filter_condition,page) {
    var that = this
    console.log(filter_condition)
    var page = page
    var all_area = app.globalData.all_area
    var all_style = app.globalData.all_style
    var all_house_style = app.globalData.all_house_style
    var all_price = app.globalData.all_price
    var filter_case_more_flag = that.data.filter_case_more_flag
    wx.request({
      url: 'https://32906079.jxggdxw.com/api/v1/get_condition_case/',
      method: 'GET',
      data: {
        'page': page,
        'area_id':filter_condition.area_id,
        'price_id': filter_condition.price_id,
        'style_id': filter_condition.style_id,
        'house_style_id': filter_condition.house_style_id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        var cases = that.data.filter_cases
        if (res.data.ret == 'succ') {
          if (res.data.cases.length<10){
            filter_case_more_flag=true
          }
          for (var i = 0; i < res.data.cases.length; i++) {
            var case_info = {}
            case_info.name = decodeURI(res.data.cases[i].case_name)
            case_info.brand_name = decodeURI(res.data.cases[i].brand_name)
            case_info.case_id = res.data.cases[i].case_id
            case_info.brand_id = res.data.cases[i].brand_id
            case_info.item_imgae_url = res.data.cases[i].item_image_url
            case_info.brand_logo = res.data.cases[i].brand_logo
            console.log(res.data.cases[i].area_id)
            console.log(all_area[2].name)
            for (var j = 0; j < all_area.length; j++) {
              if (all_area[j].id == res.data.cases[i].area_id) {
                case_info.area_name = all_area[j].name
                case_info.area_id = all_area[j].id
              }
            }
            for (var j = 0; j < all_price.length; j++) {
              if (all_price[j].id == res.data.cases[i].price_id) {
                case_info.price_name = all_price[j].name
                case_info.price_id = all_price[j].id
              }
            }
            for (var j = 0; j < all_house_style.length; j++) {
              if (all_house_style[j].id == res.data.cases[i].house_style_id) {
                case_info.house_style_name = all_house_style[j].name
                case_info.house_style_id = all_house_style[j].id
              }
            }
            cases.push(case_info)
          }
          console.log(cases)
          that.setData({
            cases: cases,
            filter_cases: cases,
            filter_case_more_flag: filter_case_more_flag
          })
        }
      }
    })
  }

})