// src/pages/demo_index3/demo_index3.js
let WebIM = require('../../utils/WebIM');
WebIM = WebIM.default;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  listRooms: function () {
    WebIM.conn.getChatRooms({
      apiUrl: 'https://a1.easemob.com',
      pagenum: 1,                                 // 页数
      pagesize: 5,                               // 每页个数
      success: function (list) {
        console.log("%c [opened] 连接已成功建立", "color: green",list);
      },
      error: function (e) {
        console.log('获取加入的聊天室失败=>',e);
      }
    })
  }


})