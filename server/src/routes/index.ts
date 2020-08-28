import express from 'express'
const User = require('../models/index').User
const jwt = require('jsonwebtoken')

const app = express.Router()

app.use('/user', require('./user.routes'))

let verify = async (req: express.Request, res: express.Response, next: any) => {
	console.log(req.body)
	try {
		if (req.body.auth && req.body.auth.token && req.body.auth.username) {
			if (jwt.decode(req.body.auth.token, 'secret').username === req.body.auth.username) next()
		} else {
			res.status(401).send()
		}
	} catch (err) {
		res.status(401).send()
	}
}

app.post('/verify', verify, (req, res) => {
	res.send()
})

export let Routes: express.IRouter = app
