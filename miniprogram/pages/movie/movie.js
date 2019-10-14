// pages/movie/movie.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    movieList:[],
    canemasMovieList:[],
    canemasMovieId:[]
  },
  getMovieList:function(){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: "movielist",
      data: {
        start: this.data.movieList.length,
        count: 10
      }
    }).then(res => {
      this.setData({
        movieList: this.data.movieList.concat(JSON.parse(res.result).subjects)
      });
      wx.cloud.callFunction({
        name: "buyTicket",
        data: {
        }
      }).then(res => {
        // console.log(res.result)
        this.setData({
          canemasMovieList: this.data.canemasMovieList.concat(JSON.parse(res.result).data.list)
        });
        var reg = /[a-zA-Z0-9\u4e00-\u9fa5\,]+/g;
        for (var j = 0; j < this.data.movieList.length; j++){
          for (var i = 0; i < this.data.canemasMovieList.length; i++){
            // console.log(this.data.canemasMovieList[i].name.match(reg).join(''))
            if (this.data.canemasMovieList[i].name.match(reg).join('') == this.data.movieList[j].title.match(reg).join('')) {
              this.setData({
                canemasMovieId:this.data.canemasMovieId.concat(this.data.canemasMovieList[i].id)
              });
            }
          }
          
            if (this.data.canemasMovieId.length < j+1) {
              this.setData({
                canemasMovieId: this.data.canemasMovieId.concat('此城市暂无此电影档期')
              });
            
          }
         
        }
        console.log(this.data.canemasMovieId)
      }).catch(err => {
        console.error(err);
      });
      wx.hideLoading();
    }).catch(err => {
      console.error(err);
      wx.hideLoading();
    });
    
  },

  goComment:function(event){
    console.log(event)
    wx.navigateTo({
      url: `../comment/comment?movieid=${event.target.dataset.movieid}`,
    })
  },
  goTicket: function (event) {
    wx.navigateTo({
      url: `../ticket/ticket?canemasmovieid=${event.target.dataset.canemasmovieid}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovieList(); 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function () {

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
    this.setData({
      canemasMovieList:[],
      canemasMovieId:[]
    });
    this.getMovieList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})