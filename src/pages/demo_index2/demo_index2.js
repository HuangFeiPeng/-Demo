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
        groupname: 'hfp的小程序群创建测试2',                    // 群组名
        desc: 'hfp群组创建测试',                          // 群组描述
        members: ["13031081380", "wx1990", "pfh", "omg2"],            // 用户名组成的数组
        public: true,                         // pub等于true时，创建为公开群
        approval: false,                  // approval为true，加群需审批，为false时加群无需审批
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
          console.log('群文件获取成功！',resp);
        },
        error: function (e) { 
          console.log('群文件获取失败!',e);
        },
      }
    )
  },
  //下载群文件
  downloadGoupFlie: function(){
    debugger;
    let fileId = 'f18284b0-a579-11ea-959f-cd9e213db55f'
    WebIM.conn.downloadGroupSharedFile({
      groupId: '117200113434628',
      fileId: fileId
    })
  },
  /* 群成员管理 */
  //查询群组成员

})