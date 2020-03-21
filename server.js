const express = require('express')
const http = require('http')
const path = require('path')
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/frontend/'))

app.get('/*', (req, res)=>{
  res.sendFile(path.join(__dirname + '/frontend/src/app/app.component.html'))
})

server.listen(PORT, () => {
    console.log(`Server started! on port ${PORT}`)
  })


