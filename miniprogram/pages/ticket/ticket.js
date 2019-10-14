// pages/my/my.js
Page({
  data: {
    citiesList: [],
    citiesId:[],
    canemasList:[],
    canemasmovieid:0,
    canemaMovieInfo:{},
    allDate:[],
    date:[],
    targetDate:0,
    show:false
  },
  getCanemas:function(){
    wx.showLoading({
      title: '加载中',
    });
    wx.cloud.callFunction({
      name: "canemasList",
      data: {
        canemasmovieid: this.data.canemasmovieid,
        offset: this.data.canemasList.length,
        date:this.data.targetDate
      }
    }).then(res => {
        console.log(JSON.parse(res.result).data.list)
        this.setData({
          canemasList: this.data.canemasList.concat(JSON.parse(res.result).data.list)
        })
      wx.hideLoading();
    }).catch(err => {
      console.error(err);
      wx.hideLoading();
    });
  },

  getCities:function(){
    // 获取城市id
    wx.cloud.callFunction({
      name: 'getCities',
    }).then(res => {
      var cities = JSON.parse(res.result).data.list;
      for (var i = 0; i < cities.length; i++) {
        this.setData({
          show:true,
          citiesList: this.data.citiesList.concat(cities[i].name),
          citiesId: this.data.citiesId.concat(cities[i].id)
        });
      }
    }).catch(err => {
      console.error(err)
    });
  },

  onChange(event) {
    this.setData({
      canemasList: [],
      targetDate: '2019-' + event.detail.title
    })
    console.log(event.detail.title)
      wx.showLoading({
      title: '加载中',
    });
    wx.cloud.callFunction({
      name: "canemasList",
      data: {
        canemasmovieid: this.data.canemasmovieid,
        offset: this.data.canemasList.length,
        date: this.data.targetDate,
      }
    }).then(res => {
      console.log(JSON.parse(res.result).data.list)
      this.setData({
        canemasList: this.data.canemasList.concat(JSON.parse(res.result).data.list),
      })
      wx.hideLoading();
    }).catch(err => {
      console.error(err);
      wx.hideLoading();
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
   this.setData({
     canemasmovieid: options.canemasmovieid,
   })
   if(isNaN(this.data.canemasmovieid)){
      this.setData({
        // canemasList:[{name:'此电影在此地区暂无档期'}],
        date: ['此电影在此地区暂无档期']
      }) 
      console.log(this.data.canemasList)
   }else{
    //影院列表,电影信息
      wx.cloud.callFunction({
        name:'canemaMovieInfo',
        data:{
          id:options.canemasmovieid
        }
      }).then(res=>{
        console.log(JSON.parse(res.result).data)
        this.setData({
          canemaMovieInfo:JSON.parse(res.result).data
        });
      }).catch(err=>{
        console.log(err)
      });

     wx.cloud.callFunction({
       name: 'getDate',
       data: {
         canemasmovieid: options.canemasmovieid
       }
     }).then(res => {
       console.log(JSON.parse(res.result).data)
       this.setData({
         allDate: JSON.parse(res.result).data.date,
       });
       this.setData({
         targetDate:this.data.allDate[0],
       });
       this.data.allDate.forEach((item,index)=>{
         this.setData({
           date:this.data.date.concat(item.slice(5))
         })
       });
       console.log(this.data.date);
      //  获取影院
       this.getCanemas();
     }).catch(err => {
       console.log(err)
     });
   }
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
    this.getCanemas();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})