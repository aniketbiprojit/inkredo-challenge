import React, { Component, Fragment } from 'react'
import './Auth.scss'

import { RouteComponentProps, Link } from 'react-router-dom'

import { options } from '../config'

import axios from 'axios'

interface IRegisterProps extends RouteComponentProps {
	name: string
}

interface IRegisterState {
	username: string
	password: string
	email: string
	err: string
}

class Register extends Component<IRegisterProps, IRegisterState> {
	state = { username: '', password: '', err: '', email: '' }
	componentDidMount() {}
	async handleSubmit() {
		try {
			let result = await axios.post(options.link + 'user/register', {
				user: {
					username: this.state.username,
					password: this.state.password,
					email: this.state.email,
				},
			})
			if (result.status === 200) {
				console.log(result)
				this.props.history.push('/login', 'login')
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
						<h1 style={{ textAlign: 'center' }}>Register</h1>
						<form
							onSubmit={(e) => {
								e.preventDefault()
								this.handleSubmit()
							}}
						>
							<p className='err'>{this.state.err}</p>

							<div className='input-wrapper'>
								<input
									type='email'
									name='email'
									value={this.state.email}
									onChange={(e) => {
										this.setState({ email: e.target.value })
									}}
									placeholder='Enter email.'
									required
								/>
							</div>
							<div className='input-wrapper'>
								<input
									type='text'
									name='username'
									value={this.state.username}
									onChange={(e) => {
										this.setState({ username: e.target.value })
									}}
									placeholder='Enter username.'
									required
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
									required
								/>
							</div>
							<Link to='/login'>
								<p className='shift'>Login?</p>
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

export default Register
