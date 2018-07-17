var express=require('express')
var app=express()

var path=require('path')
var bodyParser=require('body-parser')
var session=require('express-session')
var router=require('./router.js')

app.engine('html',require('express-art-template'))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public/',express.static(path.join(__dirname,'public')))
app.use('/node_modules/',express.static(path.join(__dirname,'node_modules')))

app.use(router)



app.listen(4000,function(){
    console.log('server is runing')
})


