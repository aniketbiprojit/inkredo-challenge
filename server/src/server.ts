import mongoose from 'mongoose'

import assert from 'assert'
import Console from './helpers/Console'

const connect = async () => {
	let connection = await mongoose.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
		}
	)
	assert(connection === mongoose && 'Failed to connect')

	Console.log('\nConnection OK')
	Console.log(process.env.DB_NAME?.split('?')[0])
	Console.log('')

	// if (process.env.TEST_BOOL) {
	// }
	return connection
}

module.exports = connect()
