import express from 'express'
const User = require('../models/index').User
const jwt = require('jsonwebtoken')

const app = express.Router()

app.use('/user', require('./user.routes'))

app.post('/verify', (req, res) => {
	console.log(req.body)
	try {
		if (req.body.auth && req.body.auth.token && req.body.auth.username) {
			if (jwt.decode(req.body.auth.token, 'secret').username === req.body.auth.username) res.send()
		} else {
			res.status(401).send()
		}
	} catch (err) {
		res.status(401).send()
	}
})

export let Routes: express.IRouter = app
