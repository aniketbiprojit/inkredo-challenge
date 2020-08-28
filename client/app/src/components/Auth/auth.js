import { options } from '../config'
import axios from 'axios'

export default async function () {
	try {
		let result = await axios.post(options.link + 'verify', {
			auth: {
				token: localStorage.getItem('token'),
				username: localStorage.getItem('username'),
			},
		})
		if (result.status === 200) return true
	} catch (err) {
		localStorage.clear()
		return false
	}
}
