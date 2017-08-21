// pages/yanma_liuyanban/yanma_liuyanban.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    openid: "",
    comments: [],
    data: ">>>>",
    senddate: "",
    wzid:"0000"
    
  
  },
  bindFormSubmit: function (e) {
    //console.log(e.detail);
    var formid = e.detail.formId;
    var body = e.detail.value.textarea;
    var wzid = this.data.wzid;
    var openid = this.data.userInfo.openid;
    var nickname = this.data.userInfo.userInfo.nickName;
    var img = this.data.userInfo.userInfo.avatarUrl;
    var wztitle = "留言板";
    if (body != "") {
      wx.showLoading({
        title: '发布中...',
      })
      const that = this;
      const apiUrl = 'https://qebsc.sinaapp.com/xcx/service.php?v=sendComment';
      console.log("<发布留言开始；url：" + apiUrl);
      wx.request({
        url: apiUrl,
        data: {
          wzid: wzid,
          openid: openid,
          nickname: nickname,
          img: img,
          body: body,
          formid: formid,
          wztitle: wztitle
        },
        header: {
          'content-type': 'json'
        },
        success: function (res) {

          console.log(res.data)
          if (res.data.code == "0") {
            
            //wx.hideLoading();
            wx.showToast({
              title: '留言成功！\n等待审核',
              icon: 'success',
              duration: 2000
            })

            console.log("发布留言结束>");
          }

        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '烟马留言板'
    })
    var that = this
    wx.showShareMenu({
      withShareTicket: true
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
      wx.hideLoading();
    })

    console.log('onLoad')

  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */  
  getComments: function () {
    wx.showLoading({
      title: '刷新...',
    })
    const that = this;
    const apiUrl = 'https://qebsc.sinaapp.com/xcx/service.php?v=getcomments&wzid=' + that.data.wzid;
    console.log("<加载留言开始；url：" + apiUrl);
    wx.request({
      url: apiUrl,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {

        that.setData({
          comments: res.data,

        });
        console.log(res.data)

        console.log("加载留言结束>");
        wx.stopPullDownRefresh();
        wx.hideLoading()


      }
    })

  },
  onReady: function () {
    
    this.getComments();
  
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
    this.getComments();
  
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
    const that = this;
    var path = '/pages/yanma_liuyanban/yanma_liuyanban';
    return {
      title: '烟马留言板,有什么话想和我说？',
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