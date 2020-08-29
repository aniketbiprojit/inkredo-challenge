const express = require('express')

const app = express()

const build = require('./build')

app.use('/inkredo-challenge', build.app)

app.listen(8080)
