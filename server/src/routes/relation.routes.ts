import express from 'express'

const { User, Company, Relation } = require('../models')

const app = express.Router()

app.post('/join', async (req, res) => {
	try {
		if (req.body.company_name) {
			let rel = new Relation()
			let company = await Company.findOne({ company_name: req.body.company_name })
			let user = await User.findOne({ username: req.body.auth.username })

			// console.log(user, company)

			if (user.current) {
				let current = await Relation.findById(user.current)
				current.present = false
				await current.save()
			}
			rel.company = company._id
			rel.user = user._id

			await rel.save()
			// console.log(rel)
			user.current = rel._id
			await user.save()

			res.send()
		} else {
			res.status(422).send('Unprocessable Entity.')
		}
	} catch (err) {
		console.error(err)
		res.status(500).send('Interna Server Error,')
	}
})

module.exports = app
