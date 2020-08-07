//全局引入WebIM
let WebIM = wx.WebIM = require("./utils/WebIM")["default"];

/* 引入多人音视频依赖的文件 */
// emedia_for_miniProgram-test是沙箱环境测试版，线上环境请用emedia_for_miniProgram这个文件
const emedia =  wx.emedia = require("./emedia/emedia_for_miniProgram");

console.log('WebIM', WebIM.conn.fetchHistoryMessages );
// console.log('emedia', emedia);

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
        // console.log("%C [小程序Demo登录成功！]", "color: green");
        console.log("%c [opened小程序Demo登录成功！] 连接已成功建立", "color: green");
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
      onFileMessage: function (message) {
        console.log('>>>>收到文件消息', message);
      }, //收到文件消息
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
        let toId = message.from;
        switch (message.type) {
          case 'subscribe':
            WebIM.conn.subscribed({
              to: toId,
              // message: '[resp:true]'
            })
            break;
          case 'unsubscribed':
            console.log('与' + toId + '关系解除！')
            break;
          case "subscribed":
            console.log('好友申请通过！')
            break;
          case 'rmGroupMute':
            // 解除群组一键禁言
            break;
          case 'muteGroup':
            // 群组一键禁言
            break;
          case 'rmUserFromGroupWhiteList':
            // 删除群白名单成员
            break;
          case 'addUserToGroupWhiteList':
            // 增加群白名单成员
            break;
          case 'deleteFile':
            // 删除群文件
            console.log('群文件已删除！');
            break;
          case 'uploadFile':
            console.log(message.from + '上传了群文件');
            // 上传群文件
            break;
          case 'deleteAnnouncement':
            // 删除群公告
            break;
          case 'updateAnnouncement':
            // 更新群公告
            console.log('群公告已更新~');
            break;
          case 'removeMute':
            // 解除禁言
            break;
          case 'addMute':
            // 禁言
            break;
          case 'removeAdmin':
            // 移除管理员
            break;
          case 'addAdmin':
            // 添加管理员
            break;
          case 'changeOwner':
            // 转让群组
            break;
          case 'direct_joined':
            // 直接被拉进群
            console.log(message.from + '直接被拉近了群');
            break;
          case 'leaveGroup':
            console.log(message.from + '退出了群组');
            // 退出群
            break;
          case 'memberJoinPublicGroupSuccess':
            console.log(message.from + '加入了公开群组成功！');
            // 加入公开群成功
            break;
          case 'removedFromGroup':
            // 从群组移除
            break;
          case 'invite_decline':
            console.log('加群申请拒绝');
            // 拒绝加群邀请
            break;
          case 'invite_accept':
            // 接收加群邀请
            break;
          case 'invite':
            console.log('发起可加群邀请！');
            // 发加群邀请
            break;
          case 'joinPublicGroupDeclined':
            // 拒绝入群申请
            break;
          case 'joinPublicGroupSuccess':
            // 同意入群申请
            break;
          case 'joinGroupNotifications':
            // 申请入群
            break;
          case 'leave':
            // 退出群
            break;
          case 'join':
            // 加入群
            break;
          case 'deleteGroupChat':
            // 解散群
            console.log('》》》》群组解散！');
            break;
          case 'rmChatRoomMute':
            // 解除聊天室一键禁言
            break;
          case 'muteChatRoom':
            // 聊天室一键禁言
            break;
          case 'rmUserFromChatRoomWhiteList':
            // 删除聊天室白名单成员
            break;
          case 'addUserToChatRoomWhiteList':
            // 增加聊天室白名单成员
            break;
          case 'deleteFile':
            // 删除聊天室文件
            break;
          case 'uploadFile':
            // 上传聊天室文件
            break;
          case 'deleteAnnouncement':
            // 删除聊天室公告
            break;
          case 'updateAnnouncement':
            console.log('群公告被更新！');
            // 更新聊天室公告
            break;
          case 'removeMute':
            console.log('禁言解除！');
            // 解除禁言
            break;
          case 'addMute':
            console.log('禁言成功！');
            // 禁言
            break;
          case 'removeAdmin':
            // 移除管理员
            break;
          case 'addAdmin':
            console.log('管理员禁言～');
            // 添加管理员
            break;
          case 'changeOwner':
            // 转让聊天室
            break;
          case 'leaveChatRoom':
            console.log('有人退出聊天室');
            // 退出聊天室
            break;
          case 'memberJoinChatRoomSuccess':
            console.log('有人加入聊天室');
            // 加入聊天室
            break;
          case 'leave':
            // 退出群
            break;
          case 'join':
            // 加入群
            break;
          default:
            break;
        }

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
        console.log('》》》监听到黑名单~', list);
      },
      onCustomMessage: function ( message ) {
        console.log('>>>>收到自定义消息',message);
      },  //收到自定义消息
      onRecallMessage: function (message) {}, //收到撤回消息回调
      onReceivedMessage: function (message) {
        console.log('收到消息送达服务器回执',message)
      }, //收到消息送达服务器回执
      onDeliveredMessage: function (message) {
        console.log('收到消息送达客户端回执',message);
      }, //收到消息送达客户端回执
      onReadMessage: function (message) {
        // console.log('>>>>>收到已读消息回执！', message)
      }, //收到消息已读回执
      onCreateGroup: function (message) {}, //创建群组成功回执（需调用createGroupNew）
      onMutedMessage: function (message) {
        console.log(message,'被禁言的消息触发回调');
      } //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
    });
    wx.emedia.mgr.onMemberJoined = function(e){
      var jid = wx.WebIM.conn.context.jid
      let identityName = jid.appKey + '_' + jid.name+ '@' + jid.domain
      var exitConfer;
      // if (e.memName == identityName) {
      //   exitConfer =  setTimeout(function(){console.log('定时器执行');wx.emedia.mgr.exitConference();},5000)
      // } else {
      //   clearTimeout(exitConfer);
      // }  
      console.log('》》》监听到有人加入会议',e);
    }
    wx.emedia.on
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