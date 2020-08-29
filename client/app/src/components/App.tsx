import React, { Component, Fragment } from 'react'
import './App.scss'

import { BrowserRouter as Router, Route, Switch, RouteChildrenProps, Link } from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Company from './Company'
import CreateCompany from './Auth/Create Company'
import Axios from 'axios'
import { options } from './config'
import User from './User'
import auth from './Auth/auth'

interface elem {
	_id: string
	company_name: string
}

interface AppState {
	companies: Array<elem>
	auth: boolean
}

interface PropsType extends RouteChildrenProps {}

class App extends Component<PropsType, AppState> {
	static defaultProps = {
		name: 'Hello everyone!',
	}

	state = {
		companies: [
			{ company_name: 'Adobe', _id: 'e84012934' },
			{ company_name: 'Apple', _id: 'e132123' },
		],
		auth: false,
	}

	async componentDidMount() {
		if (await auth()) {
			this.setState({ auth: true })
		}
		let result = await Axios.post(options.link + 'company/get_all')
		this.setState({ companies: result.data })
	}

	async join(company_name: string) {
		try {
			let result = await Axios.post(options.link + 'relation/join', {
				company_name: company_name,
				auth: {
					token: localStorage.getItem('token'),
					username: localStorage.getItem('username'),
				},
			})
			if (result.status === 200) {
				alert('joined')
			}
		} catch (err) {
			alert('Please login')
		}
	}
	render() {
		return (
			<Fragment>
				<div className='App Home'>
					<div className='container'>
						<div className='nav'>
							<Link to='/create/company'>
								<input type='button' className='nav-btn' value='Create Company' />
							</Link>
							<Link to='/dashboard'>
								<input type='button' className='nav-btn' value='My Dashboard' />
							</Link>
							{this.state.auth ? (
								<Link to='/logout'>
									<input
										type='button'
										className='nav-btn'
										value='Logout'
										onClick={() => {
											localStorage.clear()
											window.location.reload()
										}}
									/>
								</Link>
							) : (
								<Link to='/login'>
									<input type='button' className='nav-btn' value='Login' />
								</Link>
							)}
						</div>
						<h1>Companies</h1>
						{this.state.companies.map((elem) => {
							return (
								<Fragment key={elem._id}>
									<div className='company-wrapper'>
										<Link to={'/company/' + elem.company_name}>
											<h3> {elem.company_name}</h3>
										</Link>
										<input
											onClick={() => this.join(elem.company_name)}
											type='button'
											value='Join'
										/>
									</div>
								</Fragment>
							)
						})}
					</div>
				</div>
			</Fragment>
		)
	}
}

class RouterWrapper extends Component {
	render() {
		return (
			<Fragment>
				<Router basename='/inkredo-challenge'>
					<Switch>
						<Route path='/create/company' component={CreateCompany}></Route>
						<Route path='/company/:id' component={Company}></Route>
						<Route path='/register' component={Register}></Route>
						<Route path='/login' component={Login}></Route>
						<Route path='/dashboard' component={User}></Route>
						<Route path='/' exact component={App}></Route>
					</Switch>
				</Router>
			</Fragment>
		)
	}
}

export default RouterWrapper
