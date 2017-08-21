// pages/yanma_quan/yanma_edit/yanma_edit.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    imgs:[],
    imgsUrl:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */bindFormSubmit: function (e) {
     var pages = getCurrentPages();
     var currPage = pages[pages.length - 1];   //当前页面
     var prevPage = pages[pages.length - 2];  //上一个页面

     //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    
    //console.log(e.detail);
    const that = this;
    var formid = e.detail.formId;
    var body = e.detail.value.textarea;
    var wzid = this.data.wzid;
    var openid = this.data.userInfo.openid;
    var nickname = this.data.userInfo.userInfo.nickName;
    var img = this.data.userInfo.userInfo.avatarUrl;
   console.log("formid:"+formid);
    var imgPath = that.data.imgsUrl;
    if (body == "" && imgPath=="") {
      console.log("发布内容为空");
      return
    }
    console.log("开始发布...");


    const apiUrl = 'https://qebsc.sinaapp.com/xcx/service.php?v=sendYanmaQuan';
    console.log("<发布留言开始；url：" + apiUrl);
    wx.request({
      url: apiUrl,
      data: {
        openid: openid,
        nickname: nickname,
        avatarUrl: img,
        body: body,
        formid: formid,
        imgPath:imgPath
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
          prevPage.setData({
            shua: true
          })
          wx.navigateBack({
            url: '../yanma_quan/yanma_quan?a=shua'
          })

          console.log("发布留言结束>");
        }

      }
    })
   },
   delimg:function(e){
     const that = this;
     var index = e.currentTarget.dataset.index;
     console.log("删除编号："+index);

     var imgs = that.data.imgs;
     var imgsUrl = that.data.imgsUrl;

     imgs.splice(index,1);
     imgsUrl.splice(index,1);

     that.setData({
       imgs: imgs,
       imgsUrl: imgsUrl
     });



   },
  uploadImg: function () {
    const that = this;
    var path=that.data.imgs;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        tempFilePaths.forEach(function (value, index, array) {
          array[index] == value;    //结果为true
          console.log(value);
          path.push(value);
          that.up(value);

        });
        console.log(path);
        that.setData({
          imgs: path
          });
      }
    })
  },
  up:function(path){
    const that = this;
    var imgsUrl=that.data.imgsUrl;
    wx.showLoading({
      title: '请稍后..',
    })
    wx.uploadFile({
      url: 'https://api.mhuaxia.com/api/a/a/samples/test.php', //仅为示例，非真实的接口地址
      filePath: path,
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        var data = res.data;
        var code = res.statusCode;
        if (code == "200") {
          console.log("上传成功。")

          imgsUrl.push(data);
          //return data
          that.setData({
            imgsUrl: imgsUrl
          });
          wx.hideLoading();
        }
        else {
          console.log("上传失败！")
          wx.hideLoading();
        }
        //console.log(res);

        //do something
      }
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '烟马圈发布'
    })
    var that = this


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

 
})