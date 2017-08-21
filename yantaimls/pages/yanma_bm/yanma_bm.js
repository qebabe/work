// pages/yanma_bm/yanma_bm.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;

Page({

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindXueXingChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      xueXing: e.detail.value
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    address:"",
    date:"1991-01-03",
    xueXingArray: ['A', 'B', 'AB', 'O'],
    xueXing:"B"
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'SA7BZ-LVM3I-XSEG3-5M5Q7-DWIS5-CZB7E'
    });
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getAddrss()
  
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  getAddrss: function () {
    const that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log("latitude:" + latitude);
        console.log("longitude:" + longitude);
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res);
            var city = res.result.ad_info.city;
            var province = res.result.ad_info.province;
            var district = res.result.ad_info.district;
            var name = res.result.ad_info.name;
            that.setData({
              address: name
            })
          },
          fail: function (res) {
            console.log(res.result.ad_info.city);
          }
        });
      }
    })
  }
})