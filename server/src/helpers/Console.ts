/**
 * @module helpers/console
 */

import chalk from 'chalk'

/**
 * A class object used for colored outputs.
 * @typedef Console
 * @class
 */
class Console {
	/**
	 * Empty constructor
	 * @constructor
	 * @constructs Console
	 */
	constructor() {}

	/**
	 * Logs in Cyan
	 * @name Console#log
	 * @param print_text
	 * @returns void
	 */
	log(print_text: any): void {
		if (print_text === undefined) {
			console.log(chalk.cyan('undefined'))
		} else if (print_text === null) {
			console.log(chalk.cyan('null'))
		} else if (typeof print_text === 'string') {
			console.log(chalk.cyan(print_text))
		} else {
			console.log(print_text)
		}
	}

	/**
	 * Logs in red.
	 * @name Console#error
	 * @param print_text
	 * @returns {void} void
	 */
	error(print_text: any): void {
		if (print_text === undefined) {
			console.error(chalk.red('undefined'))
		} else if (print_text === null) {
			console.error(chalk.red('null'))
		} else if (typeof print_text === 'string') {
			console.error(chalk.red(print_text))
		} else {
			console.error(print_text)
		}
	}

	/**
	 * Logs in yellow.
	 * @name Console#warn
	 * @param print_text
	 * @returns {void} void
	 */
	warn(print_text: any): void {
		if (print_text === undefined) {
			console.warn(chalk.yellow('undefined'))
		} else if (print_text === null) {
			console.warn(chalk.yellow('null'))
		} else if (typeof print_text === 'string') {
			console.warn(chalk.yellow(print_text))
		} else {
			console.warn(print_text)
		}
	}
}

export default /**
 * Console object for colored outputs.
 */
new Console()
