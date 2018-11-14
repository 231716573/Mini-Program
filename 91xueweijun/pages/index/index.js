//index.js
//获取应用实例
const ajax = require('../../utils/ajax.js')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasMore: true,
    categories: [],
    articles: [],
    cateId: 1,
    page: 1,
    pageSize: 10
  },
  cateActive(e) {
    // 切换 categories 样式
    let cateId = e.target.dataset.cateId
    this.setData({ cateId })

    // 取得列表
    this.loadView(cateId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = {
      token: wx.getStorageSync('token')
    }
    ajax('news/cats', params).then(res => {
      // console.log(res.data.data)
      if (res.data.code === 0) {
        this.setData({
          categories: res.data.data
        })
        this.loadView(res.data.data[0].cat_id)
      }
    })
  },
  loadView(id, page, pagesize) {
    var date = encodeURIComponent(util.formatTime(new Date()).replace(/\//g, '-'))

    if (id) {
      this.setData({
        articles: [],
        page: 1,
        page_size: 10,
        cateId: id,
        hasMore: true
      })
    }
    if (page) this.setData({ page })
    if (pagesize) this.setData({ pageSize: pagesize })
    // console.log(date)
    // 设置传递的参数
    let params = {
      page: this.data.page,
      cat_id: this.data.cateId,
      page_size: this.data.pageSize,
      time_line: date,
      token: wx.getStorageSync('token')
    }
    // 获取文章列表
    ajax('news/index', params).then(res => {
      // console.log(res.data)
      if (res.data.data.list.length <= 0) {
        this.setData({ hasMore: false })
        return
      }
      const articles = this.data.articles.concat(res.data.data.list)
      if (res.data.code === 0) {
        this.setData({ articles })
        // console.log(this.data.articles)
      }
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
    this.setData({
      page: 1,
      articles: []
    })
    this.loadView()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({ page: this.data.page + 1 })
    this.loadView()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
