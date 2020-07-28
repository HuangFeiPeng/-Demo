// let WebIM = require('../../utils/WebIM');
// WebIM = WebIM.default;
const emedia =  wx.emedia = require('../../emedia/emedia_for_miniProgram');
Page({

  /**ßßß
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('多人会议界面page',WebIM);
  },
  createCf: function(){
    /* 
        confrtype: 会议类型写为number类型不能将会议类型写成string例如：‘10’，否侧将会报错；

    */
    wx.emedia.mgr.createConference(10, '', true, true).then(function(data){
      //confr 即为创建的会议
      //将ID password 发送给其他人
      console.warn('创建会议成功～',data);
      let MeetInfor = data.data.ticket; //创建出来的会议信息
      // let MeetInforJson = JSON.parse(MeetInfor); //将获取到的会议信息转换为json格式
      let MeetInforJson = MeetInfor; //将获取到的会议信息转换为json格式
      let ConfrId = MeetInforJson.confrId; //拿到创建出来的会议id
      console.log(MeetInforJson);
      //LBJ13H0545LENTFWNOZVAQ00C1332(confrid);
      //加入会议
      wx.emedia.mgr.joinConferenceWithTicket(ConfrId, MeetInfor).then(function(confr){
        //confr 即为创建的会议 LBJ13H0545LENTFWNOZVAQ00C1332M3
        console.warn('加入会议成功～',confr);
        let rtcId = wx.emedia.util.getRtcId(); //这个是什么？
        console.log('get到rtcId',rtcId);
        //发布本地视频流
        wx.emedia.mgr.pubStream(rtcId).then(function(res){
          console.log('发布视频流成功' ,res);
          //将返回的res.data.rtmp赋值给live-player的src就可以播放了
        })
        
    })
  })
  }
})