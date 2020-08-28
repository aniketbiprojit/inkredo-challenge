import mongoose from 'mongoose'

const RelationSchema = new mongoose.Schema(
	{
		company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		present: { type: Boolean, default: true },
	},
	{
		timestamps: { createdAt: 'joined_at', updatedAt: 'updated_at' },
		collection: 'Relation',
	}
)

const Relation = mongoose.model('Relation', RelationSchema, 'Relation')

module.exports = Relation
