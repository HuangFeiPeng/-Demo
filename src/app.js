//全局引入WebIM
let WebIM = wx.WebIM = require("./utils/WebIM")["default"];

/* 引入多人音视频依赖的文件 */
//emedia_for_miniProgram-test是沙箱环境测试版，线上环境请用emedia_for_miniProgram这个文件
const emedia = require("./emedia/emedia_for_miniProgram");

console.log('WebIM', WebIM);
console.log('emedia', emedia);

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    /* 初始化监听 */
    WebIM.conn.listen({
      onOpened: function (message) {
        let Nowdate = new Date().toLocaleString();
        console.log('小程序Demo' + Nowdate + '登录成功！');
      }, //连接成功回调 
      onClosed: function (message) {
        console.log('链接已关闭！')
      }, //连接关闭回调
      onTextMessage: function (message) {
        console.log('》》》收到文本消息', message);
        var bodyId = message.id; // 需要发送已读回执的消息id
        var msg = new WebIM.message('read', WebIM.conn.getUniqueId());
        msg.set({
          id: bodyId,
          to: message.from
        });
        WebIM.conn.send(msg.body);
      }, //收到文本消息
      onEmojiMessage: function (message) {}, //收到表情消息
      onPictureMessage: function (message) {
        console.log("Location of Picture is ", message.url);
      }, //收到图片消息
      onCmdMessage: function (message) {}, //收到命令消息
      onAudioMessage: function (message) {}, //收到音频消息
      onLocationMessage: function (message) {}, //收到位置消息
      onFileMessage: function (message) {}, //收到文件消息
      onVideoMessage: function (message) {
        var node = document.getElementById('privateVideo');
        var option = {
          url: message.url,
          headers: {
            'Accept': 'audio/mp4'
          },
          onFileDownloadComplete: function (response) {
            var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
            node.src = objectURL;
          },
          onFileDownloadError: function () {
            console.log('File down load error.')
          }
        };
        WebIM.utils.download.call(conn, option);
      }, //收到视频消息
      onPresence: function (message) {
        console.log('>>>>onPresence监听到的回调', message);
      }, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
      onRoster: function (message) {}, //处理好友申请
      onInviteMessage: function (message) {}, //处理群组邀请
      onOnline: function () {}, //本机网络连接成功
      onOffline: function () {}, //本机网络掉线
      onError: function (message) {
        console.warn('错误回调》》》', message);
      }, //失败回调
      onBlacklistUpdate: function (list) { //黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        console.log(list);
      },
      onRecallMessage: function (message) {}, //收到撤回消息回调
      onReceivedMessage: function (message) {
        console.log()
      }, //收到消息送达服务器回执
      onDeliveredMessage: function (message) {}, //收到消息送达客户端回执
      onReadMessage: function (message) {
        console.log('>>>>>收到已读消息回执！', message)
      }, //收到消息已读回执
      onCreateGroup: function (message) {}, //创建群组成功回执（需调用createGroupNew）
      onMutedMessage: function (message) {} //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
    });
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})