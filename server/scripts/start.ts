'use strict'

import path from 'path'
import dotenv from 'dotenv'

// import Console from '../src/helpers/console'
import Console from '../src/helpers/Console'

// Load Environment variables.
// The variable are loaded as per .env
dotenv.config({})
dotenv.config({ path: path.join(__dirname, `../${process.env.RUN_ON}.${process.env.ENV}.env`) })

Console.log('')
Console.log({
	ENV: process.env.ENV,
	RUN_ON: process.env.RUN_ON,
	TEST_BOOL: process.env.TEST_BOOL,
})
Console.log('')

// console.log(process.env.ENV)
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = process.env.ENV
process.env.NODE_ENV = process.env.ENV

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
	throw err
})

if (process.env.ENV === 'development') {
	if (process.env.SSL === 'true') {
		Console.warn(`[warn] SSL_CRT_FILE, SSL_KEY_FILE should be defined in env`)
		Console.warn(`[warn] Ports 8443 and 8000 must be free along with ${process.env.PORT}.\n`)
		// Console.warn(`[warn] Processes on these ports will be stopped.\n`)
	}
}

;(async () => {
	await require('../src/server')
	require('../src/index')
})()
