const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('postman-request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

app = express()
app.set('view engine', 'hbs')
// app.set('view engine', 'html');
// app.engine('html', require('hbs').__express);

const pathdir = path.join(__dirname, '../public');
const viewDir = path.join(__dirname, '../templates/views');
const partialpath = path.join(__dirname, '../templates/partials')


app.use(express.static(pathdir))  
app.set('views', viewDir)
hbs.registerPartials(partialpath)  


app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Harish'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Harish'
    })
})

// app.get('/products', (req, res) =>{
    
//     if(!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term' 
//         })
//     }
    
//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })


app.get('/weather', (req,res) => {
    
    if (!req.query.address) {
      return  res.send({
          error: 'pls provide the locations whose weather pattern you need to find?'
        })
    } 
      
    geocode(req.query.address, (error, {latitude, longitude, location}={})=> {
            if (error) {
                return res.send({error})
            } 

            forecast(latitude, longitude, (error, forecastData)=> {
                if(error) {
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address:req.query.address

                })


            })

    })

            // res.send({
            //     forecast: 'Heavy rains',
            //     location: 'Mumbai',
            //     address: req.query.address
            // })          
        

  
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404 Page',
        name: 'Harish',
        errorMessage: 'Page not found'
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404 Page',
        name: 'Harish',
        errorMessage: 'Help article not found'
    })
})



app.listen(3000, ()=> {
    console.log('Server is up on port 3000');
})