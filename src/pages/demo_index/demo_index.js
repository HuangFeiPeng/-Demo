let WebIM = require("../../utils/WebIM");
WebIM = WebIM.default;
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('WebIM', WebIM);
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
  //登录功能btn
  login: function () {
    let options = {
      apiUrl: WebIM.config.apiURL,
      user: '1c1c',
      pwd: '111',
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
        to: '1z1z',                          // 接收消息对象（用户id）
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
        fail: function(e){
            console.log("Send private text error",e);  
        }                                        // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
    });
    WebIM.conn.send(msg.body);
  },
//群聊消息
  groupMessage: function () {
    var id = WebIM.conn.getUniqueId();            // 生成本地消息id
    var msg = new WebIM.message('txt', id); // 创建文本消息
    var option = {
        msg: 'message content',             // 消息内容
        to: '83587692036097',                     // 接收消息对象(群组id)
        roomType: false,                    // 群聊类型，true时为聊天室，false时为群组
        ext: {},                            // 扩展消息
        success: function () {
            console.log('群聊消息发送成功！');
        },                                  // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
        fail: function (e) {
            console.log('群聊消息发送失败！',e);
        }                                   // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
    };
    msg.set(option);
    msg.setGroup('groupchat');              // 群聊类型
    WebIM.conn.send(msg.body);
  }
})