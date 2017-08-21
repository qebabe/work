// pages/yanma_yundong/yanma_yundong.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    shareTickets: "",
    stepInfoList: {},
    myStep:"",
    sfxs:false
  },
  getWeRunData: function () {

    const that = this;

    if (wx.getWeRunData) {
    wx.getWeRunData({
      success(res) {
        const encryptedData = res.encryptedData
        const iv = res.iv
        console.log(res)
        const url = 'https://qebsc.sinaapp.com/xcx/service.php?v=getWeRunData';
        wx.request({
          url: url,
          data: {
            sessionKey: that.data.userInfo.session_key,
            openid: that.data.userInfo.openid,
            nickName: that.data.userInfo.userInfo.nickName,
            avatarUrl: that.data.userInfo.userInfo.avatarUrl,
            iv: iv,
            encryptedData: encryptedData
          },
          success: function (ress) {
            console.log(url)
            console.log("<encryptedData")
            console.log(ress.data)
            console.log("encryptedData>")
            //console.log(ress.data)
            that.setData({
              stepInfoList: ress.data.todayphb,
              myStep: ress.data.mystep,
              sfxs: ress.data.sfxs
            })
            wx.stopPullDownRefresh()
            wx.hideLoading()
            //stepInfoList

          }
        })
      },
      fail: function (ress) {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '请打开微信运动步数开关，若没有则您的手机暂不支持。',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
        wx.openSetting({
          success: (res) => {
            console.log(res)


                  wx.getSetting({
                    success(res) {
                      if (!res['scope.werun']) {
                        wx.authorize({
                          scope: 'scope.werun',
                          success() {
                            console.log("已授权");
                            that.getWeRunData();
                          },
                          fail() {
                            console.log("未授权");
                            //that.getWeRunData();
                            wx.showModal({
                              title: '提示',
                              content: '当前无权获取到您的微信步数。',
                              showCancel: false
                            })
                          }
                        })
                      }
                    },
                    fail(res) {

                    }
                  })





          }
        })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

      }
    })
    } else {
      wx.hideLoading()
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法获取微信运动数据，请升级到最新微信版本后重试。'
      })
    }



  },

  shiFouXianShiCJ: function (e) {
    const that = this;

    console.log('switch1 发生 change 事件，携带值为', e.detail.value)

    if (e.detail.value){
        var shifouxianshi="1"
    }
    else{
      var shifouxianshi = "0"

    }


    const url = 'https://qebsc.sinaapp.com/xcx/service.php?v=setshifouxianshichengji';
    wx.request({
      url: url,
      data: {
        shifouxianshi: shifouxianshi,
        openid: that.data.userInfo.openid
      },
      success: function (ress) {
        console.log(url)
        console.log("<encryptedData")
        console.log(ress.data)
        console.log("encryptedData>")
        that.setData({
          stepInfoList: ress.data.todayphb,
          //myStep: ress.data.mystep
        })
      }
    })










  },
  /**
   * 生命周期函数--监听页面加载
   */
   zan:function(e){
     const that = this;
     var id = e.currentTarget.dataset.id;

     var idx = e.currentTarget.dataset.idx;
     console.log("id:"+id);
     console.log("idx:" + idx);
     let index = 0

     const ifzan = that.data.stepInfoList[idx].ifzan
     //ifzan = !ifzan;

     const url = 'https://qebsc.sinaapp.com/xcx/service/zan.php';
     wx.request({
       url: url,
       data:{
         id:id,
         ifzan:!ifzan,
         openid:that.data.userInfo.openid
       },
       success: function (ress) {
         console.log(url)
         console.log("<ifzan")
         console.log(ress.data)
         console.log("ifzan>")
         that.setData({
           [`stepInfoList[${idx}].ifzan`]: !ifzan,
           [`stepInfoList[${idx}].zan`]: ress.data.zan
         })

         
        //  that.setData({
        //    stepInfoList: ress.data.todayphb,
        //    //myStep: ress.data.mystep
        //  })
       }
     })







   },




  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '今日运动排行榜'
    })
    wx.showLoading({
      title: '加载中',
    })

    wx.showShareMenu({
      withShareTicket: true
    })
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      that.getWeRunData();
    })
    //wx.hideLoading();
    //wx.stopPullDownRefresh()

 
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
    const that = this;
    wx.showLoading({
      title: '加载中',
    })
    that.getWeRunData();
    // var url = "yanma_yundong";
    // console.log("页面重新加载")
    // wx.reLaunch({
    //   url: url
    // })
  
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
    var path = '/pages/yanma_yundong/yanma_yundong';
    return {
      title: '我今天走了' + this.data.myStep + "步，快来和我比试一下！",
      path: path,
      success: function (res) {
        console.log(res);
        app.ZhuanFaTrue(that.data.userInfo.openid, path);
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})