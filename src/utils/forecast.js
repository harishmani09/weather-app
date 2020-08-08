const request = require('postman-request')



const forecast = (lat,long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=d18d5274e66232fdbccf8ae9a95ddf97&query='+lat+ ','+ long ;

    request({url, json:true}, (error, {body}={}) => {
        if(error) {
            callback('Unable to connect to service', undefined )
        } else if (body.error) {
            callback('Unable to get get forecast for location, pls try another search', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions + '. Temperature is ' +body.current.temperature + ' degree celcius '+'Humidity is ' + body.current.humidity + 'Cloud cover is '+body.current.cloudcover )
        }
    })
}
module.exports = forecast













// request({url : url, json:true}, (error, response) => {
//     console.log(response.body.current);
//     console.log(response.body.current.weather_descriptions[0] + '. it is currently ' + response.body.current.temperature + ' degrees & it feels like ' + response.body.current.feelslike + ' degrees');
//     if(error){
//         console.log("Unable to connect to the weather service");
//     } else if (response.body.error) {
//             console.log('unable to find location');
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + '. it is currently ' + response.body.current.temperature + ' degrees & it feels like ' + response.body.current.feelslike + ' degrees');
//     }

// } )
