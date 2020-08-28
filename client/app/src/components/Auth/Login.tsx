import React, { Component, Fragment } from 'react'
import './Auth.scss'

import { RouteComponentProps, Link } from 'react-router-dom'
import { options } from '../config'

import axios from 'axios'
import auth from './auth'

interface ILoginProps extends RouteComponentProps {}

interface ILoginState {
	username: string
	password: string
	err: string
}

class Login extends Component<ILoginProps, ILoginState> {
	state = { username: '', password: '', err: '' }

	async componentDidMount() {
		if (await auth()) {
			this.props.history.push('/', '/')
		}
	}

	async handleSubmit() {
		try {
			let result = await axios.post(options.link + 'user/login', {
				user: {
					username: this.state.username,
					password: this.state.password,
				},
			})
			if (result.status === 200) {
				let data = result.data
				localStorage.setItem('token', data.token)
				localStorage.setItem('username', data.username)
			}
		} catch (err) {
			if (err.response) {
				console.log(err.response)
				this.setState({ err: err.response.data })
			} else {
				console.error(err)
			}
		}
	}
	render() {
		return (
			<Fragment>
				<div className='App Login'>
					<div className='Card'>
						<h1 style={{ textAlign: 'center' }}>Login</h1>
						<form
							onSubmit={(e) => {
								e.preventDefault()
								this.handleSubmit()
							}}
						>
							<p className='err'>{this.state.err}</p>
							<div className='input-wrapper'>
								<input
									type='text'
									name='username'
									value={this.state.username}
									onChange={(e) => {
										this.setState({ username: e.target.value })
									}}
									placeholder='Enter username.'
								/>
							</div>
							<div className='input-wrapper'>
								<input
									type='password'
									name='password'
									value={this.state.password}
									onChange={(e) => {
										this.setState({ password: e.target.value })
									}}
									placeholder='Enter your password.'
								/>
							</div>
							<Link to='/register'>
								<p className='shift'>Register?</p>
							</Link>
							<div className='input-wrapper submit'>
								<input type='submit' value='Submit' />
							</div>
						</form>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default Login
