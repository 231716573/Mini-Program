//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

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
  },
  convertHtmlToText: function convertHtmlToText(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<\/div>/ig, '');
    returnText = returnText.replace(/<\/li>/ig, '\n');
    returnText = returnText.replace(/<li>/ig, ' * ');
    returnText = returnText.replace(/<\/ul>/ig, '\n');
    //  删除 br ，保留一个换行
    returnText = returnText.replace(/\r/gi, "");
    returnText = returnText.replace(/\|/gi, "\n");
    returnText = returnText.replace(/^<br\s*[\/]?>/gi, "");
    returnText = returnText.replace(/<br\s*[\/]?>$/gi, "");
    returnText = returnText.replace(/<br\s*[\/]?>/gi, "\n");
    returnText = returnText.replace(/&nbsp;/gi, "");
    returnText = returnText.replace(/&gt;/gi, ">");

    //  删除 p 标签，删除 a 标签，保留 a 里面的内容
    returnText = returnText.replace(/<p.*?>/gi, "\n");
    returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

    //  删除所有带有 script 跟 style 的标签
    returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //  弄掉所有标签
    returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

    //  去掉多于 2 条的换行符
    returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

    //  弄掉空格
    returnText = returnText.replace(/ +(?= )/g, '');

    //  去掉HTML编码的字符
    returnText = returnText.replace(/ /gi, " ");
    returnText = returnText.replace(/&/gi, "&");
    returnText = returnText.replace(/"/gi, '"');
    returnText = returnText.replace(/</gi, '<');
    returnText = returnText.replace(/>/gi, '>');

    return returnText;
  },
  convertHtmlToTextColor: function convertHtmlToTextColor(inputText, color) {
    var returnText = inputText.replace(/(.*)：(.*)/gi, "$1:<text class='color:"+color+";'>$2</text>");

    return returnText
  },
  convertHtmlToTextCG: function convertHtmlToTextCG(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<br\s*[\/]?>/gi, "");
    returnText = returnText.replace(/[;；,.，。?？]/gi, "\n");

    return returnText
  }

})