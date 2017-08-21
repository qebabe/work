// pages/wxpay/wxpay.js
const md5 = require('../../utils/md5.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    ready :false,
    pay :false,
    response:{},
    payData:{
      title:"-",
      total_fee:"-",
      idnumber:"-",
      trade_no:"-"
    }



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '获取支付信息',
    })
    console.log(options);
  var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
      //that.getData("370521199101031218");
      if(options.idnumber){
        that.getData(options.idnumber);
        //that.getData("370521199101031218");
      }
      else{
        that.toMsg("错误","支付参数错误。")
      }
    })
  },
  getData:function(idnumber){
    var that = this;
    const url = 'https://qebsc.sinaapp.com/longkoumls/xcxbm/wxpay/wxpay.php';
    wx.request({
          url: url,
          data: {
            openid: that.data.userInfo.openid,
            idnumber: idnumber,
          },
          success: function (response) {
            console.log(that.data.openid);
            console.log(response.data);
            //result_code:"SUCCESS"
            that.setData({
              [`payData.total_fee`]: response.data.paydata.total_fee,
              [`payData.idnumber`]: response.data.paydata.idnumber,
              [`payData.title`]: response.data.paydata.title,
              [`payData.trade_no`]: response.data.paydata.trade_no
            });
            wx.hideLoading();

            if (response.data.order.result_code == "SUCCESS" && response.data.order.return_code == "SUCCESS"){
              that.setData({
                response: response.data.order,
                ready : true
              })
            }else{
              that.toMsg("系统错误",response.data.order.return_msg);

            }
          }
        });
      },
  gopay:function(){
  var that = this
  var appId = that.data.response.appid;
  var timeStamp = (Date.parse(new Date()) / 1000).toString();
  var pkg = 'prepay_id=' + that.data.response.prepay_id;
  var nonceStr = that.data.response.nonce_str;
  var stringSignTemp = 'appId=' + appId + '&nonceStr=' + nonceStr + '&package=' + pkg + '&signType=MD5&timeStamp=' + timeStamp + "&key=e10adc3949ba59abbe56e057f20f883e"
  var paySign = md5.hex_md5(stringSignTemp).toUpperCase();
  console.log(paySign);
  console.log(appId);
  wx.requestPayment({
    'timeStamp': timeStamp,
    'nonceStr': nonceStr,
    'package': pkg,
    'signType': 'MD5',
    'paySign': paySign,
    'success': function (res) {
      if(res.errMsg=="requestPayment:ok"){
          console.log('success');
          console.log(res);
          that.setData({
            pay :true
          });
      }
      else{
        that.toMsg("支付失败","支付出现问题。");

      }
    }
  });
  },
  toMsg:function(title,content){
    wx.showModal({
                showCancel:false,
                title: title,
                content: content
              })
  }

});

