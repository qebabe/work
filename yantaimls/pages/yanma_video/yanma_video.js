
Page({
  data :{
    ShareImg:""

    
  },  
  
  onLoad: function () {
    //this.getShareImg();
  
  },
  getShareImg: function () {
    const that = this;
    const apiUrl = 'https://qebsc.sinaapp.com/xcx/service/getQrcode.php'
    console.log("当前页URL：" + apiUrl)
    wx.request({
      url: apiUrl,
      data: {
        path:"pages/yanma_yundong/yanma_yundong"
      },
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        //console.log("历史数据：")
        //console.log(hisData)

        that.setData({
          ShareImg: res.data.imgUrl
        });
        wx.hideLoading();
        console.log("<getMsg")
        console.log(res.data)
        console.log("getMsg>")

        wx.getImageInfo({
          src: res.data.imgUrl,
          success: function (res) {
            console.log(res.width)
            console.log(res.height)
            console.log(res.path)
            wx.saveImageToPhotosAlbum({
              filePath: res.path,
              success(res) {
                console.log(res);
                wx.showToast({
                  title: '保存成功！',
                  icon: 'success',
                  duration: 2000
                })
              },
              fail(res) {
                console.log(res);
                wx.showToast({
                  title: '保存失败！',
                  icon: 'success',
                  duration: 2000
                })
              }
            })
          }
        })

      }
    })
  },
uploadImg:function(){
  const that = this;
  wx.chooseImage({
    success: function (res) {
      var tempFilePaths = res.tempFilePaths
      wx.uploadFile({
        url: 'https://api.mhuaxia.com/api/a/a/samples/test.php', //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'file',
        formData: {
          'user': 'test'
        },
        success: function (res) {
          var data = res.data;
          var code = res.statusCode;
          if (code=="200"){
            console.log("上传成功。")
            that.setData({
              ShareImg: data
            });
          }
          else{
            console.log("上传失败！")
          }
          console.log(res);
          
          //do something
        }
      })
    }
  })
},
})


