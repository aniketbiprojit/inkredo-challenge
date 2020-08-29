import React, { Component, Fragment } from 'react'
import auth from './Auth/auth'
import Axios from 'axios'
import { options } from './config'

export default class User extends Component {
	state = { present: '', past: [] }
	async componentDidMount() {
		if (!auth()) {
			this.props.history.push('/login', 'login')
		}
		try {
			let result = await Axios.post(options.link + 'user/dashboard', {
				auth: {
					token: localStorage.getItem('token'),
					username: localStorage.getItem('username'),
				},
			})
			if (result.status === 200) {
				console.log(result.data.past)
				this.setState({ past: result.data.past, present: result.data.present[0].company.company_name })
			}
		} catch (err) {
			localStorage.clear()
			this.props.history.push('/login', 'login')
		}
	}

	render() {
		return (
			<>
				<div className='App'>
					<h1>{localStorage.getItem('username')}</h1>

					<h2>Present: {this.state.present}</h2>
					<br />

					<h2>Past</h2>
					<br />
					{this.state.past.map((elem) => {
						return (
							<Fragment key={elem._id}>
								<div className='' style={{ padding: '20px' }}>
									<h3>{elem.company.company_name}</h3>
									<p>Joined at: {elem.joined_at}</p>
									<p>Left at: {elem.updated_at}</p>
								</div>
							</Fragment>
						)
					})}
				</div>
			</>
		)
	}
}
