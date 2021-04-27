
const express = require('express')
const app = express()
const path = require('path')
const api = require('novelcovid');
// express, path, novelcovid, nodemon
 
// you can choose which URL to use, this will not change the behaviour of the API
api.settings({
    baseUrl: 'https://disease.sh'
})

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('home')
})

/*api.countries({country:'india'}).then((data)=>{
    console.log(data)})*/


app.get('/searchWorld',(req,res)=>{
    api.all().then((data)=>{
        res.render('worldResults',{result_data:data})
    })
})
 
app.get('/searchContinent',(req,res)=>{
    
    let searchedContinent = req.query.continent;
    api.continents({continent:searchedContinent}).then((data)=>{
        
        if(data.hasOwnProperty("message")){
            res.render('error',{error_message:data.message})
        } else {
            res.render('continentResults',{result_data: data});
        }
    })
})

app.get('/searchCountry',(req,res)=>{
    
    let searchedCountry = req.query.country;
    api.countries({country:searchedCountry}).then((data)=>{
        
        if(data.hasOwnProperty("message")){
            res.render('error',{error_message:data.message})
        } else {
            res.render('results',{result_data: data,image_url:data.countryInfo.flag});
        }
    })
})

app.get('/searchState',(req,res)=>{
    
    let searchedState = req.query.state;
    api.states({state:searchedState}).then((data)=>{
        
        if(data.hasOwnProperty("message")){
            res.render('error',{error_message:data.message})
        } else {
            res.render('stateResults',{result_data: data});
        }
    })
})

app.listen(3000,()=>{
    console.log('Listening on port 3000!');
})

