import React, { Component, Fragment } from 'react'
import './App.scss'

import { BrowserRouter as Router, Route, Switch, RouteChildrenProps, Link } from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Company from './Company'

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
	render() {
		return (
			<Fragment>
				<div className='App Home'>
					<div className='container'>
						<input type='button' value='Create Company' />
						<input type='button' value='My Dashboard' />
						<h1>Companies</h1>
						{this.state.companies.map((elem) => {
							return (
								<Fragment key={elem._id}>
									<Link to={'/company/' + elem.company_name}>
										<div className='company-wrapper'>
											<h3> {elem.company_name}</h3>
										</div>
									</Link>
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
