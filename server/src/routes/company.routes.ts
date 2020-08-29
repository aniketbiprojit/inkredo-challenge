import express from 'express'

const { User, Company } = require('../models')

const app = express.Router()

app.post('/create', async (req: express.Request, res: express.Response) => {
	try {
		if (req.body.company_name) {
			let user = await User.findOne({ username: req.body.auth.username })
			let company = new Company({ company_name: req.body.company_name })
			company.created_by = user._id
			await company.save()
			// console.log(company)
			res.send()
		} else {
			res.status(422).send('Company name missing,')
		}
	} catch (err) {
		console.error(err)
		res.status(500).send('Internal Server Error')
	}
})

module.exports = app
