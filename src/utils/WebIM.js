import websdk from "../sdk/wxsdk3.1.4"; //引入sdk文件；
import config from "../utils/WebIMConfig"; //引入WebIMConfig配置文件；

var window = {};
let WebIM = window.WebIM = websdk;
window.WebIM.config = config;

WebIM.conn = new WebIM.connection({
  appKey: WebIM.config.appkey,
  isMultiLoginSessions: false, //是否可以登录多个网页，并在所有网页上接收消息
  https: typeof WebIM.config.https === "boolean" ? WebIM.config.https : location.protocol === "https:", //是否使用HTTPS 
  url: WebIM.config.xmppURL, //XMPP server
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: false, //自动登录
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax, //自动重连次数
  autoReconnectInterval: WebIM.config.autoReconnectInterval, //每个重新连接之间的间隔秒, 自动重连次数大于1时有效。
});
module.exports = {
	"default": WebIM
};
