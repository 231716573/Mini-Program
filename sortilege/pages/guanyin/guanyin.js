// pages/guanyin/guanyin.js
var md5 = require('../../utils/md5.js')
var config = require('../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSee: false,
    isShare: false,
    guanyinSign: '/assets/qian.png',
    signTime: 0,
    guanyinZhibei: '/assets/zhibei_05.jpg',
    zhibeiTime: 0,
    hideGuanyinTop: -100,
    gongwei: '',
    gushi: '',
    jieqian: '',
    jieyue: '',
    name: '',
    shangxia: '',
    shiyi: '',
    shiyue: '',
    title: '',
    xianji: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.removeStorageSync('seeSign')
    this.setData({ guanyinSign: '/assets/qian.gif' })

    let Md5_date = (new Date()).getTime();
    let storageTime = wx.getStorageSync('storageTime') ? wx.getStorageSync('storageTime') : 0;
    if (wx.getStorageSync('storageTime') && Md5_date - storageTime <= (24 * 60 * 60 * 1000)) {
      this.setData({ isShare: false })
    }

    wx.onAccelerometerChange((e) => {
      if (e.x > 1) {

        isShow: false
        this.setData({ zhibeiTime: this.data.zhibeiTime + 1 })
        wx.playBackgroundAudio({
          dataUrl: 'https://git.play800.cn/static/images/shake.wav'
        })
        switch (this.data.zhibeiTime) {
          case 1:
            this.setData({ guanyinZhibei: '/assets/zhibei_02.png' })
            break;
          case 2:
            this.setData({ guanyinZhibei: '/assets/zhibei_03.png' })
            break;
          case 3:
            wx.showToast({
              title: '摇签成功',
              icon: 'success',
              duration: 2000
            })
            wx.playBackgroundAudio({
              dataUrl: 'https://git.play800.cn/static/images/result.wav'
            })
            this.setData({
              guanyinZhibei: '/assets/zhibei_03.png',
              guanyinSign: '/assets/qian.png',
              isShare: true
            })
            wx.stopAccelerometer()
            break;
        }
        // console.log(this.data.zhibeiTime)

        // if (this.data.zhibeiTime > 3) {
        //   wx.stopAccelerometer()
        //   return
        // }
      }
    })
  },
  startSign(e) {
    if (this.data.zhibeiTime > 3) {
      return
    }
    this.setData({ guanyinSign: '/assets/qian.gif' })

    wx.onAccelerometerChange((e) => {
      if (e.x > 1) {
        wx.showToast({
          title: '摇签成功',
          icon: 'success',
          duration: 2000
        })
        wx.playBackgroundAudio({
          dataUrl: 'https://git.play800.cn/static/images/shake.wav'
        })
        isShow: false
        this.setData({
          zhibeiTime: this.data.zhibeiTime + 1,
          guanyinSign: '/assets/qian.png'
        })

        switch (this.data.zhibeiTime) {
          case 1:
            this.setData({ guanyinZhibei: '/assets/zhibei_02.png' })
            break;
          case 3:
            this.setData({ guanyinZhibei: '/assets/zhibei_03.png' })
            break;
        }

        wx.stopAccelerometer()
      }
    })
  },
  seeSign(e) {
    if (this.data.isSee == true) {
      var flag = setInterval(() => {
        this.setData({ hideGuanyinTop: this.data.hideGuanyinTop + 1 })
        if (this.data.hideGuanyinTop >= 0) {
          clearInterval(flag)
        }
      }, 12)
      return
    }
    console.log(this.data.zhibeiTime)

    let params = wx.getStorageSync('seeSign') ? wx.getStorageSync('seeSign') : Math.ceil(Math.random() * 100 + 1)
    //Math.ceil(Math.random() * 100 + 1)
    let Md5_key = 's5o79t8m3u4rJ1FS2';
    let Md5_date = (new Date()).getTime();
    let Md5_sign = md5.md5(`${Md5_key}${Md5_date}`)
    // console.log(key + '、' + date)
    // console.log(md5.md5(`${key}${date}`))
    wx.showLoading({
      title: '正在解签',
    })
    wx.request({
      url: `${config.apiBase}/Lq/guanyin/time/${Md5_date}/sign/${Md5_sign}`,
      data: {
        id: params
      },
      method: 'POST',
      success: (res) => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        // console.log(res.data)
        wx.setStorageSync('seeSign', params)

        var flag = setInterval(() => {
          this.setData({ hideGuanyinTop: this.data.hideGuanyinTop + 1, isSee: true })
          if (this.data.hideGuanyinTop >= 0) {
            clearInterval(flag)
          }
        }, 12)
        if (res.data.code == 200) {
          this.setData({
            gongwei: res.data.data.gongwei,
            gushi: res.data.data.gushi,
            jieqian: res.data.data.jieqian,
            jieyue: res.data.data.jieyue,
            name: res.data.data.name,
            shangxia: res.data.data.shangxia,
            shiyi: res.data.data.shiyi,
            shiyue: res.data.data.shiyue,
            title: res.data.data.title,
            xianji: res.data.data.xianji
          })
        }
      },
      complete: () => {
        wx.hideLoading()
      }
    })

  },
  hideGuanyin(e) {
    var flag = setInterval(() => {
      this.setData({ hideGuanyinTop: this.data.hideGuanyinTop - 1 })
      if (this.data.hideGuanyinTop < -100) {
        clearInterval(flag)
      }
    }, 12)
  },
  shareBool() {
    wx.showToast({
      title: '点击右上方，转发后即可开始摇签',
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
        this.seeSign()
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})