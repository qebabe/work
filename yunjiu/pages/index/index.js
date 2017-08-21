//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    host:"https://api.mhuaxia.com/api/yunjiu/index.php",
    list: [],
    duration: 800,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false,
    page:0,
    pageSize:10,
    pageCount:1
  },
  //事件处理函数
  bindViewTap(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  loadMore (e) {
     const that = this
      var page=that.data.page;
      var pageCount =that.data.pageCount;
      if(page==pageCount){
        return;
      }
      console.log("loadMore...")
        wx.showLoading({
      title: '努力加载中...',
    })

    var pageSize=that.data.pageSize;

    var nextPage = parseInt(page) + 1;
    var url =that.data.host+'?v=getList&page='+nextPage+'&pageSize='+pageSize;
    console.log(url);
    wx.request({
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
        console.log(res.data);
         that.setData({
          page: res.data.page,
          pageSize:res.data.pageSize,
          pageCount:res.data.pageCount,
          loading: false,
           list: that.data.list.concat(res.data.stories)
         })
      }
    })
    wx.hideLoading();
    wx.stopPullDownRefresh();
  },
  getNextDate (){
    const now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  onLoad () {
    this.getList();
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  },
  getList:function(){
        wx.showLoading({
      title: '努力加载中...',
    })
    const that = this
    var pageSize=that.data.pageSize;
    wx.request({
      url: that.data.host+'?v=getList&page=1&pageSize='+pageSize,
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
        console.log(res.data);
         that.setData({
          page: res.data.page,
          pageSize:res.data.pageSize,
          pageCount:res.data.pageCount,
          banner: res.data.top_stories,
          list: res.data.stories
         })
         wx.hideLoading();
         wx.stopPullDownRefresh()
      }
    })
    this.index = 1
  },
  onPullDownRefresh: function () {
    console.log('下拉刷新。')
    this.getList();
  },
    onReachBottom: function () {
    this.loadMore();
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
