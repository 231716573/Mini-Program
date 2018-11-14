Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: ['男', '女'],
    sexIndex: 0,
    dateYear: '2018-01-01',
    hh: ['子 0', '丑 1', '丑 2', '寅 3', '寅 4', '卯 5', '卯 6', '辰 7', '辰 8', '巳 9', '巳 10', '午 11', '午 12', '未 13', '未 14', '申 15', '申 16', '酉 17', '酉 18', '戌 19', '戌 20', '亥 21', '亥 22', '子 23'],
    hhIndex: 0,
    slides: [
      { id: 0, img: 'http://ww1.sinaimg.cn/mw690/006ThXL5ly1fj7zx3w751j30u00dmgy3.jpg', link: '123' },
      { id: 1, img: 'http://ww1.sinaimg.cn/mw690/006ThXL5ly1fj6ckx9tlwj30u00fqk8n.jpg', link: '456' }
    ],
    prays: [
      { id: 0, img: '/assets/gylq.gif', title: '观音签', link: '123' },
      { id: 0, img: '/assets/yzlq.gif', title: '吕祖签', link: '123' },
      { id: 0, img: '/assets/dxlq.gif', title: '大仙签', link: '123' },
      { id: 0, img: '/assets/dmgdm.gif', title: '关公签', link: '123' },
      { id: 0, img: '/assets/thlq.gif', title: '天后签', link: '123' },
      { id: 0, img: '/assets/zgcz.gif', title: '诸葛测字', link: '123' }
    ]
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function () {

  }
})