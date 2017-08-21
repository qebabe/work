// pages/yanma_quan/yanma_quan/yanma_quan.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    quanData: [],
    host: "https://api.mhuaxia.com/",
    userInfo: {},
    count:0,
    jrht:"",
    pageCount: 0,
    thisPage: 1,
    actionSheetHidden: true,
    actionSheetItems: ['赞', '评论'],
    ActionData:"",
    showModalStatus: false,
    shua:false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  getYanmaQuanData: function (page) {
    const that = this
      wx.showLoading({
        title: '加载中',
      })
    const apiUrl = 'https://qebsc.sinaapp.com/xcx/service.php?v=getYanmaQuanData&page=' + page;
    //const apiUrl = _this.data.host + 'api/json1.php?page=' + nextPage;
    //console.log("当前页URL：" + apiUrl)
    wx.request({
      url: apiUrl,
      data: {
        openid: that.data.userInfo.openid
      },
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log("<pageData")
        console.log(res)
        console.log("pageData>")
        wx.stopPullDownRefresh()
        var oldquanData = that.data.quanData;
        that.setData({
          count: res.data.count,
          quanData: res.data.quanData,
          pageCount: res.data.pageCount,
          thisPage: res.data.thisPage,
          pageSize: res.data.pageSize,
          jrht:res.data.jrht
        });
        wx.hideLoading();
        //console.log(res.data)
      }
    })
  },
  getYanmaQuanData1: function (page) {
    const that = this
    wx.showLoading({
      title: '加载中',
    })
    const apiUrl = 'https://qebsc.sinaapp.com/xcx/service.php?v=getYanmaQuanData&page=' + page;
    //const apiUrl = _this.data.host + 'api/json1.php?page=' + nextPage;
    //console.log("当前页URL：" + apiUrl)
    wx.request({
      url: apiUrl,
      data: {
        openid: that.data.userInfo.openid
      },
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log("<pageData")
        console.log(res)
        console.log("pageData>")
        wx.stopPullDownRefresh()
        var oldquanData = that.data.quanData;
        that.setData({
          quanData: oldquanData.concat(res.data.quanData),
          count: res.data.count,
          pageCount: res.data.pageCount,
          thisPage: res.data.thisPage,
          pageSize: res.data.pageSize
        });
        wx.hideLoading();
        //console.log(res.data)
      }
    })
  },

  listenerButton: function (e) {
    console.log(e);
    var ActionData = e.currentTarget.dataset;
    this.setData({
      //取反
      actionSheetHidden: !this.data.actionSheetHidden,
      ActionData: ActionData
    });
  },

  listenerActionSheet: function () {
    this.sheet();
  },
  zan:function(){
    this.sheet();
    var ActionData = this.data.ActionData;
    //var nickname = this.data.ActionData.nickname;

    console.log("赞了", ActionData);

    const that = this;
    var id = this.data.ActionData.id;

    var idx = this.data.ActionData.idx;
    console.log("id:" + id);
    console.log("idx:" + idx);
    let index = 0

    const ifzan = that.data.quanData[idx].ifzan
    //ifzan = !ifzan;

    const url = 'https://qebsc.sinaapp.com/xcx/service/quanzan.php';
    wx.request({
      url: url,
      data: {
        id: id,
        ifzan: !ifzan,
        openid: that.data.userInfo.openid,
        nickName: that.data.userInfo.userInfo.nickName,

      },
      success: function (ress) {
        console.log(url)
        console.log("<ifzan")
        console.log(ress.data)
        console.log("ifzan>")
        that.setData({
          [`quanData[${idx}].ifzan`]: !ifzan,
          [`quanData[${idx}].zan`]: ress.data.nickNameList
        })

      }
    })
  },
  pinglun:function(){
    this.util("open");
    this.sheet();

  },
  sheet:function(){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  cancel: function (e) {
    this.util("close")
  },
  bindFormSubmit: function (e) {

    console.log(e.detail);
    var formid = e.detail.formId;
    var pinglunData = e.detail.value.pinglunData;
    this.util("close");
    var ActionData = this.data.ActionData;
    //var nickname = this.data.ActionData.nickname;

    //console.log("赞了", ActionData);

    const that = this;
    var id = this.data.ActionData.id;

    var idx = this.data.ActionData.idx;
    console.log("id:" + id);
    console.log("idx:" + idx);
    let index = 0

    //const ifzan = that.data.quanData[idx].ifzan
    //ifzan = !ifzan;

    const url = 'https://qebsc.sinaapp.com/xcx/service/quanpinglun.php';
    wx.request({
      url: url,
      data: {
        v:"sendpinglun",
        id: id,
        openid: that.data.userInfo.openid,
        nickName: that.data.userInfo.userInfo.nickName,
        pinglunData: pinglunData
      },
      success: function (ress) {
        console.log(url)
        console.log("<ifzan")
        console.log(ress.data)
        console.log("ifzan>")
        that.setData({
          [`quanData[${idx}].pinglunList`]: ress.data.pinglunList
        })

      }
    })
  },
  delPinglun:function(e){
    const that = this;
    var delno = e.currentTarget.dataset.delno;
    var idx = e.currentTarget.dataset.idx;
    var id = e.currentTarget.dataset.id;
    console.log("删掉编号："+delno,e);
    wx.showModal({
      title: '删除评论',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定')
          const url = 'https://qebsc.sinaapp.com/xcx/service/quanpinglun.php';
          wx.request({
            url: url,
            data: {
              v: "delpinglun",
              id:id,
              delno: delno,
              openid: that.data.userInfo.openid
            },
            success: function (ress) {
              console.log(url)
              console.log("<delpinglun")
              console.log(ress.data)
              console.log("delpinglun>")
              that.setData({
                [`quanData[${idx}].pinglunList`]: ress.data.pinglunList
              })

            }
          })








        } else if (res.cancel) {
          console.log('点击取消')
        }
      }
    })


  },
  del: function (e) {
    const that = this;
    var idx = e.currentTarget.dataset.idx;
    var id = e.currentTarget.dataset.id;
    console.log("删掉编号：" + id, e);
    wx.showModal({
      title: '删除烟马圈',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定')
          const url = 'https://qebsc.sinaapp.com/xcx/service/quanpinglun.php';
          wx.request({
            url: url,
            data: {
              v: "del",
              id: id,
              openid: that.data.userInfo.openid
            },
            success: function (ress) {
              console.log(url)
              console.log("<del")
              console.log(ress.data)
              console.log("del>")
              var quanData = that.data.quanData;
              quanData.splice(idx,1);
              that.setData({
                
                quanData: quanData
                
              })

            }
          })








        } else if (res.cancel) {
          console.log('点击取消')
        }
      }
    })


  },
  



  onLoad: function (options) {

    console.log("页面参数：", options);



    wx.setNavigationBarTitle({
      title: '马圈'
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
      that.getYanmaQuanData("1");
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
    var shua=this.data.shua;
    if(shua){
      console.log("页面刷新")
      this.getYanmaQuanData("1");
      this.setData({
        shua: !shua
      })
    }

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
    this.getYanmaQuanData("1");

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const that = this;

    if (that.data.pageCount == that.data.thisPage) {
      wx.showToast({
        title: '没有更多了',
        icon: 'success',
        duration: 1000
      })
      return;

    }
    var page = parseInt(this.data.thisPage)+1;
    console.log("加载第"+page+"页数据")
    this.getYanmaQuanData1(page);

  },

  /**
   * 用户点击右上角分享
   */
  
  onShareAppMessage: function () {
    const that = this;
    var path = '/pages/yanma_quan/yanma_quan/yanma_quan';
    return {
      title: '马圈，跑友的朋友圈!',
      path: path,
      success: function (res) {
        app.ZhuanFaTrue(that.data.userInfo.openid, path);
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  yulan:function(e){
    console.log(e);
    var src = e.currentTarget.dataset.src;
    console.log(src);
    var urls = e.currentTarget.dataset.urls;

    console.log(urls);
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })

  }, 
  
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  } 
})