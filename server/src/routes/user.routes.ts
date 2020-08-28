import express from 'express'
import bcrypt, { compareSync } from 'bcrypt'

const { User, Company } = require('../models')

const jwt = require('jsonwebtoken')

const app = express.Router()

app.post('/register', async (req, res) => {
	console.log(req.body)
	// console.log(await bcrypt.hash('req.body.password', 10))
	// return
	try {
		if (req.body.user) {
			if (req.body.user.username && req.body.user.password && req.body.user.email) {
				if (await User.findOne({ username: req.body.user.username })) {
					res.status(400).send('Username exists.')
					return
				}
				if (await User.findOne({ email: req.body.user.email })) {
					res.status(400).send('Email exists.')
					return
				}
				req.body.password = await bcrypt.hash(req.body.user.password, 10)
				let user = new User(req.body.user)
				await user.save()
				console.log(user)
				user.password = ''
				res.send(user)
			} else {
				res.status(422).send('Email or password or username missing')
			}
		} else {
			res.status(422).send('Unprocessable Entity')
		}
	} catch (err) {
		if (err.code === 11000) {
			res.status(400).send('Username or email exists.')
		}
		if (err) {
			console.error(err)
			res.status(500).send('Internal Server Error')
		}
	}
})

app.post('/login', async (req, res) => {
	// console.log(jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGVsbG8iLCJpYXQiOjE1OTg2NDY4NTMsImV4cCI6MTU5OTI1MTY1M30.LQyP5BpeXy7ifQ5UHDZDlcv4IEO0wjtUJ6ISILo2bVA','secret'))
	// console.log(await bcrypt.compare('req.body.password','$2b$10$VtxJZdfSDEjQFF9TnCQyKOq7OFucwY7bpYWV45xfXMDNf.tMBzm6q'))
	// console.log(await User.find())
	try {
		if (req.body.user) {
			if (req.body.user.username && req.body.user.password) {
				let user = await User.findOne({ username: req.body.user.username })
				if (user === null) {
					res.status(400).send('User does not exist.')
					return
				}
				let pass = await bcrypt.compare(req.body.user.password, user.password)
				// console.log(pass)
				if (pass) {
					let token = jwt.sign({ username: req.body.user.username }, 'secret', { expiresIn: '7d' })
					res.send({ username: req.body.user.username, token: token })
				} else {
					res.status(403).send('Wrong Email or Password.')
				}
			} else {
				res.status(422).send('Username or password missing')
			}
		} else {
			res.status(422).send('Unprocessable Entity.')
		}
	} catch (err) {
		if (err) console.error(err)
		res.status(500).send('Internal Server Error')
	}
})

module.exports = app
