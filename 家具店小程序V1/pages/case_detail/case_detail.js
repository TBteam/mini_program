// pages/case_detail/case_detail.js
var app=getApp()
var login = require('../../utils/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect_flag:false,
    brand_info:'',
    case_info:'',
    show_brand_info:false,
    enter_form_share:false
  },
  desinger_info: function () {
    wx.navigateTo({
      url: '../desinger_info/desinger_info',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  collect: function () {
    var that=this
    var case_info = that.data.case_info;
    var allow_login_flag = app.globalData.allow_login_flag
    console.log(allow_login_flag)
    var case_id = app.globalData.case_detail_case_id
    if (allow_login_flag){
      var user_id = app.globalData.user_id
      if (!case_info.collect){
          wx.request({
            url: 'https://furniture.jxggdxw.com/api/v1/collect_case/',
            method: 'GET',
            data: {
              'case_id': case_id,
              "user_id": user_id,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res)
              if(res.data.ret=='succ'){
                case_info.collect=true
                that.setData({
                  case_info: case_info
                })
              }
            }

          })
      }else{
        wx.request({
          url: 'https://furniture.jxggdxw.com/api/v1/cancle_collect_case/',
          method: 'GET',
          data: {
            'case_id': case_id,
            "user_id": user_id,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            if (res.data.ret == 'succ') {
              case_info.collect = false
              that.setData({
                case_info: case_info
              })
            }
          }

        })
      }
    }else{
      that.show_login()
      // wx.showToast({
      //   title: '请登陆',
      //   icon: 'none',
      //   duration: 1500
      // })
    }
  },
  enter_brand:function(){
    var brand_info=this.data.brand_info
    app.globalData.brand_detail_brand_id = brand_info.brand_id
    console.log(app.globalData.brand_detail_brand_id)
    wx.navigateTo({
      url: '../cate_info_test/cate_info_test',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    if (options.data) {
      var data = JSON.parse(options.data)
      console.log(data)
      app.globalData.case_detail_case_id = data.case_id
      that.setData({
        enter_form_share:true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    var brand_info={}
    var case_info={}
    var enter_form_share = that.data.enter_form_share
    console.log(app.globalData.case_detail_case_id)
    var case_id = app.globalData.case_detail_case_id
    if (enter_form_share){
      var show_brand_info=true
    }else{
      var show_brand_info = app.globalData.case_detail_is_show_brand_info
    }
    if (case_id == 0) {
      wx.redirectTo({
        url: '../home_page/home_page',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
     console.log(case_id)
     var allow_login_flag = app.globalData.allow_login_flag
     var user_id 
     if (allow_login_flag){
       user_id = app.globalData.user_id
     }else{
       user_id='none'
     }
     console.log(allow_login_flag)
     console.log(user_id)
     wx.request({
       url: 'https://furniture.jxggdxw.com/api/v1/get_case_detailed_info/',
       method: 'GET',
       data: {
         'case_id': case_id,
         'user_id': user_id
       },
       header: {
         'content-type': 'application/json'
       },
       success: function (res) {
         console.log(res)
         if(res.data.ret=='succ'){
           brand_info.brand_name = decodeURI(res.data.brand_name)
           brand_info.shop_name = decodeURI(res.data.brand_info.shop_name)
           brand_info.brand_logo = res.data.brand_info.logo
           brand_info.description = decodeURI(res.data.brand_info.description)
           brand_info.brand_id = res.data.brand_info.brand_id
           case_info.case_name = decodeURI(res.data.case_name)
           case_info.collect = res.data.collect
           case_info.case_basic_info = decodeURI(res.data.case_basic_info) 
           var case_pics = []
           for (var i = 0; i < res.data.case_infos.length; i++) {
             if (res.data.case_infos[i].style=='image'){
               var pic = {}
               pic.url = res.data.case_infos[i].url
               pic.style=false
               case_pics.push(pic)
             } if (res.data.case_infos[i].style == 'text') {
               var pic = {}
               pic.text = decodeURI(res.data.case_infos[i].text)
               pic.style = true
               case_pics.push(pic)
             }
           }
           case_info.infos = case_pics
           console.log(case_info)
           console.log(brand_info)
           that.setData({
             brand_info: brand_info,
             case_info: case_info,
             show_brand_info: show_brand_info
           })
           wx.showLoading({
             title: '加载中',
             mask: true
           })
           setTimeout(function () {
             wx.hideLoading()
           }, 2000)
         } else if (res.data.ret == 'fail') {
           wx.navigateBack({
             delta: 1
           })
         }
         

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
    var case_id = app.globalData.case_detail_case_id
    var data = { case_id: case_id }
    return {
      title: '案例详情',
      path: '/pages/case_detail/case_detail?data=' + JSON.stringify(data),
      success: function (res) {
        // 转发成功
        console.log(res)
        login.share_succ()
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  show_login:function(){
    wx.showModal({
      title: '请登录',
     // content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
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
                    login.Login()
                  },
                  fail: function () {
                    app.globalData.allow_login_flag = false;
                    console.log('用户不允许获取信息')
                  }

                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})