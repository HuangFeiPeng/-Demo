let WebIM = require("../../utils/WebIM");
WebIM = WebIM.default;
console.log('demo——index WebIM',WebIM)
// conn = WebIM.conn;
Page({

  /**
   * 页面的初始数据
   */
  //存放data
  data: {
    name: "",
    pad: ""

  },

  //登录功能btn
  login: function () {
    let options = {
      apiUrl: WebIM.config.apiURL,
      user: 'hfp',
      pwd: '1',
      appKey: WebIM.config.appkey
    };
    WebIM.conn.open(options);
  },
  //注册功能btn
  register: function () {
    var options = {
      username: 'hfp',
      password: '1',
      nickname: '黄飞鹏',
      appKey: WebIM.config.appkey,
      success: function (res) {
        console.log('用户注册成功！', res)
      },
      error: function (err) {
        console.log('注册失败!', err)
      },
      apiUrl: WebIM.config.apiURL
    };
    WebIM.conn.registerUser(options);
  },
  //退出btn
  quit: function () {
    WebIM.conn.close();
  },

  /* 消息部分 */
  //单聊消息
  chatMessage: function () {
    var id = WebIM.conn.getUniqueId();                 // 生成本地消息id
    var msg = new WebIM.message('txt', id);      // 创建文本消息
    msg.set({
      msg: 'message content',                  // 消息内容
      to: '',                          // 接收消息对象（用户id）
      roomType: false,
      ext: {
        key: '1',
        key2: {
          key3: 'value2'
        }
      },                                  //扩展消息
      success: function () {
        console.log('send private text Success');
      },                                       // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
      fail: function (e) {
        console.log("Send private text error", e);
      }                                        // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
    });
    WebIM.conn.send(msg.body);
  },
  //群聊消息
  groupMessage: function () {
    var id = WebIM.conn.getUniqueId();            // 生成本地消息id
    var msg = new WebIM.message('txt', id); // 创建文本消息
    var option = {
      msg: '群组消息发送测试！',             // 消息内容
      to: '115310648688641',                     // 接收消息对象(群组id)
      roomType: false,                    // 群聊类型，true时为聊天室，false时为群组
      ext: {},                            // 扩展消息
      success: function () {
        console.log('群聊消息发送成功！');
      },                                  // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
      fail: function (e) {
        console.log('群聊消息发送失败！', e);
      }                                   // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
    };
    msg.set(option);
    msg.setGroup('groupchat');              // 群聊类型
    WebIM.conn.send(msg.body);
  },
  //聊天室消息
  roomMessage: function () {
    var id = WebIM.conn.getUniqueId();         // 生成本地消息id
    var msg = new WebIM.message('txt', id); // 创建文本消息
    var option = {
      msg: '聊天室消息发送测试',          // 消息内容
      to: '117006506459137',               // 接收消息对象(聊天室id)
      roomType: true,                  // 群聊类型，true时为聊天室，false时为群组
      ext: {},                         // 扩展消息
      success: function () {
        console.log('聊天室消息发送成功！');
      },                               // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
      fail: function (e) {
        console.log('聊天室消息发送失败！', e);
      }                                // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
    };
    msg.set(option);
    msg.setGroup('groupchat');           // 群聊类型
    WebIM.conn.send(msg.body);
  },
  //发送url消息
  urlMessage: function () {
    var url = 'https://huaban.com/img/long_image_shadow.png';
    var id = WebIM.conn.getUniqueId(); // 生成本地消息id
    var msg = new WebIM.message('img', id); // 创建图片消息
    var option = {
      body: {
        type: 'file',
        url: url,
        size: {
          width: '100',
          height: '100',
        },
        length: msg.length,
        filename: 'url测试图片',
        filetype: msg.filetype
      },
      to: 'i', // 接收消息对象,
      success: function () {
        console.log('发送成功！');
      }
    };
    msg.set(option);
    console.log(msg)
    WebIM.conn.send(msg.body);
  },
  //发送命令消息
  cmdMessage: function () {
    var id = WebIM.conn.getUniqueId(); //生成本地消息id
    var msg = new WebIM.message('cmd', id); //创建命令消息
    msg.set({
      msg: 'msg',
      to: 'I', //接收消息对象
      action: '发送的命令消息', //用户自定义，cmd消息必填
      ext: {
        'extmsg': 'extends messages'
      }, //用户自扩展的消息内容（群聊用法相同）
      success: function (id, serverMsgId) {
        console.log('>>>>发送命令消息成功！', id, serverMsgId);
      } //消息发送成功回调   
    });


    // if (  ) {
    //     msg.setGroup('groupchat');
    // } else if ( /*如果是发送到聊天室*/ ) {
    //     msg.body.roomType = true;
    //     msg.setGroup('groupchat');
    // }

    WebIM.conn.send(msg.body);
  },
  //发送自定义消息
  customMessage: function () {
    var id = WebIM.conn.getUniqueId(); // 生成本地消息id
    var msg = new WebIM.message('custom', id); // 创建自定义消息
    var customEvent = "customEvent"; // 创建自定义事件
    var customExts = {}; // 消息内容，key/value 需要 string 类型
    msg.set({
      to: 'i', // 接收消息对象（用户id）
      customEvent,
      customExts,
      ext: {
        ang: '随意'
      }, // 消息扩展
      roomType: false,
      success: function (id, serverMsgId) {
        console.log('自定义消息发送成功！', id, serverMsgId);
      },
      fail: function (e) {
        console.log('>>>>自定义发送失败', e);
      }
    });
    WebIM.conn.send(msg.body);
  },
  //获取历史消息
  getHiatoryMsg: function () {
    var options = {
      queue: "13031081380",
      isGroup: false,
      count: 10,
      success: function (res) {
        console.log('>>>拉取成功！', res);
      }
    }
    WebIM.conn.fetchHistoryMessages(options)
    // var options = {
    //   queue: "lizg1",
    //   isGroup: false,
    //   count: 50,
    //   success: function (res) {
    //     console.log('拉取消息成功：');
    //     for (let i = 0; i < res.length; i++) {
    //       console.log(res[i].data)
    //     }
    //   },
    //   fail: function (error) {
    //     console.log('拉取消息失败：', error);
    //   }
    // }
    // WebIM.conn.fetchHistoryMessages(options)

  },
  /* 好友管理 */
  //获取好友列表
  findFriendList: function () {
    WebIM.conn.getRoster({
      success: function (roster) {
        console.log('获取好友列表成功！', roster);
      }
    })
  },
  //添加好友功能
  addFriend: function () {
    WebIM.conn.subscribe({
      to: '13031081380',
      message: '要不要做朋友？'
    });
  },
  //删除好友
  delFriend: function () {
    WebIM.conn.removeRoster({
      to: '13031081380'
    });
  },
  /* 黑名单部分 */
  //将好友加入黑名单
  joinBlack: function () {
    WebIM.conn.addToBlackList({
      name: ['13031081380'],
      success: function () {
        console.log('将好友加入黑名单成功！');
      },
      error: function () {
        console.log('将好友加入黑名单失败！');
      }
    });
  },
  //将好友移出黑名单
  quitBlack: function () {
    WebIM.conn.removeFromBlackList({
      name: ['13031081380'],
      success: function (res) {
        console.log(res);
      },
      error: function (err) {
        console.log('将好友移出黑名单失败！', err);
      }
    });
  },
  getBlackList: function(){
    WebIM.conn.getBlacklist();
  },
  nextpage: function(){
    wx.navigateTo({
      url: '../demo_index2/demo_index2'
    })
  }
})