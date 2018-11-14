//app.js
App({
  onLaunch: function () {
    wx.setStorageSync('token', '503a60140bb111e8b64800163e06132a')
  },
  config: {
    apiBase: "http://api.xueweijun.com/v1/"
  }
})