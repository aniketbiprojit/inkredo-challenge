import React, { Component, Fragment } from 'react'
import './Auth.scss'

import { RouteComponentProps, Link } from 'react-router-dom'

interface ILoginProps extends RouteComponentProps {
	name: string
}

interface ILoginState {
	data: Date
}

class Login extends Component<ILoginProps, ILoginState> {
	render() {
		return (
			<Fragment>
				<div className='App Login'>
					<div className='Card'>
						<h1 style={{ textAlign: 'center' }}>Login</h1>
						<form onSubmit={(e) => e.preventDefault()}>
							<div className='input-wrapper'>
								<input type='text' name='username' placeholder='Enter username.' />
							</div>
							<div className='input-wrapper'>
								<input type='password' name='password' placeholder='Enter your password.' />
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
