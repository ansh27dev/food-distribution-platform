const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello 2Wo33rl8d')
})


app.get('/profile', function (req, res) {
    res.send('Hello d1')
  })
  
app.listen(3000)