import express from 'express'

const app = express.Router()

app.use('/user', require('./user.routes'))

export let Routes: express.IRouter = app
