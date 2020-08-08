var express = require('express')
var app = express()

const port = 8000;

app.use(express.static('dist'))
app.listen(port)
console.log('Running at port',port,'...')
