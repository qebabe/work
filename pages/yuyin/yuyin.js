var interval
Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {


    animationData: {},

    page:0,
    pageSize:10,
    pageCount:1,



    cover_url: '',
    title: '',
    singer: '',
    album_title:'',
    play_path:'',

    host:"https://api.mhuaxia.com/api/yunjiu/index.php",
    list: [],
    page:0,
    canload:true,
    playIndex:-1,
    play:false,
    wz:0,
    duration:0,
    duration1:"00:00",
    currentPosition:"00:00",
    isInterval:true,
    isdonghua:false


    },
    onLoad: function (options) {
      this.onAudioState();
      this.getlist();


      },


    onPullDownRefresh: function () {
      this.getlist();


  },
  tuodong:function(e){
    var newwz = e.detail.value;
    var duration =this.data.duration;
    var position = newwz*duration/100;
    const backgroundAudioManager = wx.getBackgroundAudioManager()

    backgroundAudioManager.seek(position)
    console.log(position);


  },
    onShow: function () {
      const that =this;
      that.setData({
          isInterval: true
         })
      that.dingshiqi();

  },
  onHide: function () {
    const that =this;
    that.setData({
          isInterval: false
         });
    clearInterval(interval);
  },
    onReachBottom: function () {
    this.loadMore();
  },
  donghua:function(){
    if(this.data.isdonghua){
      return;
    }
    console.log("动画开始了..");
    var animation = wx.createAnimation({
     duration: 5000,
     timingFunction: 'ease-in-out',
     transformOrigin: "50%,50%"
    })
    this.setData({
     animationData: animation.export()
    })


    animation.rotate(360).step()

   this.setData({
    animationData: animation.export(),
    isdonghua:true
   })

   var that=this;

   setTimeout(function(){
    animation.rotate(0).step({duration: 0, transformOrigin: "50%,50%",timingFunction: 'linear'})
    that.setData({
      animationData: animation.export(),
      isdonghua:false
    })
   },5000)



  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  djPlay:function(e){

    //console.log(e);
    const that =this;
    var ActionData = e.currentTarget.dataset;
    var item = ActionData.item;
    var idx = ActionData.idx;
    that.setData({
          cover_url: item.cover_url,
          title: item.title,
          singer: "云酒头条",
          album_title:item.album_title,
          play_path:item.play_path,
          playIndex:idx,
          playYuYInId:item.yuyin_id
         })
    that.backPlay();

  },






  audioPlay: function () {
    const that =this;
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.play()
    that.setData({
          play: true
         })
    // that.dingshiqi();
  },
  audioPause: function () {
    const that =this;
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.pause()
    that.setData({
          play: false
         })
    //clearInterval(interval);

  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  backPlay:function(){
    //clearInterval(interval);
    wx.showLoading({
      title: '正在努力准备..',
    })
    const that =this;
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = that.data.title
    backgroundAudioManager.epname = that.data.album_title
    backgroundAudioManager.singer = that.data.singer
    backgroundAudioManager.coverImgUrl = that.data.cover_url
    backgroundAudioManager.src = that.data.play_path
    that.setData({
          play: true
         })

  },
  getlist:function(){
    console.log("getlist...")
        wx.showLoading({
      title: '努力加载中...',
    })
    const that = this
    var pageSize=that.data.pageSize;
    wx.request({
      url: that.data.host+'?v=getYuYinList&page=0&pageSize='+pageSize,
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
         that.setData({
          cover_url: res.data.list[0].cover_url,
          title: res.data.list[0].title,
          singer: "云酒头条",
          album_title:res.data.list[0].album_title,
          play_path:res.data.list[0].play_path

         })
       }
       else{
        that.setData({
          page: "0"
         })
       }
         wx.hideLoading();
         wx.stopPullDownRefresh()
      }
    })
    this.index = 1
  },
