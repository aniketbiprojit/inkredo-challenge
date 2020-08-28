export let options = {}

let env = 'local'
if (env === 'local') {
	options.link = 'https://localhost:8080/api/'
} else {
	options.link = 'https://localhost:8080/api/'
}
