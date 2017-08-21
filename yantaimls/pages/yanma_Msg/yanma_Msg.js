// pages/yanma_Msg/yanma_Msg.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    Msg:{}
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '消息中心'
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
      that.getMsg();
      
    })
  
  },
  getMsg:function(){
    const that = this;
    const apiUrl = 'https://qebsc.sinaapp.com/xcx/service/getMsg.php?v=getMsg&openid=' + that.data.userInfo.openid;
    console.log("当前页URL：" + apiUrl)
    wx.request({
      url: apiUrl,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        //console.log("历史数据：")
        //console.log(hisData)

        that.setData({
          Msg: res.data
        });
        wx.hideLoading();
        console.log("<getMsg")
        console.log(res.data)
        console.log("getMsg>")

      }
    })
  },
  yue: function(event){
    const that = this;
    var msgId = event.target.dataset.id;
    const apiUrl = 'https://qebsc.sinaapp.com/xcx/service/getMsg.php?v=yue&openid=' + that.data.userInfo.openid + "&msgid=" + msgId;
    console.log("当前页URL：" + apiUrl)
    wx.request({
      url: apiUrl,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        //console.log("历史数据：")
        //console.log(hisData)

        that.setData({
          Msg: res.data
        });
        wx.hideLoading();
        console.log("<getMsg")
        console.log(res.data)
        console.log("getMsg>")

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
  
  }
})