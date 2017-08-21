Page({
    data: {

        pageData:{
          bm:true,
          title:"请认真填写以下所有信息",
          banner:"http://2.qebsc.sinaapp.com/longkoumls/wxbm/img/logo3.gif"

        },

        showTopTips: false,
        tips:"",
        userdata:{
          "v": "ttt",
          bmfs:"小程序",
          zjlx:"身份证",
          idnumber:"",
          cjcs:"0"
        },
        date: "2016-09-01",
        time: "12:01",



        zjlx: ["身份证", "护照", "其他"],
        zjlxIndex: 0,
        idnumberType:["idcard","text","text"],


        xb: ["男", "女"],
        xbIndex: 0,

        dz:"",

        xm: ["马拉松（42.195公里）","半程马拉松（21.0975公里）", "十公里狂野跑（10公里）","迷你马拉松（4.2公里）"],
        xmValue:["D","C","B","A"],
        xmIndex: 0,

        cjcs: ["首次","第二次", "第三次","更多"],
        cjcsIndex: 0,

        yfxh: ["儿童[130]","S[160]", "M[165]","L[170]","XL[175]","XXL[180]","XXXL[182]"],
        yfxhValue:["儿童","S","M","L","XL","XXL","XXXL"],
        yfxhIndex: 0,




    },
    showTopTips: function(tips){
        var that = this;
        this.setData({
            showTopTips: true,
            tips:tips
        });
        setTimeout(function(){
            that.setData({
                showTopTips: false
            });
        }, 3000);
    },

    bindZjlxChange: function(e){//证件类型
        console.log(e);
        //console.log('picker 证件类型 code 发生选择改变，携带值为', e.detail.value);

        //var zjlx = e.currentTarget.dataset.zjlx;
        var zjlx =this.data.zjlx[e.detail.value];

        console.log('选择的证件类型：', zjlx);
        //this.showTopTips(zjlx);

        this.setData({
            zjlxIndex: e.detail.value,
            [`userdata.zjlx`]: zjlx,
        })
    },

        bindXbChange: function(e){//性别
        console.log(e);
        //console.log('picker 证件类型 code 发生选择改变，携带值为', e.detail.value);

        //var zjlx = e.currentTarget.dataset.zjlx;
        var xb =this.data.xb[e.detail.value];

        console.log('选择的性别：', xb);
        //this.showTopTips(zjlx);

        this.setData({
            xbIndex: e.detail.value,
            [`userdata.xb`]: xb,
        })
      },

        bindXmChange: function(e){//性别
        console.log(e);
        //console.log('picker 证件类型 code 发生选择改变，携带值为', e.detail.value);
        //var zjlx = e.currentTarget.dataset.zjlx;
        var xmm = this.data.xmValue;
        var xm =xmm[e.detail.value];

        console.log('选择的项目：', xm);
        //this.showTopTips(zjlx);

        this.setData({
            xmIndex: e.detail.value,
            [`userdata.xm`]: xm,
        })

    },
      bindCjcsChange: function(e){//性别
        console.log(e);
        //console.log('picker 证件类型 code 发生选择改变，携带值为', e.detail.value);
        //var zjlx = e.currentTarget.dataset.zjlx;
        var cjcs = e.detail.value;

        console.log('选择的参加次数：', cjcs);
        //this.showTopTips(zjlx);

        this.setData({
            cjcsIndex: cjcs,
            [`userdata.cjcs`]: cjcs,
        })

    },
    bindYfxhChange: function(e){//性别
        console.log(e);
        //console.log('picker 证件类型 code 发生选择改变，携带值为', e.detail.value);
        //var zjlx = e.currentTarget.dataset.zjlx;
        var yfxhh = this.data.yfxhValue;
        var yfxh =yfxhh[e.detail.value];

        console.log('选择的衣服型号：', yfxh);
        //this.showTopTips(zjlx);

        this.setData({
            yfxhIndex: e.detail.value,
            [`userdata.yfxh`]: yfxh,
        })

    },

    getAddr:function(){
      const that = this;
      wx.chooseAddress({
        success: function (res) {
          console.log(res.userName)
          console.log(res.postalCode)
          console.log(res.provinceName)
          console.log(res.cityName)
          console.log(res.countyName)
          console.log(res.detailInfo)
          console.log(res.nationalCode)
          console.log(res.telNumber)

          that.setData({
            dz: res.provinceName+"|"+res.cityName+"|"+res.countyName+"|"+res.detailInfo,
            [`userdata.location_p`]: res.provinceName,
            [`userdata.location_c`]: res.cityName,
            [`userdata.location_a`]: res.countyName,
            [`userdata.dz`]: res.detailInfo
        })



        }
      })
    },
      formBindsubmit:function(e){
        const that = this;



        console.log(e);


        var idnumber = e.detail.value.idnumber;
        var tel = e.detail.value.tel;
        var zjlx=e.detail.value.zjlx;
        var jjtel = e.detail.value.jjtel;
        var email = e.detail.value.email;
        that.setData({
            [`userdata.formid`]: e.detail.formId,
            [`userdata.idnumber`]: e.detail.value.idnumber,
            [`userdata.email`]: e.detail.value.email,
            [`userdata.gj`]: e.detail.value.gj,
            [`userdata.jjname`]: e.detail.value.jjname,
            [`userdata.jjtel`]: e.detail.value.jjtel,
            [`userdata.name`]: e.detail.value.name,
            [`userdata.tel`]: e.detail.value.tel,
            [`userdata.xb`]: e.detail.value.xb,
            [`userdata.zjlx`]: e.detail.value.zjlx,
            [`userdata.xm`]: e.detail.value.xm,
            [`userdata.yfxh`]: e.detail.value.yfxh,
            [`userdata.team`]: e.detail.value.team
        })
        //this.testNull(e.detail.value);

        var reTel=/^1[3|4|5|7|8]\d{9}$/;
        var reEmail = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$/;
        var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;//(15位)
        var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;//(18位)
        var idcard = /(P\d{7})|(G\d{8})/


      if(!((isIDCard1.test(idnumber)) ||(isIDCard2.test(idnumber)) ||(idcard.test(idnumber)))){
        this.showTopTips("身份证件号格式错误");
        return;
      }else if(!(reTel.test(tel))){
        this.showTopTips("手机号格式填写错误！");
        return;
      }else if(!(reTel.test(jjtel))){
        this.showTopTips("紧急联系人手机号格式填写错误！");
        return;
      }else if(!(reEmail.test(email))){
        this.showTopTips("邮箱格式填写错误");
        return;
      }else if(!(this.testNull(e.detail.value))){
        return;
      }else{
        console.log("数据正确！开始提交！");
        that.add();
      }







  },
    testIdnumber:function(e){
      console.log(e);
      var idnumber = e.detail.value;
      this.testIdnumber1(idnumber);


    },
    testNull:function(e){
      console.log("检查是否有空值。");
      console.log(e);
    for(var i in e){
      //console.dir(i);//输出姓名
      //console.dir(e[i]);//输出分数
      if(e[i]==""){
        console.log("有空值！");
        this.showTopTips("请填写所有必填项！");
        return false;
        break;
      }
    }
    return true;

    },
    add:function(){
      const that=this;
      const apiUrl = 'https://qebsc.sinaapp.com/longkoumls/xcxbm/service.php';
              console.log("当前页URL：" + apiUrl)
              wx.request({
                url: apiUrl,
                data: that.data.userdata,
                header: {
                  'content-type': 'json'
                },
                success: function (res) {
                  console.log(res);
                  var code=res.data.code;
                  if(code=="0"){
                    console.info("信息提交成功，下一步调用微信支付。")
                    wx.redirectTo({
                      url: '../../wxpay/wxpay?idnumber='+that.data.userdata.idnumber
                    })
                  }
                  else if (code=="2") {
                    console.log("出现错误");
                    wx.showModal({
                    title: '消息',
                    showCancel:false,
                    content: res.data.msg,
                  })
                  }
                }
                })
    },
    testIdnumber1:function(idnumber){
        const that = this;
        var zjlx = that.data.userdata.zjlx;
        if(zjlx=="身份证"){
          var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;//(15位)
          var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;//(18位)
          var idcard = /(P\d{7})|(G\d{8})/
          if((isIDCard1.test(idnumber)) ||(isIDCard2.test(idnumber)) ||(idcard.test(idnumber))){
              console.log("身份证格式检测通过。");

              const apiUrl = 'https://qebsc.sinaapp.com/longkoumls/xcxbm/service.php';
              console.log("当前页URL：" + apiUrl)
              wx.request({
                url: apiUrl,
                data: { "v": "testvalue",
                        "sqlName":"longkoumls_2017",
                        "tj":"idnumber",
                        "value":"【"+idnumber+"】"
                      },
                header: {
                  'content-type': 'json'
                },
                success: function (res) {
                  console.log(res);
                  if(res.data.msg=="Y"){
                    //console.log("此身份证号已经有了");
                    that.showTopTips("您填写的身份证号已经报名！请查实。");
                    //$("#idnumber").val("");
                    that.setData({
                      [`userdata.idnumber`]: ""
                    })
                    return false;
                  }else if(res.data.msg=="M"){
                    return true;
                  }

                }
                })
          }
          else{
            this.showTopTips("身份证格式错误");
          }
      }


    },




    bindCountryChange: function(e) {
        console.log('picker country 发生选择改变，携带值为', e.detail.value);

        this.setData({
            countryIndex: e.detail.value
        })
    },
    bindAccountChange: function(e) {
        console.log('picker account 发生选择改变，携带值为', e.detail.value);

        this.setData({
            accountIndex: e.detail.value
        })
    },
    bindAgreeChange: function (e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    }
});