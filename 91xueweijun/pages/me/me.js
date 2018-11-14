// pages/me/me.js
const fetch = require('../../utils/ajax.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    person: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      url: 'http://39.108.85.101:8003/guanYin/index/id/89',
      data: {

      },
      success: function (res) {
        console.log(res.data)
      }
    })

    this._getPersonal()
  },
  _getPersonal() {
    const params = { token: wx.getStorageSync('token') }
    fetch('getchildren', params).then(res => {
      // console.log(res)
      if (res.data.code == 0) {
        this.setData({ person: res.data.data })
      }
      // console.log(this.data.person)
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
  onShareAppMessage: function () {

  }
})