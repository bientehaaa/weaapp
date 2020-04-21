const request = require('request')

const forecast = (latitude, longtitude, callback)=> {
  const url = 'https://api.weatherbit.io/v2.0/current?&lat='+ latitude +'&lon='+ longtitude +'&key=4102c51e043f4981a9a1b9ee111d621f'


  request({url, json: true}, (error, {body})=> {
    if(error) {
      callback('Unable to connect to weather service', undefined)
    }else if (body.error) {
      callback('Unable to search Location',undefined)
    }else {
      callback(undefined, 'The Weather is ' + body.data[0].weather.description + ' .It is currently ' + body.data[0].temp + ' degree out. There is a ' + body.data[0].clouds + '% cloudy.')
    }
  })
}


module.exports = forecast