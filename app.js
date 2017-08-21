//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})


  // "tabBar": {
  //   "color": "#353535",
  //   "selectedColor": "#3cc51f",
  //   "borderStyle": "white",
  //   "backgroundColor": "#ffffff",
  //   "list": [{
  //     "pagePath": "pages/index/index",
  //     "iconPath": "images/icon_API.png",
  //     "selectedIconPath": "images/icon_API_HL.png",
  //     "text": "主页"
  //   }, {
  //     "pagePath": "pages/theme/theme",
  //     "iconPath": "images/icon_component.png",
  //     "selectedIconPath": "images/icon_component_HL.png",
  //     "text": "主题日报"
  //   }]
  // },


   // {
   //    "pagePath": "pages/shipin/shipin",
   //    "iconPath": "images/video.png",
   //    "selectedIconPath": "images/video_h.png",
   //    "text": "视频"
   //  }, 