loadMore:function(){
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

    var nextPage = parseInt(page) + 1
    wx.request({
      url: that.data.host+'?v=getYuYinList&page='+nextPage+'&pageSize='+pageSize,
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
          page: "0"
         })
       }
         wx.hideLoading();
         wx.stopPullDownRefresh()
      }
    })
    this.index = 1
  },
  nextOne: function(){
    const that =this;
    var playIndex=this.data.playIndex;
    var newIndex = parseInt(playIndex) + 1;
    console.log("next one。。");
    console.log("playIndex:"+newIndex)
    that.setData({
          cover_url: that.data.list[newIndex].cover_url,
          title: that.data.list[newIndex].title,
          singer: "云酒头条",
          album_title:that.data.list[newIndex].album_title,
          play_path:that.data.list[newIndex].play_path,
          playIndex:newIndex,
          playYuYInId:that.data.list[newIndex].yuyin_id,

         })
    that.backPlay();
  },
    prevOne: function(){
    const that =this;
    var playIndex=this.data.playIndex;
    var newIndex = parseInt(playIndex) - 1;
    console.log("next one。。");
    console.log("playIndex:"+newIndex)
    that.setData({
          cover_url: that.data.list[newIndex].cover_url,
          title: that.data.list[newIndex].title,
          singer: "云酒头条",
          album_title:that.data.list[newIndex].album_title,
          play_path:that.data.list[newIndex].play_path,
          playIndex:newIndex,
          playYuYInId:that.data.list[newIndex].yuyin_id

         })
    that.backPlay();
  }
  ,
    onAudioState: function () {
      console.log("开始监听音乐播放状态...");
    let that = this;
    wx.onBackgroundAudioPlay(function () {
      // 当 wx.playBackgroundAudio() 执行时触发
      // 改变 coverImg 和 播放状态
      that.setData({ play: true });
       //clearInterval(interval);
       that.dingshiqi();
       wx.hideLoading();
       console.log("on play");
    });
    wx.onBackgroundAudioPause(function () {
      // 当 wx.pauseBackgroundAudio() 执行时触发
      // 仅改变 播放状态
      that.setData({ play: false });
      console.log("on pause");
      clearInterval(interval);
    });
    wx.onBackgroundAudioStop(function () {
      // 当 音乐自行播放结束时触发
      // 改变 coverImg 和 播放状态
      that.setData({ play: false });
      console.log("on stop");
      clearInterval(interval);
    });
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.onPrev(function(){
      that.prevOne();
    });
    backgroundAudioManager.onNext(function(){
      that.nextOne();
    });
    backgroundAudioManager.onEnded(function(){
      that.nextOne();
    });
    backgroundAudioManager.onCanplay(function(){
      wx.hideLoading();
      console.log("可以播放了。");
    });
  },
   formatTime:function(seconds) {
    var min = Math.floor(seconds / 60),
        second = seconds % 60,
        hour, newMin, time;

    if (min > 60) {
        hour = Math.floor(min / 60);
        newMin = min % 60;
    }

    if (second < 10) { second = '0' + second;}
    if (min < 10) { min = '0' + min;}

    return time = hour? (hour + ':' + newMin + ':' + second) : (min + ':' + second);
},
dingshiqi:function(){
  const that=this;
  clearInterval(interval);
  var isInterval=that.data.isInterval;
  var play=that.data.play;
  if(isInterval && play){
  interval = setInterval(function () {
       wx.getBackgroundAudioPlayerState({
              success: function(res) {

                  var duration=res.duration;
                  var currentPosition=res.currentPosition;
                  var wz = currentPosition*100/duration;
                  console.log(wz);
                  currentPosition = that.formatTime(Math.round(currentPosition));
                  var duration1=that.formatTime(Math.round(duration));
                  that.setData({ wz: wz, duration:duration,duration1:duration1,currentPosition:currentPosition});
                  //duration 总时长
                  //currentPosition 当前播放位置
                  //status 播放状态
                  //downloadPercent 下载状况 100 即为100%
                  //dataUrl 当前播放音乐地址
              }
          })
       that.donghua();
       }, 1000) //循环时间 这里是1秒
}
}
})