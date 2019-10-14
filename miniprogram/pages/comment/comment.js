// pages/comment/comment.js
Page({
  data: {
    detail:{},
    content:'',
    score:0,
    imgpath:[]
  },
 submit:function(){
   console.log(this.data.content,this.data.score);
   
 },
  onContentChange:function(event){
    console.log(event)
    this.setData({
      content:event.detail
    })
  },
  onScoreChange:function(e){
    this.setData({
      score:e.detail
    })
  },
upImg:function(){
  wx.chooseImage({
    count: 3,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success:(res) =>{
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths;
      console.log(tempFilePaths);
      this.setData({
        imgpath:this.data.imgpath.concat(tempFilePaths)
      });
      console.log(this.data.imgpath)
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.showLoading({
      title: '加载中',
    });
    wx.cloud.callFunction({
      name: "getDetails",
      data: {
       movieid:options.movieid,
      }
    }).then(res => {
      this.setData({
        detail:JSON.parse(res.result)
      });
      wx.hideLoading();
    }).catch(err => {
      console.error(err);
      wx.hideLoading();

    });
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