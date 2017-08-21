//app.js


// {
//   "pagePath": "pages/yanma_bm/yanma_bm",
//   "iconPath": "images/note.png",
//   "selectedIconPath": "images/note-actived.png",
//   "text": "赛事报名"
// },
// {
//   "pagePath": "pages/yanma_search/yanma_search",
//   "iconPath": "images/search.png",
//   "selectedIconPath": "images/search-actived.png",
//   "text": "信息查询"
// },

// {
//   "pagePath": "pages/yanma_cjcx/yanma_cjcx",
//     "iconPath": "images/star.png",
//       "selectedIconPath": "images/star-actived.png",
//         "text": "成绩查询"
// },



//app.js
App({
  onLaunch: function () {

  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo || this.globalData.openid) {
      typeof cb == "function" && cb(this.globalData)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log("<code")
          console.log(res)
          console.log("code>")
          if (res.code) {
            //发起网络请求
            const url = 'https://qebsc.sinaapp.com/xcx/service.php?v=getopenid&js_code=' + res.code
            wx.request({
              url: url,
              success: function (ress) {
                console.log(url)
                console.log("<getopenid")
                console.log(ress.data)
                console.log("getopenid>")
                //console.log(ress.data)
                that.globalData.session_key = ress.data.session_key
                that.globalData.openid = ress.data.openid
                wx.getUserInfo({
                  success: function (res) {
                    console.log("<userinfo")
                    console.log(res)
                    console.log("userinfo>")
                    that.globalData.userInfo = res.userInfo;
                    typeof cb == "function" && cb(that.globalData)
                  }
                })
              }
            })

          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }
  },
  getTime: function (nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  },
  ZhuanFaTrue: function (openid,path) {
    const url = 'https://qebsc.sinaapp.com/xcx/service/ZhuanFaTrue.php?openid='+openid+"&path="+path;
    wx.request({
      url: url,
      success: function (ress) {
        //console.log(url)
        console.log("<ZhuanFaTrue")
        console.log(ress.data)
        console.log("ZhuanFaTrue>")
        wx.showToast({
          title: ress.data.Msg,
          icon: 'success',
          duration: 2000
        })

      }
    })
    
  },
  globalData: {
    userInfo: null,
    session_key: null,
    openid: null
  }
})