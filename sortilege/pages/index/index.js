var md5 = require('../../utils/md5.js')
var config = require('../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    calculateButton: false,
    xing: '',
    ming: '',
    sex: ['男', '女'],
    sexIndex: 0,
    xue: ['A', 'B', 'AB', 'O'],
    xueIndex: 0,
    dateYear: '2018-01-01',
    hh: ['子 0', '丑 1', '丑 2', '寅 3', '寅 4', '卯 5', '卯 6', '辰 7', '辰 8', '巳 9', '巳 10', '午 11', '午 12', '未 13', '未 14', '申 15', '申 16', '酉 17', '酉 18', '戌 19', '戌 20', '亥 21', '亥 22', '子 23'],
    hhIndex: 0, 
    slides: ['https://git.play800.cn/static/images/top1.png', 'https://git.play800.cn/static/images/ios-36.jpg', 'https://git.play800.cn/static/images/android-36.jpg'],
    prays: [
      { id: 0, img: '/assets/gylq.gif', title: '观音签', link: '../guanyin/guanyin' },
      { id: 0, img: '/assets/yzlq.gif', title: '吕祖签', link: '../lvzu/lvzu' },
      { id: 0, img: '/assets/dxlq.gif', title: '大仙签', link: '../daxian/daxian' },
      { id: 0, img: '/assets/dmgdm.gif', title: '关公签', link: '../guandi/guandi' },
      { id: 0, img: '/assets/thlq.gif', title: '天后签', link: '../tianhou/tianhou' },
      { id: 0, img: '/assets/zgcz.gif', title: '诸葛测字', link: '../zhuge/zhuge' }
    ]
  },
  bindXingChange(e) {
    this.setData({
      xing: e.detail.value
    })
  },
  bindMingChange(e) {
    this.setData({
      ming: e.detail.value
    })
  },
  bindPickerChange(e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindYearChange(e) {
    this.setData({
      dateYear: e.detail.value
    })
  },
  bindhhChange(e) {
    this.setData({
      hhIndex: e.detail.value
    })
  },
  bindXueChange(e) {
    this.setData({
      xueIndex: e.detail.value
    })
  },
  calculate(e) {
    // console.log(this.data.xue[this.data.xueIndex])
    // 姓
    if (this.data.xing == '') {
      wx.showToast({
        title: '姓 不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    // 名
    if (this.data.ming == '') {
      wx.showToast({
        title: '名 不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    // 性别
    let xingbie = this.data.sexIndex == 0 ? '男' : '女'
    // 血型
    let xuexing = this.data.xue[this.data.xueIndex]
    // 生辰年月日
    let nian = this.data.dateYear.split('-')[0]
    let yue = this.data.dateYear.split('-')[1]
    let ri = this.data.dateYear.split('-')[2]
    // 生辰十二地支
    let hh = String(this.data.hhIndex)

    const params = {
      xing: this.data.xing,
      ming: this.data.ming,
      xingbie,
      xuexing,
      nian,
      yue,
      ri,
      hh
    }
    wx.playBackgroundAudio({
      dataUrl: 'https://git.play800.cn/static/images/bazi.wav'
    })

    let Md5_key = 's5o79t8m3u4rJ1FS2';
    let Md5_date = (new Date()).getTime();
    let Md5_sign = md5.md5(`${Md5_key}${Md5_date}`)
    // console.log(key + '、' + date)
    // console.log(md5.md5(`${key}${date}`))
    wx.showLoading({
      title: '正在测算八字',
    })
    this.setData({ calculateButton: true })
    wx.request({
      url: `${config.apiBase}/Sm/index/time/${Md5_date}/sign/${Md5_sign}`,
      data: params,
      method: 'POST',
      success: (res) => {
        console.log(res.data)
        wx.setStorageSync('bazi', res.data.data)
        wx.setStorageSync('params', params)
        
        wx.navigateTo({
          url: '../sm1/sm1',
        })
      },
      complete: () => {
        wx.hideLoading()
        setTimeout(() => {
          this.setData({ calculateButton: false })
        }, 1000)
      }
    })
  },
  previewImage(e) {
    var current = e.target.dataset.src;
    // console.log(current)
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.slides // 需要预览的图片http链接列表  
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    let Md5_date = (new Date()).getTime();
    let storageTime = wx.getStorageSync('storageTime') ? wx.getStorageSync('storageTime') : 0;

    if (wx.getStorageSync('storageTime') && Md5_date - storageTime >= (24 * 60 * 60 * 1000)) {
      wx.removeStorageSync('storageTime')
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    
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
    
  }
})