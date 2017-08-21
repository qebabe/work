// pages/yanma_jifen/yanma_jifen.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    jifen:{}
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的积分'
    })
    wx.showLoading({
      title: '加载中',
    })
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      that.getPoint();
    })
  
  },
  getPoint:function(){
    const that = this;
    const url = 'https://qebsc.sinaapp.com/xcx/service/getPoint.php?v=getPoint';
    wx.request({
      url: url,
      data: {
        openid: that.data.userInfo.openid
      },
      success: function (ress) {
        console.log(url)
        console.log("<getPoint")
        console.log(ress.data)
        console.log("encryptedData>")
        //console.log(ress.data)
        that.setData({
          jifen: ress.data,
        })
        wx.hideLoading()
        //stepInfoList

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