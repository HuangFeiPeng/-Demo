// src/pages/demo_index3/demo_index3.js
let WebIM = require('../../utils/WebIM');
WebIM = WebIM.default;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /* 聊天室管理 */
  //获取聊天室列表
  listRooms: function () {
    WebIM.conn.getChatRooms({
      apiUrl: 'https://a1.easemob.com',
      pagenum: 1, // 页数
      pagesize: 5, // 每页个数
      success: function (list) {
        console.log("%c [opened] 连接已成功建立", "color: green", list.data);
      },
      error: function (e) {
        console.log('获取加入的聊天室失败=>', e);
      }
    })
  },
  //加入聊天室
  joinRoom: function () {
    WebIM.conn.joinChatRoom({
      roomId: '122163737722883'
    })
  },
  //退出聊天室
  quitRoom: function () {
    WebIM.conn.quitChatRoom({
      roomId: '117015302963201'
    })
  },
  /* 聊天室公告 */
  //获取聊天室公告
  getChatRoomAct: function () {
    WebIM.conn.fetchChatRoomAnnouncement({
      roomId: '117006506459137', // 聊天室id                          
      success: function (resp) {
        console.log('>>>获取公告成功！', resp);
      },
      error: function (e) {
        console.log('>>>获取失败', e);
      }
    })
  },
  //上传或修改群公告
  updateChatRoomAct: function () {
    WebIM.conn.updateChatRoomAnnouncement({
      roomId: '117006506459137', // 聊天室id   
      announcement: '小程序聊天室的公告上传测试2', // 公告内容                        
      success: function (resp) {
        console.log('上传成功！', resp);
      },
      error: function (e) {
        console.log('上传失败～', e);
      }
    })
  },
  /* 聊天室禁言 */
  //聊天室成员禁言
  muteChatRoomMer: function () {
    WebIM.conn.muteChatRoomMember({
      chatRoomId: "117006506459137", // 聊天室id
      username: 'i', // 被禁言的聊天室成员的id
      muteDuration: -1000, // 被禁言的时长，单位ms，如果是“-1000”代表永久
      success: function (resp) {
        console.log('禁言成功！', resp);
      },
      error: function (e) {
        console.log('禁言失败！', e);
      }
    })
  },
  //聊天室成员解除禁言
  removeMuteChatRoomMer: function () {
    WebIM.conn.removeMuteChatRoomMember({
      chatRoomId: "117006506459137", // 聊天室id
      username: 'i', // 解除禁言的聊天室成员的id
      success: function (resp) {
        console.log('解除禁言成功！', resp);
      },
      error: function (e) {
        console.log('解除禁言失败！', e);
      }
    })
  },
  //获取所有禁言成员
  getMuteChatRoomMer: function () {
    WebIM.conn.getChatRoomMuted({
      chatRoomId: "117006506459137", // 聊天室id
      success: function (resp) {
        console.log('获取禁言列表成功！', resp);
      },
      error: function (e) {
        console.log('获取禁言列表失败！', e);
      }
    })
  },
  //开启或关闭全员禁言
  switchMuteChatRoomMer: function () {
    var options = {
      chatRoomId: "117006506459137", //聊天室id
      success: function (resp) {
        console.log('聊天室全员禁言功能正常', resp);
      },
      error: function (e) {
        console.log('全员禁言失败～', e);
      }
    };
    // WebIM.conn.disableSendChatRoomMsg(options);
    WebIM.conn.enableSendChatRoomMsg(options);
  },
  /* 聊天室白名单管理 */
  //添加用户到白名单
  addUsersWhiteList: function () {
    WebIM.conn.addUsersToChatRoomWhitelist({
      chatRoomId: "117006506459137", //聊天室id
      users: ["l"], //成员id列表
      success: function (resp) {
        console.log('添加成员到白名单成功！', resp);
      },
      error: function (e) {
        console.log('添加成员到白名单失败！', e);
      }
    })
  },
  //将成员从白名单移除
  removeUsersWhiteList: function () {
    //此功能存疑，接口调用成功但是成员没有从白名单移除。
    WebIM.conn.rmUsersFromChatRoomWhitelist({
      chatRoomId: "117006506459137", //聊天室id
      users: ["l"], //成员id列表
      success: function (resp) {
        console.log('将成员移除白名单成功！', resp);
      },
      error: function (e) {
        console.log('将成员从白名单移除失败！', e);
      }
    })
  },
  //从服务器拉取白名单列表
  getUsersWhiteList: function () {
    WebIM.conn.getChatRoomWhitelist({
      chatRoomId: "117006506459137", //聊天室id
      success: function (resp) {
        console.log('获取白名单列表成功', resp.data);
      },
      error: function (e) {
        console.log('获取失败！', e);
      }
    })
  },
  //查询是否为白名单成员，操作权限：app admin可查询所有用户；app user可查询自己
  isChatRoomWhiteUser: function () {
    WebIM.conn.isChatRoomWhiteUser({
      chatRoomId: "117006506459137", //聊天室id
      userName: "hfp", //要查询的成员
      success: function (resp) {
        console.log('>>>查询成功～', resp.data);
      },
      error: function (e) {
        console.log('查询失败！', e);
      }
    })
  },
  /* 黑名单管理 */
  //获取聊天室黑名单
  getUsersBlackList: function () {
    WebIM.conn.getChatRoomBlacklistNew({
      chatRoomId: "117006506459137", //聊天室id
      success: function (list) {
        console.log('>>>拉取聊天室黑名单成功！', list.data);
      },
      error: function (e) {
        console.log('拉取失败', e);
      }
    })
  },
  //将单个用户加入黑名单
  addUsersBlackList: function () {
    WebIM.conn.chatRoomBlockSingle({
      chatRoomId: '117006506459137', // 聊天室id
      username: 'l', // 将要被加入黑名单的用户名
      success: function (resp) {
        console.log('拉黑成功～',resp.data);
      },
      error: function (e) {
        console.log('拉黑失败～',e);
      }
    })
  },
  //单个移除黑名单
  removeUserssBlackList: function(){
    WebIM.conn.removeChatRoomBlockSingle({
      chatRoomId: "117006506459137",                     // 群组id              
        username: "l",                             // 需要移除的用户名
        success: function(resp){
          console.log('移除成功～',resp.data);
        },
        error: function(e) {
        console.log('移除失败～',e);
        }
    })
  },
  //批量将成员加入黑名单
  chatRoomBlockMulti: function(){
    WebIM.conn.chatRoomBlockMulti({
      chatRoomId: "117006506459137",                    // 聊天室id
        usernames: ["i", "k"],                  // 需要移除的用户名数组
        success: function(resp){
          console.log('批量拉黑成功～',resp);
        },
        error: function(e) {
          console.log('批量拉黑失败',e);
        }
    })
  },
  //批量将成员移除黑名单
  //功能有问题，removeChatRoomBlockMulti此方法为undefined;
  removeChatRoomBlockMulti: function(){
    debugger;
    WebIM.conn.removeChatRoomBlockMulti({
      chatRoomId: "117006506459137",  // 聊天室id
      usernames: ["i", "k"], 
      success: function(resp){
        console.log('>>>>批量移除成功！',resp);
      },
      error: function(e) {
        console.log('批量移除',e);
      }
    }
      
    )
  }


})