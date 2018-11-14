// pages/school/school.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolType: [],
    schoolList: [],
    page: 1,
    hasSelect: true,
    itemType: '',
    schoolBar: false,
    grade: '0',
    section: '0',
    category: '0',
    categoryItem: [
      { id: 0, name: '全部', sort: 0, active: 1 },
      { id: 1, name: '公办', sort: 1, active: 0 },
      { id: 2, name: '民办', sort: 2, active: 0 }
    ],
    sectionItem: [
      { id: 0, name: '全部', sort: 0, active: 1 },
      { id: 1, name: '小学', sort: 1, active: 0 },
      { id: 2, name: '初中', sort: 7, active: 0 }
    ],
    gradeItem: [
      { id: 0, name: '全部', sort: 0, active: 1 },
      { id: 1, name: '区一级', sort: 1, active: 0 },
      { id: 2, name: '市一级', sort: 2, active: 0 },
      { id: 3, name: '省一级', sort: 3, active: 0 }
    ]
  },
  // 隐藏背景暗影层
  hideShcoolBarBg() {
    this.setData({ schoolBar: false, itemType: '' })
    // 判断是否点了三大类型里面的分类，有点就加载，没点就直接隐藏背景层
    if (this.data.hasSelect) {
      this.setData({ page: 1, schoolList: [] })
      this._getDetail()
    }
  },
  // 选择类型里面的分类
  selectSchoolType(e) {
    // console.log(e.target.dataset.itemId)
    let itemId = e.target.dataset.itemId
    // console.log(this.data.schoolType)
    for (let i in this.data.schoolType) {
      this.data.schoolType[i].active = 0
    }
    this.data.schoolType[itemId].active = 1

    switch (this.data.itemType) {
      case 'grade':
        this.setData({
          gradeItem: this.data.schoolType,
          grade: itemId
        })
        break;
      case 'section':
        this.setData({
          sectionItem: this.data.schoolType,
          section: itemId
        })
        break;
      case 'category':
        this.setData({
          categoryItem: this.data.schoolType,
          category: itemId
        })
        break;
    }

    // 确定三大类型里面的分类已经被选择，可以设置 hasSelect: true
    this.setData({ schoolType: this.data.schoolType, hasSelect: true })
  },
  // 选择三个大类型
  selectType(e) {
    // console.log(e.target.dataset.schoolType)
    // 默认里面的分类没有被选择，hasSelect: false
    this.setData({ schoolBar: true, hasSelect: false })

    switch (e.target.dataset.schoolType) {
      case '2':
        this.setData({
          itemType: 'grade',
          schoolType: this.data.gradeItem
        })
        break;
      case '1':
        this.setData({
          itemType: 'section',
          schoolType: this.data.sectionItem
        })
        break;
      case '0':
        this.setData({
          itemType: 'category',
          schoolType: this.data.categoryItem
        })
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getDetail()
  },
  // 获取学校列表
  _getDetail() {
    wx.showLoading({ title: 'Loading...' })
    const data = {
      page: this.data.page,
      pageSize: 10,
      city: '4403',
      token: wx.getStorageSync('token')
    }
    let params = data

    if (this.data.grade != 0) {
      params = Object.assign(data, { grade: this.data.grade })
    }
    if (this.data.section != 0) {
      params = Object.assign(data, { section: this.data.section })
    }
    if (this.data.category != 0) {
      params = Object.assign(data, { category: this.data.category })
    }
    // console.log(params)
    wx.request({
      url: 'http://api.school.xueweijun.com/v1/school/schoolList',
      data: params,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (data) => {
        if (data.data.code == 0) {
          // console.log(data.data.data)
          const schoolList = this.data.schoolList.concat(data.data.data.school_list)
          this.setData({
            schoolList
          })
        }
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
    this.setData({ page: 1, schoolList: [] })
    this._getDetail()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({ page: this.data.page + 1 })
    this._getDetail()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})