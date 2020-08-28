import React, { Component, Fragment } from 'react'
import './Auth.scss'

import { RouteComponentProps, Link } from 'react-router-dom'

interface IRegisterProps extends RouteComponentProps {
	name: string
}

interface IRegisterState {
	data: Date
}

class Register extends Component<IRegisterProps, IRegisterState> {
	render() {
		return (
			<Fragment>
				<div className='App Login'>
					<div className='Card'>
						<h1 style={{ textAlign: 'center' }}>Register</h1>
						<form onSubmit={(e) => e.preventDefault()}>
							<div className='input-wrapper'>
								<input type='email' name='email' placeholder='Enter email.' required />
							</div>
							<div className='input-wrapper'>
								<input type='text' name='username' placeholder='Enter username.' required />
							</div>
							<div className='input-wrapper'>
								<input type='password' name='password' placeholder='Enter your password.' required />
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
