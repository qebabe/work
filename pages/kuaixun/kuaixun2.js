// pages/kuaixun/kuaixun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host:"https://api.mhuaxia.com/api/yunjiu/index.php",
    list: "",
    canload:true,

    page:0,
    pageSize:10,
    pageCount:1,
    showDate:""

  },
  zksq:function(e){
    console.log(e);
    const that =this;
    var ActionData = e.currentTarget.dataset;

    var idxx = ActionData.idxx;

    that.setData({
          [`list[${idxx}].data.show`]: !that.data.list[idxx].data.show
        })
  },
    getkx:function(){
        wx.showLoading({
      title: '努力加载中...',
    })
    const that = this
    var pageSize=that.data.pageSize;
    var url =that.data.host+'?v=getkx&page=1&pageSize='+pageSize;
    console.log(url);
    wx.request({
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
        console.log(res.data);
        if(res.data.msg=="ok"){
         that.setData({
          page: res.data.page,
          pageSize:res.data.pageSize,
          pageCount:res.data.pageCount,
          list: res.data.list,
          canload:true
         })
       }
       else{
        // that.setData({
        //   page: "0"
        //  })
        // that.getMoreKx();
       }
         wx.hideLoading();
         wx.stopPullDownRefresh()
      }
    })
    this.index = 1
  },
  getMoreKx:function(){

      const that = this
      var page=that.data.page;
      var pageCount =that.data.pageCount;
      if(page==pageCount){
        return;
      }
      console.log("loadMore...")

      var page=that.data.page;
      var pageCount =that.data.pageCount;

        wx.showLoading({
      title: '努力加载中...',
    })

    var nextPage = parseInt(page) + 1;
     var pageSize=that.data.pageSize;
    var url =that.data.host+'?v=getkx&page='+nextPage+'&pageSize='+pageSize;
    console.log(url);
    wx.request({
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
        console.log(res.data);
        if(res.data.msg=="ok"){
         that.setData({
          page: res.data.page,
          pageSize:res.data.pageSize,
          pageCount:res.data.pageCount,
          list: that.data.list.concat(res.data.list),
          canload:true
         })
       }
       else{
        that.setData({
          canload: false
         })
       }
         wx.hideLoading();
         wx.stopPullDownRefresh()
      }
    })
    this.index = 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getkx();
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
    this.getkx();
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMoreKx();
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})