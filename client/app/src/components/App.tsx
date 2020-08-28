import React, { Component, Fragment } from 'react'
import './App.scss'

import { BrowserRouter as Router, Route, Switch, RouteChildrenProps, Link } from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Company from './Company'
import CreateCompany from './Auth/Create Company'
import Axios from 'axios'
import { options } from './config'

interface elem {
	_id: string
	company_name: string
}

interface AppState {
	companies: Array<elem>
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
	}

	async componentDidMount() {
		let result = await Axios.post(options.link + 'company/get_all')
		this.setState({ companies: result.data })
	}

	async join(company_name: string) {
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
	}
	render() {
		return (
			<Fragment>
				<div className='App Home'>
					<div className='container'>
						<Link to='/create/company'>
							<input type='button' value='Create Company' />
						</Link>
						<input type='button' value='My Dashboard' />
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
						<Route path='/' exact component={App}></Route>
					</Switch>
				</Router>
			</Fragment>
		)
	}
}

export default RouterWrapper
