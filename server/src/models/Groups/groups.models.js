const mongoose = require('mongoose')
const Permitted = require('../Permissions/permissions.model').Model

const GroupsSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: Permitted }],

		users: [{ type: String }],
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
		collection: 'Groups',
	}
)

const Groups = mongoose.model('Groups', GroupsSchema, 'Groups')

const InheritanceSchema = new mongoose.Schema({
	parents: [{ type: mongoose.Schema.Types.ObjectId, ref: Groups }],

	base: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
})
