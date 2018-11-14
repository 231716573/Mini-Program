// pages/lvzu/lvzu.js
var md5 = require('../../utils/md5.js')
var config = require('../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShare: true,
    zhibeiGif: '/assets/zhibei.gif',
    zhibeiTime: 0,
    zhibeiBool: false,
    beiGif: '/assets/sign1.gif',
    showZhibei: false,
    showQianci: false,
    hideGuanyinTop: -100,
    guanyin: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let Md5_key = 's5o79t8m3u4rJ1FS2';
    let Md5_date = (new Date()).getTime();
    let Md5_sign = md5.md5(`${Md5_key}${Md5_date}`)
    
    let storageTime = wx.getStorageSync('storageTime') ? wx.getStorageSync('storageTime') : 0;
    if (wx.getStorageSync('storageTime') && Md5_date - storageTime <= (24 * 60 * 60 * 1000)) {
      this.setData({ isShare: false })
    }
    // console.log(key + '、' + date)
    // console.log(md5.md5(`${key}${date}`))
    wx.request({
      url: `${config.apiBase}/Lq/guandi/time/${Md5_date}/sign/${Md5_sign}`,
      data: {
        id: Math.ceil(Math.random() * 100 + 1)
      },
      method: 'POST',
      success: (res) => {
        if (res.data.code == 200) {
          // console.log(res.data.data)
          this.setData({ guanyin: res.data.data })
        }
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  zhibeiGif() {
    if (this.data.zhibeiBool) return
    // 点击掷杯次数
    this.setData({ zhibeiTime: this.data.zhibeiTime + 1 })
    wx.playBackgroundAudio({
      dataUrl: 'https://git.play800.cn/static/images/shake.wav'
    })
    let beiGifArray = ['/assets/sign1.gif', '/assets/sign2.gif', '/assets/sign2.gif', '/assets/sign3.gif', '/assets/sign3.gif']
    let beiRandom = Math.floor(Math.random() * 5)

    this.setData({ beiGif: beiGifArray[beiRandom] })
    if (beiRandom == 0) {
      this.setData({ zhibeiBool: true })
      return
    }
    

    switch ((this.data.zhibeiTime)) {
      case 1:
        this.setData({ zhibeiGif: '/assets/zhibei2.gif' })
        break;
      case 2:
        this.setData({ zhibeiGif: '/assets/zhibei3.gif' })
        break;
      case 3:
        this.setData({
          zhibeiGif: '/assets/zhibei4.gif',
          showQianci: true
        })
        wx.playBackgroundAudio({
          dataUrl: 'https://git.play800.cn/static/images/result.wav'
        })
        break;
    }

  },
  zhibeiFlase() {
    this.setData({
      zhibeiGif: '/assets/zhibei.gif',
      zhibeiTime: 0,
      zhibeiBool: false,
      beiGif: '/assets/sign2.gif',
      showZhibei: false,
      showQianci: false
    })
  },
  showZhibei() {
    this.setData({ showZhibei: true })
  },
  showQianci() {
    console.log('showQianci')
    var flag = setInterval(() => {
      this.setData({ hideGuanyinTop: this.data.hideGuanyinTop + 1 })
      if (this.data.hideGuanyinTop >= 0) {
        clearInterval(flag)
      }
    }, 12)


  },
  hideGuanyin() {
    var flag = setInterval(() => {
      this.setData({ hideGuanyinTop: this.data.hideGuanyinTop - 1 })
      if (this.data.hideGuanyinTop < -100) {
        clearInterval(flag)
      }
    }, 12)
  },
  shareBool() {
    wx.showToast({
      title: '点击右上方，转发后即可开始抽签',
      icon: 'none'
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '生辰八字_日干论命_姓名分析_最准最全',
      path: '/index/index',
      success: (res) => {
        this.setData({ isShare: false })
        wx.setStorageSync('storageTime', new Date().getTime())
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享失败',
          icon: 'warn'
        })
      }
    }
  }
})