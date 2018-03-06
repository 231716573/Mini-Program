// pages/list/list.js
const fetch = require('../../utils/fetch.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: {},
    shops: [],
    pageIndex: 0,
    pageSize: 20,
    totalCount: 0,
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  loadMore() {
    if (!this.data.hasMore) return

    // 从this.data 里面去 pageIndex 和 pageSize
    let { pageIndex, pageSize } = this.data
    let params = { _page: ++pageIndex, _limit: pageSize }

    fetch(`/categories/${this.data.category.id}/shops`, params).then(res => {
      const totalCount = parseInt(res.header['X-Total-Count'])
      const hasMore = this.data.pageIndex * this.data.pageSize < totalCount 
      const shops = this.data.shops.concat(res.data)
      this.setData({
        shops,
        pageIndex,
        hasMore
      })
      // console.log(this.data.shops)
    })
  },
  onLoad: function (options) {
    fetch(`/categories/${options.cat}`).then(res => {
      // console.log(res.data)
      this.setData({ category: res.data })
      wx.setNavigationBarTitle({
        title: res.data.name
      })

      // 加载完分类信息后再去加载商铺信息
      this.loadMore()
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
    // 重新加载
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
    this.loadMore()
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断是否正在加载，防止触发加载多次的问题
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})