import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema(
	{
		company_name: { type: String, unique: true },
		code: String,
		created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
		collection: 'Company',
	}
)

const Company = mongoose.model('Company', CompanySchema, 'Company')

module.exports = Company
