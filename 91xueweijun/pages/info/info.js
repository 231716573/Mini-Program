// pages/info/info.js
const ajax = require('../../utils/ajax.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    school: {},
    picList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getDetail(options)
  },
  _getDetail(e) {
    wx.showLoading({ title: 'Loading...' })
    const params = {
      id: e.id,
      token: wx.getStorageSync('token')
    }
    wx.request({
      url: `http://api.school.xueweijun.com/v1/school/${e.id}`,
      data: params,
      success: (data) => {
        if (data.data.code == 0) {
          this.setData({
            school: data.data.data,
            picList: [
              { img: data.data.data.pic1 },
              { img: data.data.data.pic2 },
              { img: data.data.data.pic3 },
              { img: data.data.data.pic4 },
              { img: data.data.data.pic5 },
              { img: data.data.data.pic6 }
            ]
          })
        }
        // console.log(this.data.school)
      },
      complete: wx.hideLoading
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