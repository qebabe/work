var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    host:"https://api.mhuaxia.com/api/yunjiu/index.php",
    art: {},
    cataList:""
  },
  onReady () {
    var that = this;

  },
  onLoad (options) {
    wx.showLoading({
      title: '努力加载中...',
    })
    var that = this
    var url = that.data.host+"?v=getDetail&id="+options.id;
    console.log("url:"+url);
    wx.request({
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
        if (res.data.body) {
          var body = res.data.body;
          WxParse.wxParse('article', 'html', body, that, 5);
        }
        console.log(res.data);
        that.setData({
          id:options.id,
          cataList:res.data.cataList,
          [`art.title`]: res.data.title,
          [`art.image`]: res.data.image,
          [`art.time`]: res.data.time,
          [`art.zuozhe`]: res.data.zuozhe,
          [`art.image_source`]: res.data.image_source
        })
        wx.setNavigationBarTitle({
          title: that.data.art.title
        })
        wx.hideLoading();
      }
    })
  },
    onShareAppMessage: function () {
    const that = this;
    var path = '/pages/detail/detail?id='+that.data.id;
    return {
      title: that.data.art.title,
      path: path,
      success: function (res) {
        //app.ZhuanFaTrue(that.data.userInfo.openid, path);
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }

  },
  goTop:function(){
    wx.pageScrollTo({
      scrollTop: 0
    })
  }
})