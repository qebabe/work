// pages/item/item.js
var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: "https://api.mhuaxia.com/",
    userInfo: {},
    wzid:"",
    comments:[],
    data: ">>>>",
    pageCount: 1,
    thisPage: 1,
    title: "",
    senddate: "",
    writer: "",
    click: "",
    wxParseData:[],
    xieLiuYan:{
      text:"写留言",
      a:false
    }
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
onLoad: function (params) {

    wx.showLoading({
      title: '加载中',
    })
    const _this = this
    console.log("文章ID：" + params.id);
    const apiUrl = _this.data.host+'api/getitem.php?id=' + params.id;
    //const apiUrl = 'https://qebsc.sinaapp.com/xcx/service.php?v=yanmagetitem&id=23';

    _this.setData({
      wzid: params.id
    })
    //console.log("当前页URL：" + apiUrl)
    //var that = this;

    //console.log(_this.data.data)

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      _this.setData({
        userInfo: userInfo
      })
    })
    wx.request({
      url: apiUrl,
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {

        var body = res.data[0].body.replace(/\/uploads/g, 'http://www.yantaimls.com/uploads');

        _this.setData({
          data: body ,
          //wxParseData: WxParse('html', body),
          title: res.data[0].title,
          senddate: res.data[0].senddate,
          click: res.data[0].click
        });
        //WxParse.wxParse('article', 'html', res.data[0].body, _this, 5);
        //console.log(res.data)
        wx.setNavigationBarTitle({
          title: _this.data.title
        })
        WxParse.wxParse('article', 'html', _this.data.data, _this, 0);
        wx.hideLoading();

      }
    })
    //console.log("2121221"+_this.data.data+"555")
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
getComments: function () {
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


    }
  })

},
  onReady: function () {
    this.getComments();

    
  
  },

  /**
   * 生命周期函数--监听页面显示
   */


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
    console.log('下拉刷新。')
    wx.stopPullDownRefresh()
  
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

  xieLiuYan: function () {
    console.log("写留言");
    const a = this.data.xieLiuYan.a;
    if (a){
    this.setData({
      xieLiuYan: {
        text:"写留言",
        a:false
      }
    })
    }else{
      this.setData({
        xieLiuYan: {
          text: "收起",
          a: true
        }
      })
    }
  },
  bindFormSubmit: function (e) {
    //console.log(e.detail);
    var formid = e.detail.formId;
    var body = e.detail.value.textarea;
    var wzid = this.data.wzid;
    var openid = this.data.userInfo.openid;
    var nickname = this.data.userInfo.userInfo.nickName;
    var img = this.data.userInfo.userInfo.avatarUrl;
    var wztitle = this.data.title;
    if(body!=""){
      wx.showLoading({
        title: '发布中...',
      })
      const that = this;
      const apiUrl = 'https://qebsc.sinaapp.com/xcx/service.php?v=sendComment';
      console.log("<发布留言开始；url：" + apiUrl);
      wx.request({
        url: apiUrl,
        data: {
          wzid:wzid,
          openid:openid,
          nickname:nickname,
          img:img,
          body:body,
          formid:formid,
          wztitle:wztitle
        },
        header: {
          'content-type': 'json'
        },
        success: function (res) {
          
          console.log(res.data)
          if (res.data.code=="0"){
          that.setData({
            xieLiuYan: {
              text: "写留言",
              a: false
            }
          });
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

  }



  , onShareAppMessage: function () {
    const that = this;
    var path = '/pages/yanma_item/yanma_item?id=' + this.data.wzid;
    return {
      title: that.data.title,
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