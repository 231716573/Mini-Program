// pages/detail/detail.js
const fetch = require('../../utils/fetch.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: {}
  },
  previewHandle(e) {
    wx.previewImage({
      urls: this.data.shop.images,
      current: e.target.dataset.src
    })
  },
  // 不明原因出错
  previewHandleView(e) {
    let image = this.data.shop.comments[e.currentTarget.dataset.current].images
    wx.previewImage({
      urls: image,
      current: e.currentTarget.dataset.viewSrc
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    fetch(`/shops/${options.item}`).then(res => {
      console.log(res.data)
      this.setData({ shop: res.data })
      wx.setNavigationBarTitle({
        title: res.data.name
      })
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