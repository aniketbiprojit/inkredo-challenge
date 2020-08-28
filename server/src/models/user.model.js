import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		password: String,
		email: { type: String, unique: true, required: true },
		current: { type: mongoose.Schema.Types.ObjectId, ref: 'Relation' },
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
		collection: 'User',
	}
)

const UserModel = mongoose.model('User', UserSchema, 'User')

module.exports = UserModel
