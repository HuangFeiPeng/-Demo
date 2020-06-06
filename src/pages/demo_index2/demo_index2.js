let WebIM = require('../../utils/WebIM');
WebIM = WebIM.default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit: "5",
    cursor: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('群组页引入的WebIM', WebIM);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /* 群组功能 */
  //获取当前用户加入的群组
  getGroupList: function () {
    var options = {
      success: function (resp) {
        console.log("获取用户加入的群组成功~: ", resp.data)
      },
      error: function (e) {
        console.log('获取群组列表失败~', e);
      }
    }
    WebIM.conn.getGroup(options);
  },
  //分页获取公开群
  listGroups: function () {
    var that = this;
    var options = {
      limit: this.data.limit,                                            // 预期每页获取的记录数
      cursor: this.data.cursor,                                          // 游标
      success: function (resp) {
        console.log("分页获取成功！ ", resp.data);
        that.data.cursor = resp.cursor;
      },
      error: function (e) {
        console.log(e);
      }
    };
    WebIM.conn.listGroups(options);
  },
  //创建群
  createGroup: function () {
    WebIM.conn.createGroupNew({
      data: {
        groupname: 'hfp的小程序群创建测试公开群3',                    // 群组名
        desc: 'hfp群组创建测试',                          // 群组描述
        members: ["13031081380"],            // 用户名组成的数组
        public: false,                         // pub等于true时，创建为公开群
        approval: true,                  // approval为true，加群需审批，为false时加群无需审批
        allowinvites: true         // 是否允许群成员邀请别人加入此群
      },
      success: function (respData) {
        console.log('群组创建成功！', respData);
      },
      error: function (e) {
        console.log('error', e);
      }
    })
  },
  //获取群组信息
  getGroupInfo: function () {
    WebIM.conn.getGroupInfo({
      groupId: 116846231617538,
      success: function (resp) {
        console.log(">>>群组信息获取成功！: ", resp.data);
      },
      error: function (e) {
        console.warn('获取失败！', e);
      }
    })
  },
  //修改群组信息
  changeGroupInfo: function () {
    WebIM.conn.modifyGroup({
      groupId: '116846231617538',
      // groupName: '小程序修改之后的群',                         // 群组名称
      description: '修改测试',  // 群组简介
      success: function (res) {
        console.log('群组信息修改成功!', res.data);
      }
    })
  },
  //移除群组成员
  removSingleMember: function () {
    WebIM.conn.removeSingleGroupMember({
      groupId: '116846231617538',
      username: 'pfh',                         // 群组成员名称
      success: function (res) {
        console.log('移除群成员成功！', res);
      }
    })
  },
  //解散群组
  delGroup: function () {
    WebIM.conn.dissolveGroup({
      groupId: '116846231617538',
      success: function (res) {
        console.log('》》》》》群组已解散！');
      }
    })
  },
  //退出群组
  qiutGroup: function () {
    WebIM.conn.quitGroup({
      to: 'asdfghj',
      groupId: '116842772365317',
      success: function () {
        console.log('You leave room succeed!');
      },
      error: function () {
        console.log('Leave room faild');
      }
    })
  },
  //上传群公告或者修改群公告
  undateAnt: function () {
    WebIM.conn.updateGroupAnnouncement({
      groupId: '117200113434628',            // 群组id   
      announcement: '群公告上传测试2~',        // 公告内容                        
      success: function (resp) {
        console.log('群公告上传成功！');
      },
      error: function (e) {
        console.log('>>>公告上传失败~', e);
      }
    })
  },
  //修改群公告
  getAnt: function () {
    WebIM.conn.fetchGroupAnnouncement({
      groupId: '117200113434628',            // 群组id                          
      success: function (resp) {
        console.log('>>>>获取公告成功！', resp);
      },
      error: function (e) {
        console.log(e, '获取失败！');
      }
    })
  },
  //获取群文件列表
  getGoupFlieList: function () {
    WebIM.conn.fetchGroupSharedFileList(
      {
        groupId: '117200113434628', // 群组id                        
        success: function (resp) {
          console.log('群文件获取成功！', resp);
        },
        error: function (e) {
          console.log('群文件获取失败!', e);
        },
      }
    )
  },
  //下载群文件
  downloadGoupFlie: function () {
    // debugger
    let fileId = 'fc952380-a623-11ea-ab69-55e856852236'
    WebIM.conn.downloadGroupSharedFile({
      groupId: '117200113434628',
      fileId: fileId
    })
  },
  //删除群文件
  delGoupFlie: function () {
    WebIM.conn.deleteGroupSharedFile({
      groupId: '117200113434628',
      fileId: 'fc952380-a623-11ea-ab69-55e856852236',
      success: function (res) {
        console.log('》》》》群文件删除成功！', res);
      },
      error: function (e) {
        console.log('>>>>>>删除失败！', e);
      }
    });
  },
  /* 群成员管理 */
  //查询群组成员
  findgroupList: function () {
    WebIM.conn.listGroupMember({
      pageNum: 1,                                               // 页码
      pageSize: 5,                                             // 预期每页获取的记录数
      groupId: '117200113434628',
      success: function (resp) { console.log("查询群组成员成功！: ", resp.data) },
      error: function (e) {
        console.log('查询失败！', e);
      }
    });
  },
  //将成员设置成管理员
  setAdmin: function () {
    WebIM.conn.setAdmin({
      groupId: "117200113434628",            // 群组id
      username: "13031081380",              // 要设置的用户名
      success: function (resp) {
        console.log('设置成功~', resp.data);
      },
      error: function (e) {
        console.log('设置失败~', e);
      }
    })
  },
  //将指定管理员撤销
  removeAdmin: function () {
    WebIM.conn.removeAdmin({
      groupId: "117200113434628",            // 群组id
      username: "13031081380",              // 要设置的用户名
      success: function (resp) {
        console.log('撤销成功~', resp.data);
      },
      error: function (e) {
        console.log('撤销失败~', e);
      }
    })
  },
  //获取群组内所有管理员
  getGroupAdmin: function () {
    WebIM.conn.getGroupAdmin({
      groupId: "117200113434628",
      success: function (resp) {
        console.log('获取All管理员成功~', resp.data);
      },
      error: function (e) {
        console.log('获取失败~', e);
      }
    })
  },
  /* 加群处理 */
  //将好友加入群组
  addFreiendGroup: function () {
    WebIM.conn.inviteToGroup({
      users: ['pfh', 'hfp3'],
      groupId: "117200113434628"
    });
  },
  //向群组发出入群申请
  joinGroup: function () {
    WebIM.conn.joinGroup({
      groupId: "117200113434628",
      success: function (resp) {
        console.log("Response: ", resp);
      },
      error: function (e) {
        console.log(e);
        if (e.type == 17) {
          console.log("您已经在这个群组里了");
        }
      }
    })
  },

  /* 禁言管理 */
  //将成员禁言
  usermute: function () {
    WebIM.conn.mute({
      username: 'hfp3',
      muteDuration: 50000,
      groupId: '117200113434628',
      success: function (resp) {
        console.log('将指定群成员禁言成功！', resp);
      },
      error: function (e) {
        console.log('禁言失败', e);
      }
    })
  },
  //将成员解除禁言
  removeMute: function () {
    WebIM.conn.removeMute({
      groupId: "117200113434628",                  // 群组ID
      username: "hfp3",                    // 成员用户名
      success: function (resp) {
        console.log('将指定群成员解除禁言成功', resp);
      },
      error: function (e) {
        console.log('解除禁言失败~', e);
      }
    })
  },
  //获取群组下禁言成员
  getMuted: function () {
    WebIM.conn.getMuted({
      groupId: "117200113434628",                // 群组ID
      success: function (resp) {
        console.log('获取成功！', resp.data);
      },
      error: function (e) {
        console.log('获取失败~', e);
      }
    })
  },
  //群组中禁言所有成员
  allGroupMuted: function () {
    WebIM.conn.disableSendGroupMsg({
      groupId: '117200113434628',
      success: function (resp) {
        console.log('禁言全体群组成员成功', resp);
      },
      error: function (e) {
        console.log('禁言全体成员失败~', e);
      }
    })
  },
  //群组中解除禁言所有成员
  endAllgroupMuted: function () {
    WebIM.conn.enableSendGroupMsg({
      groupId: '117200113434628',
      success: function (resp) {
        console.log('解除禁言全体群组成员成功', resp);
      },
      error: function (e) {
        console.log('解除禁言全体成员失败~', e);
      }
    })
  },
  /* 白名单管理 */
  //添加用户到白名单
  addUserwhiteList: function () {
    WebIM.conn.addUsersToGroupWhitelist({
      groupId: "117200113434628", //群组id
      users: ["13031081380"], //成员id列表
      success: function (resp) {
        console.log('添加指定用户至白名单成功！', resp);
      },
      error: function (e) {
        console.log('添加至白名单失败~', e);
      }
    });
  },
  //将用户从白名单移除
  rmUserwhiteList: function () {
    WebIM.conn.rmUsersFromGroupWhitelist({
      groupId: "117200113434628", //群组id
      userName: ["13031081380"], //要移除的成员
      success: function (resp) {
        console.log('移除指定用户至白名单成功！', resp);
      },
      error: function (e) {
        console.log('添加至白名单失败~', e);
      }
    })
  },
  //从服务器获取白名单列表
  getUserwhiteList: function () {
    WebIM.conn.getGroupWhitelist({
      groupId: "117200113434628", //群组id
      success: function (resp) {
        console.log('>>>从服务器提取白名单列表成功', resp.data);
      },
      error: function (e) {
        console.log('获取失败！', e);
      }
    })
  },
  //查询群成员是否是白名单用户
  isGroupWhiteUser: function () {
    WebIM.conn.isGroupWhiteUser({
      groupId: "117200113434628", //群组id
      userName: "hfp", //要查询的成员
      success: function (resp) {
        console.log('>>>查询成功', resp.data.white);
      },
      error: function (e) {
        console.log('查询失败~', e);
      }
    })
  },
  /* 黑名单 */
  //将成员单个加入黑名单
  groupBlockSingle: function () {
    WebIM.conn.groupBlockSingle({
      groupId: '117200113434628',                     // 群组ID
      username: 'hfp3',                         // 将要被加入黑名单的用户名
      success: function (resp) {
        console.log("加入成功: ", resp.data);
      },
      error: function (e) {
        console.log('加入失败', e);
      }
    })
  },
  //将成员单个移出加入黑名单
  removeGroupBlockSingle: function () {
    WebIM.conn.removeGroupBlockSingle({
      groupId: "117200113434628",                     // 群组ID              
      username: "pfh",                             // 需要移除的用户名
      success: function (resp) {
        console.log("单个移出黑名单成功！", resp.data);
      },
      error: function (e) {
        console.log('移出失败~', e);
      }
    })
  },
  //将成员批量加入黑名单
  groupBlockMulti: function () {
    WebIM.conn.groupBlockMulti({
      groupId: '117200113434628',                         // 群组ID
      usernames: ['hfp','pfh'],          // 将要被加入黑名单的用户名数组
      success: function (resp) {
        console.log("批量群组成员拉黑成功~: ", resp.data);
      },
      error: function (e) {
        console.log('批量拉黑失败~', e);
      }
    })
  },
  //将成员批量移出黑名单
  // removeGroupBlockMulti: function () {
  //   //, ,
  //   var options = {
  //     groupId: '117200113434628',                         // 群组ID
  //     usernames: ['hfp','pfh'],          // 将要被加入黑名单的用户名数组
  //     success: function (resp) {
  //       console.log("批量群组成员移除黑名单成功~: ", resp.data);
  //     },
  //     error: function (e) {
  //       console.log('批量移除黑名单失败~', e);
  //     }
  //   }
  //   WebIM.conn.removeGroupBlockMulti(options)
  // },
  //获取群组黑名单列表
  getGroupBlacklistNew: function () {
    WebIM.conn.getGroupBlacklistNew({
      groupId: '117200113434628',
      success: function (list) {
        console.log('Get group black list: ', list.data);
      },
      error: function (e) {
        console.log('Get group black list 失败.', e);
      }
    })
  }
})