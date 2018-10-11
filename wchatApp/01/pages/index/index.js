const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#77B4DD',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({

  data: {
    nowTemp: '',
    nowWeather: '',
    nowWeatherBackground: '',
    forecast: ''
  },

  //下拉动作
  onPullDownRefresh() {
    this.getNow(() => {
      wx.stopPullDownRefresh()
    })
  },
  //页面加载
  onLoad() {
    this.getNow()
  },

  //获取当前天气
  getNow(callback) {

    console.log("hello world !");

    //let that=this;

    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now', //
      data: {
        city: '广州'
      },

      //success:function(res){ //注意此种语法 let that=this;

      success: res => {

        let result = res.data.result
        let temp = result.now.temp
        let weather = result.now.weather

        this.setData({
          nowTemp: temp + '°',
          nowWeather: weatherMap[weather],
          nowWeatherBackground: '/images/' + weather + '-bg.png'
        })

        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather],
        })
        //set forcast
        let forecast = []
        for (let i = 0; i < 24; i += 3) {
          forecast.push(

            {time:i,
            iconPath:'/images/sunny-icon.png',
            temp:'12°'
            }
          )
        }

        this.setData({ forecast: forecast})

      },
      complete: () => {
        callback && callback()
        //wx.stopPullDownRefresh()
      }
    })

  }
})