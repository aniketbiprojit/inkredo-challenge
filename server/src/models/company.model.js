import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema(
	{
		company_name: String,
		code: String,
		created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
		collection: 'Company',
	}
)
