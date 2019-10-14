// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

  var rp = require('request-promise');
  // 云函数入口函数
  exports.main = async (event, context) => {
    return rp(`https://ticket.nexttix.net/api/cities/3/cinemas?offset=${event.offset}&limit=10&movieId=${event.canemasmovieid}&date=${event.date}`)
      .then(function (res) {
        console.log(res);
        return res;
      })
      .catch(function (err) {
        console.log(err)
      });
}