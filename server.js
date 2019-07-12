const express = require('express')

const actionRouter = require('./router/actionRouter.js')
const projectRouter = require('./router/projectRouter')

const helmet = require('helmet')
const server = express()

server.use(helmet())
server.use(express.json())

server.use('/action', actionRouter)
server.use('/project', projectRouter)

server.get('/', (req, res) => {
    res.send(`<h2>You Are Connected!</h2>`)
  });
  
  
  
  module.exports = server;