import express, { response } from 'express'

const jwt = require('jsonwebtoken')
const { User, Company, Relation } = require('../models')

const app = express.Router()

app.use('/user', require('./user.routes'))

let verify = async (req: express.Request, res: express.Response, next: any) => {
	// console.log(req.body)
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

app.post('/company/get_all', async (req, res) => {
	const companies = await Company.find({}, 'company_name _id').sort({ company_name: 1 })
	res.send(companies)
})

app.post('/company/:name', async (req, res) => {
	// console.log(req.params)
	const company = await Company.findOne({ company_name: req.params.name })

	const present = await Relation.find({ present: true, company: company }, '_id').populate('user')
	const past = await Relation.find({ present: false, company: company }, '_id').populate('user')
	const response = {
		present: present,
		past: past,
	}
	res.send(response)
})

app.use('/company/', verify, require('./company.routes'))

app.use('/relation', verify, require('./relation.routes'))

export let Routes: express.IRouter = app
