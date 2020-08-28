import React, { Component, Fragment } from 'react'
import './Login.scss'

import { RouteComponentProps } from 'react-router-dom'

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
					<div className='Card'>Hello</div>
				</div>
			</Fragment>
		)
	}
}

export default Login
