import express from 'express'
import cors from 'cors'
import fs from 'fs'
import net from 'net'
import http from 'http'
import https from 'https'

import Console from './helpers/Console'

require('./models')

interface AppInterface {
	app: express.Application
	port: string | number
	name: string
}

abstract class AbstractApp implements AppInterface {
	public app: express.Application
	public port: string | number
	public name: string

	/**
	 * @constructor
	 * @constructs AbstractApp
	 * @public
	 *
	 * @param {name} name defaults to App
	 * @param {number|string} port defaults to 8080 if not in env
	 */
	constructor(name: string = 'App', port: string | number = process.env.PORT || 8080) {
		this.app = express()
		this.port = port

		this.name = name
	}

	protected defaultMiddlewares(): void {}
	public listen(): void {}
}

/**
 * @class App
 */
class App extends AbstractApp {
	/**
	 * @constructor
	 * @constructs App
	 * @public
	 *
	 * @param {name} name defaults to App
	 * @param {number|string} port defaults to 8080 if not in env
	 */
	public check_ssl: boolean = process.env.SSL == null ? false : process.env.SSL === 'true'
	public local: boolean = process.env.RUN_ON === null ? false : process.env.RUN_ON === 'local'
	constructor(name: string = 'App', port: string | number = process.env.PORT || 8080) {
		super()

		this.defaultMiddlewares()
		Console.log(`${name} was initialized on port ${this.port}.`)
	}

	/**
	 * Initialize default middlewares.
	 */
	protected defaultMiddlewares(): void {
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: true }))
		if (process.env.ENV === 'development') {
			this.app.use(cors())
		}
		const path = require('path')
		this.app.use('/inkredo-challenge', express.static(path.join(__dirname + '/../../client/app/build')))
		this.app.get('/inkredo-challenge*', (req, res) => {
			res.sendFile(path.join(__dirname + '/../../client/app/build/index.html'))
		})
	}

	/**
	 * Start listening on a port.
	 *
	 * Checks SSL value in ENV.
	 * THen decides whether to implement SSL or not.
	 */
	public listen(): void {
		if (this.check_ssl) {
			if (this.local) {
				const certificate = fs.readFileSync(process.env.SSL_CRT_FILE as string)
				const privateKey = fs.readFileSync(process.env.SSL_KEY_FILE as string)

				const credentials = { key: privateKey, cert: certificate }

				let httpsServer = https.createServer(credentials, this.app).listen(8443)

				let httpServer = http
					.createServer((req, res) => {
						let host = req.headers['host']
						res.writeHead(301, { Location: 'https://' + host + req.url })
						res.end()
					})
					.listen(8000)

				let netServer = net
					.createServer((conn) => {
						conn.once('data', (buf) => {
							let address: string = buf[0] === 22 ? '8443' : '8000'

							let proxy = net.createConnection(address, function () {
								proxy.write(buf)
								conn.pipe(proxy).pipe(conn)
							})
						})
					})
					.listen(this.port, () =>
						Console.log(`${this.name} Running on port https://localhost:${this.port}.`)
					)

				process.on('SIGUSR2', () => {
					Console.error('Process Exit\n')
					httpServer.close(() => {
						process.kill(process.pid, 'SIGINT')
					})
				})
			}
		} else {
			this.app.listen(this.port, () => Console.log(`${this.name} Listening on port ${this.port}.`))
		}
	}
}

const app = new App('Primary App')
app.listen()
