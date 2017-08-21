//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    host:"https://api.mhuaxia.com/",
    userInfo: {},
    openid:"",
    userData:{
      point:"--",
      level:"1级",
      gonggao:"下拉刷新数据",
      Msg:0
    },
    textList:[],
    pageCount: 0,
    thisPage: 1,
    qian : true,
    slideData: []
  },
 
  onLoad: function () {
    var that = this
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.setNavigationBarTitle({
          title: "烟台的马拉松"
        })

    wx.showLoading({
      title: '加载中',
    })

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      that.getUserData();

      //
    })

    console.log('onLoad')

    const _this = this
    //const apiUrl = 'https://qebsc.sinaapp.com/xcx/service.php?v=yanmagetlist&page=' + _this.data.thisPage;
    const apiUrl = _this.data.host+'api/json1.php?page=' + _this.data.thisPage;
    //console.log("当前页URL：" + apiUrl)
    wx.request({
      url: apiUrl,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {

        console.log("<pageData")
        console.log(res)
        console.log("pageData>") 

        _this.setData({
          textList: res.data.list,
          //textList: res.data,
          slideData: res.data.slide,
          pageCount: res.data.pageCount,
          thisPage: res.data.thisPage,

        });
        wx.hideLoading();

        //console.log(res.data)

      }
    })

  },
  onShow: function () {
    this.getUserData();


  },


  onReady: function () {
    //console.log("page ready!")
    //this.getUserData();




  },
  loadMore: function(){
    const _this = this
    var nextPage = parseInt(_this.data.thisPage) + 1
    const hisData = _this.data.textList;
    //const apiUrl = 'https://qebsc.sinaapp.com/xcx/service.php?v=yanmagetlist&page=' + nextPage;
    const apiUrl = _this.data.host+'api/json1.php?page=' + nextPage;
    //console.log("当前页URL：" + apiUrl)
    wx.request({
      url: apiUrl,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        //console.log("历史数据：")
        //console.log(hisData)
        console.log("<pageData")
        console.log(res)
        console.log("pageData>") 

        _this.setData({
          textList: hisData.concat(res.data.list),
          slideData: res.data.slide,
          pageCount: res.data.pageCount,
          thisPage: res.data.thisPage,

        });

        //console.log(res.data)

      }
    })
  },
  cjcx: function () {
    // wx.showModal({
    //   title: '成绩查询',
    //   content: '2017烟台国际马拉松成绩查询暂未开放！',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    wx.navigateTo({
      url: '../yanma_cjcx/yanma_cjcx'
    })
  },
  ssbm: function () {
    // wx.showModal({
    //   title: '赛事报名',
    //   content: '暂未开放！',

    // })
    wx.navigateTo({
      url: '../yanma_ucenter/yanma_userdata/yanma_userdata'
    })
  },
  xxcx: function () {
    wx.showModal({
      title: '信息查询',
      content: '暂未开放！',

    })
    // wx.navigateTo({
    //   url: '../yanma_cjcx/yanma_cjcx'
    // })
  },
  onPullDownRefresh: function () {

    console.log('下拉刷新。')
    wx.showLoading({
      title: '页面刷新...',
    })
    
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    const _this = this
    //const apiUrl = 'https://qebsc.sinaapp.com/xcx/service.php?v=yanmagetlist&page=1';
    const apiUrl = _this.data.host+'api/json1.php?page=1';
    //console.log("当前页URL：" + apiUrl)
    wx.request({
      url: apiUrl,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {

        _this.setData({
          textList: res.data.list,
          slideData: res.data.slide,
          pageCount: res.data.pageCount,
          thisPage: res.data.thisPage,

        });
        
        _this.getUserData();
        wx.hideLoading();
        wx.stopPullDownRefresh()

        //console.log(res.data)

      }
    })


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const _this = this

    if (_this.data.pageCount != _this.data.thisPage){
      wx.showLoading({
        title: '加载中',
      })
    var nextPage = parseInt(_this.data.thisPage) + 1
    const hisData = _this.data.textList;
    const apiUrl = _this.data.host+'api/json1.php?page=' + nextPage;
    //console.log("当前页URL：" + apiUrl)
    wx.request({
      url: apiUrl,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        //console.log("历史数据：")
        //console.log(hisData)
        console.log("<pageData")
        console.log(res)
        console.log("pageData>")  
        _this.setData({
          textList: hisData.concat(res.data.list),
          slideData: res.data.slide,
          pageCount: res.data.pageCount,
          thisPage: res.data.thisPage,

        });
        
        wx.hideLoading();


      }
    })
    //_this.getUserData();
}

  },

  qiandao:function(){
    const that = this
    that.setData({
      qian:true 
    });

        //console.log("openid:"+res.data)
    var openid = that.data.userInfo.openid;
        const apiUrl = 'https://qebsc.sinaapp.com/xcx/service.php?v=qian';
        console.log("当前页URL：" + apiUrl)
        var myDate = new Date();
        var Y = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        var M = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        var D = myDate.getDate(); //获取当前日(1-31)
        var date = "" + Y + M + D
        wx.request({
          url: apiUrl,
          data: {
            openid: openid,
            point: that.data.userData.point,
            qianTime: date,
            level: that.data.userData.level
          },
          header: {
            'content-type': 'json'
          },
          success: function (res) {

            console.log(res.data)
            var msg = res.data.Msgg;
            that.setData({
              userData: res.data
            });
            wx.showToast({
              title: msg,
              icon: 'success',
              duration: 1000
            })

            //console.log(res.data)

          }
        })


  },
  getUserData: function () {
    const _this = this
    var userinfoo = _this.data.userInfo.userInfo.nickName + "|" + _this.data.userInfo.userInfo.gender + "|" + _this.data.userInfo.userInfo.language + "|" + _this.data.userInfo.userInfo.city + "|" + _this.data.userInfo.userInfo.province + "|" + _this.data.userInfo.userInfo.country + "|" + _this.data.userInfo.userInfo.avatarUrl;
    const apiUrl = 'https://qebsc.sinaapp.com/xcx/service.php?v=getUserData&openid=' + _this.data.userInfo.openid + "&userinfo=" + userinfoo;
    console.log("当前页URL：" + apiUrl)
    wx.request({
      url: apiUrl,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        //console.log(res.data)
        if(res.data){
        var myDate = new Date();
        var Y = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        var M = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        var D = myDate.getDate(); //获取当前日(1-31)
        var date = "" + Y + M + D
        console.log("DATE:" + date)

        console.log("DATE1:" + res.data.qianTime)

        if (date == res.data.qianTime) {
          //const qian=true
          _this.setData({
            userData: res.data,
            qian: true
          });
        }
        else {
          //const qian = false
          _this.setData({
            userData: res.data,
            qian: false
          });
        }
        console.log(res.data)

      }
      }
    })
  },
  onShareAppMessage: function () {
    const that = this;
    var path = '/pages/yanma/yanma';
    return {
      title: '我有' + this.data.userData.point + "积分，快来签到吧！",
      path: path,
      success: function (res) {
        app.ZhuanFaTrue(that.data.userInfo.openid,path);
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

})
