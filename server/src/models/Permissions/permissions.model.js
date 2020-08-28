const mongoose = require('mongoose')

const PermittedSchema = new mongoose.Schema(
	{
		methods: [{ type: String, enum: ['c', 'r', 'u', 'd'] }],
		object: [{ type: String }],
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
		collection: 'Permitted',
	}
)

const Permitted = mongoose.model('Permitted', PermittedSchema, 'Permitted')

module.exports.Schema = PermittedSchema
module.exports.Model = Permitted
