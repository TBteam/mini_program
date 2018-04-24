// pages/cate_info_test/cate_info_test.js
var app=getApp()
var login = require('../../utils/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top_flag:false,
    first_flag: true,
    all_good_flag: false,
    case_flag:false,
    new_good_flag: false,
    classfiy_flag:false,
    secne_flag: false,
    products:[],
    all_products:[],
    cases:[],
    brand_info:[],
    hot_products:[],
    new_products:[],
    shop_name:'',
    categorys:[],
    scenes:[],
    category_style:'',
    scene_style:'',
    all_good_more_flag:false,
    new_good_more_flag:false,
    case_more_flag:false,
    category_good_more_flag:false,
    scene_good_more_flag:false,
    category_good_page:0,
    scene_good_page:0,
    all_good_page: 0,
    new_good_page: 0,
    case_page:0,
    category_show_flag:false,
    scene_show_flag:false,
    cate_id:0,
    scene_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.data) {
      var data = JSON.parse(options.data)
      console.log(data)
      app.globalData.brand_detail_brand_id = data.brand_id
    }
    //app.globalDat
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    var brand_id = app.globalData.brand_detail_brand_id
    console.log(brand_id)
    if(brand_id==0){
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
    var all_products=[]
    var cases=[]
    var hot_products=[]
    var new_products=[]
    var categorys=[]
    var scenes=[]
    var brand_info=[]
    wx.request({
      url: 'https://furniture.jxggdxw.com/api/v1/get_brand_info/',
      method: 'GET',
      data: {
        'brand_id': brand_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if(res.data.ret=='succ'){
          if (res.data.all_products.length<10){
            var all_good_more_flag=true
          }else{
            var all_good_more_flag = false
          }
          for(var i=0;i<res.data.all_products.length;i++){
            var product={}
            product.product_name = decodeURI(res.data.all_products[i].product_name)
            product.product_price = decodeURI(res.data.all_products[i].product_price)  
            product.product_id = res.data.all_products[i].product_id
            product.item_image_url = res.data.all_products[i].product_item_url
            all_products.push(product)
          }
          for (var i = 0; i < res.data.hot_products.length; i++) {
            var product = {}
            product.product_name = decodeURI(res.data.hot_products[i].product_name)
            product.product_price = decodeURI(res.data.hot_products[i].product_price)
            product.product_id = res.data.hot_products[i].product_id
            product.item_image_url = res.data.hot_products[i].product_item_url
            hot_products.push(product)
          }
          if (res.data.new_products.length < 10) {
            var new_good_more_flag = true
          } else {
            var new_good_more_flag = false
          }
          for (var i = 0; i < res.data.new_products.length; i++) {
            var product = {}
            product.product_name = decodeURI(res.data.new_products[i].product_name)
            product.product_price = decodeURI(res.data.new_products[i].product_price)
            product.product_id = res.data.new_products[i].product_id
            product.item_image_url = res.data.new_products[i].product_item_url
            new_products.push(product)
          }
          for(var i=0;i<res.data.categorys.length;i++){
            var category={}
            category.category_name = decodeURI(res.data.categorys[i].category_name) 
            category.category_id = res.data.categorys[i].category_id
            categorys.push(category)
          }
          for (var i = 0; i < res.data.scenes.length; i++) {
            var scene = {}
            scene.scene_name = decodeURI(res.data.scenes[i].scene_name)
            scene.scene_id = res.data.scenes[i].scene_id
            scenes.push(scene)
          }
          for(var i=0;i<res.data.brand_info.length;i++){
            var brandinfo={}
            brandinfo.brand_image_url = res.data.brand_info[i].url
            brandinfo.brand_image_text = decodeURI(res.data.brand_info[i].text) 
            brand_info.push(brandinfo)
          }
          if (res.data.cases.length < 10) {
            var case_more_flag = true
          } else {
            var case_more_flag = false
          }
          for (var i = 0; i < res.data.cases.length; i++) {
            var case_info = {}
            case_info.name = decodeURI(res.data.cases[i].case_name)
            case_info.brand_name = decodeURI(res.data.cases[i].brand_name)
            case_info.case_id = res.data.cases[i].case_id
            case_info.brand_id = res.data.cases[i].brand_id
            case_info.item_imgae_url = res.data.cases[i].item_image_url
            case_info.brand_logo = res.data.cases[i].brand_logo
            case_info.area_name = decodeURI(res.data.cases[i].area_name)
            case_info.area_id = res.data.cases[i].area_id
            case_info.price_name = decodeURI(res.data.cases[i].price_name)
            case_info.price_id = res.data.cases[i].price_id
            case_info.house_style_name = decodeURI(res.data.cases[i].house_style_name)
            case_info.house_style_id = res.data.cases[i].house_style_id
            cases.push(case_info)
          }
          wx.setNavigationBarTitle({
            title: decodeURI(res.data.shop_name)
          })
          that.setData({
            all_products: all_products,
            cases: cases,
            brand_info: brand_info,
            hot_products: hot_products,
            new_products: new_products,
            categorys: categorys,
            scenes: scenes,
            products:hot_products,
            all_good_more_flag: all_good_more_flag,
            new_good_more_flag: new_good_more_flag,
            case_more_flag: case_more_flag,
          })
          console.log(all_products)
          console.log(cases)
          console.log(that.data.brand_info)
          console.log(that.data.hot_products)
          console.log(that.data.all_good_more_flag)
          console.log(that.data.case_more_flag)
          console.log(that.data.case_more_flag)
        }
        else if(res.data.ret=='fail'){
          wx.navigateBack({
            delta: 1
          })
        }
      }

    })
  },
  good_details_recommand_select: function (res) {
    console.log(res)
    var that = this;
    var all_products = that.data.all_products
    var hot_products = that.data.hot_products
    var new_products = that.data.new_products

    if (res.currentTarget.id == '1') {
      wx.pageScrollTo({
        scrollTop: 0
      })
      that.setData({
        first_flag: true,
        case_flag: false,
        all_good_flag: false,
        new_good_flag: false,
        classfiy_flag: false,
        secne_flag: false,
        category_show_flag: false,
        scene_show_flag: false,
        products:hot_products
      })
    }
    else if (res.currentTarget.id == '2') {
      wx.pageScrollTo({
        scrollTop: 0
      })
      
      that.setData({
        first_flag: false,
        case_flag: true,
        all_good_flag: false,
        new_good_flag: false,
        classfiy_flag: false,
        secne_flag: false,
        category_show_flag: false,
        scene_show_flag: false,
      })
    }
    else if (res.currentTarget.id == '3') {
      wx.pageScrollTo({
        scrollTop: 0
      })
      var categorys=that.data.categorys
      console.log(categorys.length)
      console.log(categorys)
      if(categorys.length<=5){
        console.log(categorys.length)
        var category_style='height:'+(79*categorys.length)+'rpx'
      }else{
        var category_style='height:440rpx'
      }
      var scenes=that.data.scenes
      console.log(scenes.length)
      console.log(scenes)
      if (scenes.length <= 4) {
        console.log(scenes.length)
        var scene_style = 'height:' + (79 * scenes.length) + 'rpx'
      } else {
        var scene_style = 'height:360rpx'
      }
      that.setData({
        first_flag: false,
        case_flag: false,
        all_good_flag: true,
        new_good_flag: false,
        classfiy_flag: false,
        secne_flag: false,
        category_show_flag: false,
        scene_show_flag: false,
        category_style: category_style,
        scene_style: scene_style,
        products: all_products
      })
    }
    else if (res.currentTarget.id == '4') {
      wx.pageScrollTo({
        scrollTop: 0
      })
      that.setData({
        first_flag: false,
        case_flag: false,
        all_good_flag: false,
        new_good_flag: true,
        classfiy_flag: false,
        secne_flag: false,
        category_show_flag: false,
        scene_show_flag: false,
        products: new_products
      })
    }
  },
  bottom_select: function (res) {
    console.log(res)
    var that = this;
    if (res.currentTarget.id == '1') {
      var classfiy_flag = !that.data.classfiy_flag
      that.setData({
        classfiy_flag: classfiy_flag,
        secne_flag: false,
      })
    }
    else if (res.currentTarget.id == '2') {
      var secne_flag = !that.data.secne_flag
      that.setData({
        classfiy_flag: false,
        secne_flag: secne_flag,
      })
    }
  },
  back_main:function(){
    var res = getCurrentPages()
    var flag = false;
    console.log(res)
    for (var i = 0; i < res.length; i++) {
      if (res[i].route == 'pages/main/main') {
        flag = true;
      }
    }
    if (flag) {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.redirectTo({
        url: '../main/main',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  about_store:function(){
    wx.navigateTo({
      url: '../about_store_detail/about_store_detail',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  bindtap: function (res) {
     console.log(res)
     var that=this
     var all_products=that.data.all_products
     var hot_products=that.data.hot_products
     var new_products=that.data.new_products
     var id = res.currentTarget.id
     if (res.currentTarget.dataset.product_style=='hot_product'){
       console.log('hot_product')
       console.log(id)
       app.globalData.good_detail_product_id=hot_products[id].product_id
     } else if (res.currentTarget.dataset.product_style == 'all_product') {
       console.log('all_product')
       console.log(id)
       app.globalData.good_detail_product_id = all_products[id].product_id
       console.log(all_products)
       console.log(app.globalData.good_detail_product_id)
     } else if (res.currentTarget.dataset.product_style == 'new_product') {
       console.log('new_product')
       console.log(id)
       app.globalData.good_detail_product_id = new_products[id].product_id
     }
    wx.navigateTo({
      url: '../good_details/good_details',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  case_detail:function(res){
      console.log(res)
      var that=this
      var cases = that.data.cases
      var id = res.currentTarget.id
      var case_id = cases[id].case_id
      console.log(case_id)
      app.globalData.case_detail_case_id = case_id
      app.globalData.case_detail_is_show_brand_info = false
      console.log(app.globalData.case_detail_case_id)
      wx.navigateTo({
        url: '../case_detail/case_detail',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
  },
  category_bintap:function(res){
    var that=this;
    var categorys = that.data.categorys
    var page=that.data.category_good_page
    console.log(res.currentTarget.id)
    var category_id=categorys[res.currentTarget.id].category_id
    if (that.data.category_show_flag && category_id==that.data.cate_id){
      that.setData({
        classfiy_flag: false,
        secne_flag: false,
      })
    }else{
      that.get_category_product(category_id, page)
      that.setData({
        classfiy_flag: false,
        secne_flag: false,
      })
    }
    
  },
  scene_bintap: function (res) {
    var that = this;
    var scenes = that.data.scenes
    var page = that.data.scene_good_page
    console.log(res.currentTarget.id)
    var scene_id = scenes[res.currentTarget.id].scene_id
    if (that.data.scene_show_flag && scene_id == that.data.scene_id) {
      that.setData({
        classfiy_flag: false,
        secne_flag: false,
      })
    } else {
      that.get_scene_product(scene_id, page)
      console.log(res)
      that.setData({
        classfiy_flag: false,
        secne_flag: false,
      })
    }
    
  },
  add_more:function(){
    var that=this
    var first_flag = that.data.first_flag
    var all_good_flag = that.data.all_good_flag
    var case_flag = that.data.case_flag
    var new_good_flag = that.data.new_good_flag

    var all_good_more_flag = that.data.all_good_more_flag
    var new_good_more_flag = that.data.new_good_more_flag
    var case_more_flag = that.data.case_more_flag
    var category_good_more_flag = that.data.category_good_more_flag
    var scene_good_more_flag = that.data.scene_good_more_flag

    var category_show_flag = that.data.category_show_flag
    var scene_show_flag = that.data.scene_show_flag
    // all_good_page: 0,
    //   new_good_page: 0,
    //     case_page:0,
    // category_good_page: 0,
    //   scene_good_page:0,
    if (all_good_flag && !category_show_flag && !scene_show_flag){
      if (!all_good_more_flag){
        var all_good_page = that.data.all_good_page+1
        that.get_all_product_next_page(all_good_page)
        that.setData({
          all_good_page: all_good_page
        })
        }
    } else if(all_good_flag && category_show_flag && !scene_show_flag){
      if (!category_good_more_flag) {
        var category_good_page = that.data.category_good_page + 1
        var cate_id = that.data.cate_id 
        that.get_category_product(cate_id,category_good_page)
        that.setData({
          category_good_page: category_good_page
        })
      }
    } else if (all_good_flag && !category_show_flag && scene_show_flag) {
      if (!scene_good_more_flag) {
        var scene_good_page = that.data.scene_good_page + 1
        var scene_id = that.data.scene_id 
        that.get_scene_product(scene_id,scene_good_page)
        that.setData({
          scene_good_page: scene_good_page
        })
      }
    }  else if (case_flag){
      console.log('case page')
      if (!case_more_flag){
        var case_page=that.data.case_page+1
        that.get_case_next_page(case_page)
        that.setData({
          case_page: case_page
        })
      }
    }else if (new_good_flag) {
      if (!new_good_more_flag) {
        var new_good_page = that.data.new_good_page + 1
        that.get_new_product_next_page(new_good_page)
        that.setData({
          new_good_page: new_good_page
        })
      }
    }
  },
  touchStart:function(res){
    console.log(res)
  },
  touchMove: function (res) {
    console.log(res)
  },
  touchEnd: function (res) {
    console.log(res)
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
  onPageScroll: function (res) {
    
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
  console.log('下拉触底')
  this.add_more()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var brand_id = app.globalData.brand_detail_brand_id
    var data={brand_id:brand_id}
    return {
      title: '品牌详情',
      path: '/pages/cate_info_test/cate_info_test?data=' + JSON.stringify(data),
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
  get_category_product: function (category_id,page){
    var that=this
    var page=page
    var cate_id=category_id
    var category_show_flag = that.data.category_show_flag
    if (category_show_flag && cate_id == that.data.cate_id){
      var products = that.data.products
    }else{
      products=[]
    }
    wx.request({
      url: 'https://furniture.jxggdxw.com/api/v1/get_product_of_cate/',
      method: 'GET',
      data: {
        'page': page,
        'cate_id': cate_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if(res.data.ret=='succ'){
          if (res.data.products.length<10){
             var category_good_more_flag=true
          }else{
            var category_good_more_flag = false
          }
          for (var i = 0; i < res.data.products.length; i++) {
            var product = {}
            product.product_name = decodeURI(res.data.products[i].product_name)
            product.product_price = decodeURI(res.data.products[i].product_price)
            product.product_id = res.data.products[i].product_id
            product.item_image_url = res.data.products[i].product_item_url
            products.push(product)
          }
          that.setData({
            products:products,
            category_show_flag:true,
            scene_show_flag: false, 
            cate_id: cate_id,
            category_good_more_flag: category_good_more_flag
          })
        }
      }
    })
  },
  get_scene_product: function (scene_id, page) {
    var that = this
    var page = page
    var scene_id = scene_id
    var products = []
    var scene_show_flag = that.data.scene_show_flag
    if (scene_show_flag && scene_id == that.data.scene_id) {
      var products = that.data.products
    } else {
      products = []
    }
    wx.request({
      url: 'https://furniture.jxggdxw.com/api/v1/get_product_of_scene/',
      method: 'GET',
      data: {
        'page': page,
        'scene_id': scene_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.ret == 'succ') {
          if (res.data.products.length < 10) {
            var scene_good_more_flag = true
          }else{
            var scene_good_more_flag = false
          }
          for (var i = 0; i < res.data.products.length; i++) {
            var product = {}
            product.product_name = decodeURI(res.data.products[i].product_name)
            product.product_price = decodeURI(res.data.products[i].product_price)
            product.product_id = res.data.products[i].product_id
            product.item_image_url = res.data.products[i].product_item_url
            products.push(product)
          }
          that.setData({
            products: products,
            scene_show_flag:true,
            category_show_flag:false,
            scene_id: scene_id,
            scene_good_more_flag: scene_good_more_flag
          })
          console.log(that.data.scene_good_more_flag)
        }
      }
    })
  },
  get_all_product_next_page:function(page){
     var that=this
     var page=page
     var products = that.data.all_products
     wx.request({
       url: 'https://furniture.jxggdxw.com/api/v1/get_all_product_next_page/',
       method: 'GET',
       data: {
         'page': page,
       },
       header: {
         'content-type': 'application/json'
       },
       success: function (res) {
         console.log(res)
         if (res.data.ret == 'succ') {
           if (res.data.products.length < 10) {
             var all_good_more_flag = true
           } else {
             var all_good_more_flag = false
           }
           for (var i = 0; i < res.data.products.length; i++) {
             var product = {}
             product.product_name = decodeURI(res.data.products[i].product_name)
             product.product_price = decodeURI(res.data.products[i].product_price)
             product.product_id = res.data.products[i].product_id
             product.item_image_url = res.data.products[i].product_item_url
             products.push(product)
           }
           that.setData({
             products: products,
             all_good_more_flag: all_good_more_flag,
             all_products:products
           })
         }
       }

     })
  },
  get_new_product_next_page: function (page) {
    var that = this
    var page = page
    var products = that.data.new_products
    wx.request({
      url: 'https://furniture.jxggdxw.com/api/v1/get_new_product_next_page/',
      method: 'GET',
      data: {
        'page': page,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.ret == 'succ') {
          if (res.data.products.length < 10) {
            var new_good_more_flag = true
          } else {
            var new_good_more_flag = false
          }
          for (var i = 0; i < res.data.products.length; i++) {
            var product = {}
            product.product_name = decodeURI(res.data.products[i].product_name)
            product.product_price = decodeURI(res.data.products[i].product_price)
            product.product_id = res.data.products[i].product_id
            product.item_image_url = res.data.products[i].product_item_url
            products.push(product)
          }
          that.setData({
            products: products,
            new_good_more_flag: new_good_more_flag,
            all_products: products
          })
        }
      }

    })
  },
  get_case_next_page: function (page) {
    var that = this
    var page = page
    var brand_id = app.globalData.brand_detail_brand_id
    var cases = that.data.cases
    wx.request({
      url: 'https://furniture.jxggdxw.com/api/v1/get_case_next_page/',
      method: 'GET',
      data: {
        'page': page,
        'brand_id': brand_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if(res.data.ret=='succ'){
          if (res.data.cases.length < 10) {
            var case_more_flag = true
          } else {
            var case_more_flag = false
          }
          for (var i = 0; i < res.data.cases.length; i++) {
            var case_info = {}
            case_info.name = decodeURI(res.data.cases[i].case_name)
            case_info.brand_name = decodeURI(res.data.cases[i].brand_name)
            case_info.case_id = res.data.cases[i].case_id
            case_info.brand_id = res.data.cases[i].brand_id
            case_info.item_imgae_url = res.data.cases[i].item_image_url
            case_info.brand_logo = res.data.cases[i].brand_logo
            case_info.area_name = decodeURI(res.data.cases[i].area_name)
            case_info.area_id = res.data.cases[i].area_id
            case_info.price_name = decodeURI(res.data.cases[i].price_name)
            case_info.price_id = res.data.cases[i].price_id
            case_info.house_style_name = decodeURI(res.data.cases[i].house_style_name)
            case_info.house_style_id = res.data.cases[i].house_style_id
            cases.push(case_info)
            that.setData({
              cases: cases,
              case_more_flag: case_more_flag
            })
          }
          console.log(cases)
        }
      }
    })
  }
})