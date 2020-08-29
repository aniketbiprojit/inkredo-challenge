import React, { Component, Fragment } from 'react'
import './Auth.scss'

import { RouteComponentProps } from 'react-router-dom'
import { options } from '../config'

import axios from 'axios'
import auth from './auth'

interface ICreateCompanyProps extends RouteComponentProps {}

interface ICreateCompanyState {
	company_name: string
	err: string
}

class CreateCompany extends Component<ICreateCompanyProps, ICreateCompanyState> {
	state = { company_name: '', err: '' }

	async componentDidMount() {
		if (!(await auth())) {
			this.props.history.push('/', '/')
		}
	}

	async handleSubmit() {
		try {
			let result = await axios.post(options.link + 'company/create', {
				company_name: this.state.company_name,
				auth: {
					token: localStorage.getItem('token'),
					username: localStorage.getItem('username'),
				},
			})
			if (result.status === 200) {
				// console.log(result)
				this.props.history.push('/company/' + this.state.company_name, '/')
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
				<div className='App Login CreateCompany'>
					<div className='Card'>
						<h1 style={{ textAlign: 'center' }}>Create Company</h1>
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
									name='company_name'
									value={this.state.company_name}
									onChange={(e) => {
										this.setState({ company_name: e.target.value })
									}}
									placeholder='Enter your company name.'
								/>
							</div>
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

export default CreateCompany
