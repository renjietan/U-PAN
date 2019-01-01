// pages/my/farmingRecord/farmingRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    steps: [
      {
        text: '2018-03-06',
        isEditStatus: true,
        intro:"投放饲料",
        desc: '张三、李四投放饲料30公斤、，苗种10公斤、放水一小时、张三、李四投放饲料30公斤、，苗种10公斤、放水一小时'
      },
      {
        text: '2018-03-05',
        isEditStatus: false,
        intro: "投放饲料",
        desc: '张三、李四投放饲料30公斤、，苗种10公斤、放水一小时、张三、李四投放饲料30公斤、，苗种10公斤、放水一小时'
      },
      {
        text: '2018-03-05',
        isEditStatus: false,
        intro: "投放饲料",
        desc: '张三、李四投放饲料30公斤、，苗种10公斤、放水一小时、张三、李四投放饲料30公斤、，苗种10公斤、放水一小时'
      },
      {
        text: '2018-03-05',
        isEditStatus: false,
        intro: "投放饲料",
        desc: '张三、李四投放饲料30公斤、，苗种10公斤、放水一小时、张三、李四投放饲料30公斤、，苗种10公斤、放水一小时'
      },
      {
        text: '2018-03-05',
        isEditStatus: false,
        intro: "投放饲料",
        desc: '张三、李四投放饲料30公斤、，苗种10公斤、放水一小时、张三、李四投放饲料30公斤、，苗种10公斤、放水一小时'
      },
      {
        text: '2018-03-05',
        isEditStatus: false,
        intro: "投放饲料",
        desc: '张三、李四投放饲料30公斤、，苗种10公斤、放水一小时、张三、李四投放饲料30公斤、，苗种10公斤、放水一小时'
      },
      {
        text: '2018-03-05',
        isEditStatus: false,
        intro: "投放饲料",
        desc: '张三、李四投放饲料30公斤、，苗种10公斤、放水一小时、张三、李四投放饲料30公斤、，苗种10公斤、放水一小时'
      },
      {
        text: '2018-03-05',
        isEditStatus: false,
        intro: "投放饲料",
        desc: '张三、李四投放饲料30公斤、，苗种10公斤、放水一小时、张三、李四投放饲料30公斤、，苗种10公斤、放水一小时'
      },
      {
        text: '2018-03-05',
        isEditStatus: false,
        intro: "投放饲料",
        desc: '张三、李四投放饲料30公斤、，苗种10公斤、放水一小时、张三、李四投放饲料30公斤、，苗种10公斤、放水一小时'
      },
      {
        text: '2018-03-05',
        isEditStatus: false,
        intro: "投放饲料",
        desc: '张三、李四投放饲料30公斤、，苗种10公斤、放水一小时、张三、李四投放饲料30公斤、，苗种10公斤、放水一小时'
      },
    ]
  },
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },

    handleEditStatus(e){
      let es = [...this.data.steps]
      let detail = e.detail
      // 此处判断是保存还是修改
      es.forEach((item, i) => {
        if(i != detail.index){
          item.isEditStatus = false
        }else{
          item.isEditStatus = !item.isEditStatus
        }
      })
      this.setData({
        steps: es
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