var md5 = require('../../utils/md5.js')
var config = require('../../utils/config.js')
var app = getApp()

// pages/sm1/sm1.js
var startX;
var startY;
var moveX;
var moveY;
var endX;
var endY;
var moveKey;
var historyIndex = 0;
// 获取屏幕宽度
var windowWidth = wx.getSystemInfoSync().windowWidth;
var sm7windowWidth = wx.getSystemInfoSync().windowWidth;
var Md5_key = 's5o79t8m3u4rJ1FS2';
var Md5_date = (new Date()).getTime();
var Md5_sign = md5.md5(`${Md5_key}${Md5_date}`);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstName: wx.getStorageSync('params').xing + wx.getStorageSync('params').ming,
    firstSex: wx.getStorageSync('params').xingbie,
    sex: ['男性', '女性'],
    sexFirst: 0,
    sexSecond: 1,
    secondName: '',
    name: ['单姓', '复姓'],
    nameFirst: 0,
    nameSecond: 0,
    sm: {
      arr: ["第一章 生辰", "第二章 八字", "第三章 姓名", "第四章 日干", "第五章 称骨", "第六章 姻缘"]
    },
    sm1Show: false,
    sm2Show: false,
    sm3Show: false,
    sm4Show: false,
    sm5Show: false,
    sm6Show: false,
    currentIndex: 0,
    year1: '2018-01-01',
    time1: '00:00',
    year2: '2018-01-01',
    time2: '00:00',
    xing1: '0',
    name2: '嘎嘎嘎',
    xing2: '0',
    sex2: '女',
    sm7Left: windowWidth
  },
  // 以下皆为姻缘
  bindYear1Change(e) {
    this.setData({
      year1: e.detail.value
    })
  },
  bindTime1Change(e) {
    this.setData({
      time1: e.detail.value
    })
  },
  bindYear2Change(e) {
    this.setData({
      year2: e.detail.value
    })
  },
  bindTime2Change(e) {
    this.setData({
      time2: e.detail.value
    })
  },
  // 以上皆为姻缘
  bindPickerSecondChange(e) {
    this.setData({
      sexSecond: e.detail.value
    })
  },
  bindPickerNameFirst(e) {
    this.setData({
      nameFirst: e.detail.value,
      xing1: e.detail.value
    })
  },
  bindPickerNameSecond(e) {
    this.setData({
      nameSecond: e.detail.value,
      xing2: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var storageParams = wx.getStorageSync('params');
    this.setData({
      year1: `${storageParams.nian}-${storageParams.yue}-${storageParams.ri}`
    })
    wx.showLoading({ title: '正在加载...' })
    wx.request({
      url: `${config.apiBase}/Sm/index/id/1/time/${Md5_date}/sign/${Md5_sign}`,
      data: wx.getStorageSync('params'),
      method: 'POST',
      success: (res) => {
        // console.log(res.data.data)
        if (res.data.code === 200) {
          this.setData({
            bazi: res.data.data,
            baziQt: app.convertHtmlToText(res.data.data.qt),
            baziSxgx: app.convertHtmlToText(res.data.data.sxgx),
            baziYrsml: app.convertHtmlToText(res.data.data.yrsml),
            sm1Show: true
          })
        }
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  // 滑动切换tab 
  bindChange(e) {
    // console.log(e.detail.current)
    this.setData({ currentIndex: e.detail.current });
    switch (e.detail.current) {
      case 1:
        if (this.data.sm2Show) {
          return
        }
        wx.showLoading({ title: '正在加载...' })
        wx.request({
          url: `${config.apiBase}/Sm/index/id/2/time/${Md5_date}/sign/${Md5_sign}`,
          data: wx.getStorageSync('params'),
          method: 'POST',
          success: (res) => {
            // console.log(res.data)
            if (res.data.code === 200) {
              this.setData({
                shengchen: res.data.data,
                sm2Show: true,
                shengchenQzdy: app.convertHtmlToText(res.data.data.qzdy),
                shengchenXgfx: app.convertHtmlToText(res.data.data.xgfx),
                shengchenMzjp: app.convertHtmlToText(res.data.data.mzjp)
              })
            }
          },
          complete: () => {
            wx.hideLoading()
          }
        })
        break;
      case 2:
        if (this.data.sm3Show) {
          return
        }
        wx.showLoading({ title: '正在加载...' })
        wx.request({
          url: `${config.apiBase}/Sm/index/id/5/time/${Md5_date}/sign/${Md5_sign}`,
          data: wx.getStorageSync('params'),
          method: 'POST',
          success: (res) => {
            console.log(res.data)
            if (res.data.code === 200) {
              this.setData({
                xingming: res.data.data,
                xingmingQt: app.convertHtmlToText(res.data.data.qt),
                xingmingTgjx: app.convertHtmlToText(res.data.data.tgjx),
                xingmingRgjx: app.convertHtmlToText(res.data.data.rgjx),
                xingmingDgjx: app.convertHtmlToText(res.data.data.dgjx),
                xingmingZgjx: app.convertHtmlToText(res.data.data.zgjx),
                xingmingWgjx: app.convertHtmlToText(res.data.data.wgjx),
                xingmingDscslyx: app.convertHtmlToText(res.data.data.dscslyx),
                xingmingDjcyyx: app.convertHtmlToText(res.data.data.djcyyx),
                xingmingDcgyyx: app.convertHtmlToText(res.data.data.dcgyyx),
                xingmingDrjgxyx: app.convertHtmlToText(res.data.data.drjgxyx),
                xingmingDxgyx: app.convertHtmlToText(res.data.data.dxgyx),
                xingmingRgslas: app.convertHtmlToText(res.data.data.rgslas),
                xingmingDgslas: app.convertHtmlToText(res.data.data.dgslas),
                xingmingZgslas: app.convertHtmlToText(res.data.data.zgslas),
                xingmingWgslas: app.convertHtmlToText(res.data.data.wgslas),
                xingmingZpjy: app.convertHtmlToText(res.data.data.zpjy),
                xingmingNum: res.data.data.num,
                sm3Show: true
              })
            }
          },
          complete: () => {
            wx.hideLoading()
          }
        })
        break;
      case 3:
        if (this.data.sm4Show) {
          return
        }
        wx.showLoading({ title: '正在加载...' })
        wx.request({
          url: `${config.apiBase}/Sm/index/id/3/time/${Md5_date}/sign/${Md5_sign}`,
          data: wx.getStorageSync('params'),
          method: 'POST',
          success: (res) => {
            // console.log(res.data)
            if (res.data.code === 200) {
              this.setData({
                rigan: res.data.data,
                riganQt: app.convertHtmlToText(res.data.data.qt),
                riganSxgx: app.convertHtmlToText(res.data.data.sxgx),
                riganXgfx: app.convertHtmlToText(res.data.data.xgfx),
                riganAqfx: app.convertHtmlToText(res.data.data.aqfx),
                riganSyfx: app.convertHtmlToText(res.data.data.syfx),
                riganCyfx: app.convertHtmlToText(res.data.data.cyfx),
                sm4Show: true
              })
            }
          },
          complete: () => {
            wx.hideLoading()
          }
        })
        break;
      case 4:
        if (this.data.sm5Show) {
          return
        }
        wx.showLoading({ title: '正在加载...' })
        wx.request({
          url: `${config.apiBase}/Sm/index/id/4/time/${Md5_date}/sign/${Md5_sign}`,
          data: wx.getStorageSync('params'),
          method: 'POST',
          success: (res) => {
            // console.log(res.data)
            if (res.data.code === 200) {
              this.setData({
                chengu: res.data.data,
                chenguMsjs: app.convertHtmlToText(res.data.data.msjs),
                chenguMs: app.convertHtmlToTextCG(res.data.data.ms),
                sm5Show: true
              })
            }
          },
          complete: () => {
            wx.hideLoading()
          }
        })
        break;
    }

  },
  // 点击tab切换 
  swichNav(e) {
    if (this.data.currentIndex === e.target.dataset.current) {
      return false;
    } else {
      this.setData({ currentIndex: e.target.dataset.current })
    }
  },
  // 设置姻缘第二个名字
  YYsecondName(e) {
    this.setData({ secondName: e.detail.value })
  },
  // 开始姻缘配对
  startYY() {
    var year1 = this.data.year1.split('-')[0]
    var month1 = this.data.year1.split('-')[1]
    var day1 = this.data.year1.split('-')[2]
    var hour1 = this.data.time1.split(':')[0]
    var minute1 = this.data.time1.split(':')[1]

    var year2 = this.data.year2.split('-')[0]
    var month2 = this.data.year2.split('-')[1]
    var day2 = this.data.year2.split('-')[2]
    var hour2 = this.data.time2.split(':')[0]
    var minute2 = this.data.time2.split(':')[1]

    var sexcond = String(this.data.sex[this.data.sexSecond].replace('性', ''))
    // 设置新的提交参数
    var newParams = Object.assign(wx.getStorageSync('params'), {
      act: 'ok',
      y1: year1,
      y2: year2,
      m1: month1,
      m1: month2,
      d1: day1,
      d2: day2,
      h1: hour1,
      h2: hour2,
      f1: minute1,
      f2: minute2,
      name1: this.data.firstName,
      name2: this.data.secondName,
      xing1: Number(this.data.xing1) + 1,
      xing2: Number(this.data.xing2) + 1,
      sex1: this.data.firstSex,
      sex2: sexcond
    })
    console.log(newParams)
    wx.showLoading({ title: '正在加载...' })
    wx.request({
      url: `${config.apiBase}/Sm/index/id/6/time/${Md5_date}/sign/${Md5_sign}`,
      data: newParams,
      method: 'POST',
      success: (res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.setData({
            sm7: res.data.data,
            sm7Xmyfzs: app.convertHtmlToText(res.data.data.xmyfzs),
            sm7Name1: app.convertHtmlToText(res.data.data.name1),
            sm7Name2: app.convertHtmlToText(res.data.data.name2)
          })
          var timer = setInterval(() => {
            this.setData({ sm7Left: sm7windowWidth-- })

            if (sm7windowWidth <= 0) {
              this.setData({ sm7Left: 0 })
              clearInterval(timer)
            }
          }, 1)
        }
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  hideSm7() {
    var timer = setInterval(() => {
      this.setData({ sm7Left: sm7windowWidth++ })

      if (sm7windowWidth >= windowWidth) {
        this.setData({ sm7Left: windowWidth })
        clearInterval(timer)
      }
    }, 1)
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
    console.log("onShareAppMessage")
  }
})