// pages/yanma_cjcx/yanma_cjcx.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    title:"2016烟台国际马拉松成绩查询>>",
    idnumber:"",
    istrue :false,
    userData:{}
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.showLoading({
      title: '加载中',
    })
    app.getUserInfo(function (userInfo) {
      //更新数据
      _this.setData({
        userInfo: userInfo
      })
    })

    
    const apiUrl = 'https://qebsc.sinaapp.com/xcx/service.php?v=yanma_get_cxcj_title'
    console.log("当前页URL：" + apiUrl)
    wx.request({
      url: apiUrl,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res)
        _this.setData({
          title: res.data.title,
        });
      }
      })
        wx.hideLoading();

  },
  onPullDownRefresh: function () {
    console.log('下拉刷新。')
    wx.stopPullDownRefresh()

  },
  idnumberInput: function (e) {
    this.setData({
      istrue :false,
      idnumber: e.detail.value
    })
  },
  chaxun:function(){
    console.log('点击查询')
    wx.showLoading({
      title: '加载中',
    })
    const _this = this
    const idnumber = this.data.idnumber
    var openid = this.data.userInfo.openid


    if (idnumber){
    const apiUrl = 'https://qebsc.sinaapp.com/xcx/service.php?v=yanma_cxcj&idnumber=' + idnumber +'&openid='+openid

    console.log("当前页URL：" + apiUrl)
    wx.request({
      url: apiUrl,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res.data)
        const istrue = res.data.code
        if(!istrue){
          wx.showModal({
            title: '提示',
            content: res.data.Msg,
          })

        }
        else{
        _this.setData({
          istrue: res.data.code,
          userData: res.data.userData
        });
        }
      }
    })
    }
    wx.hideLoading();
  },
  onShareAppMessage: function () {
    const that = this;
    var path = '/pages/yanma_cjcx/yanma_cjcx';
    return {
      title: that.data.title,
      path: path,
      success: function (res) {
        app.ZhuanFaTrue(that.data.userInfo.openid, path);
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})