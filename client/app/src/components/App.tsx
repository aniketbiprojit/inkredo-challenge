import React, { Component, Fragment } from 'react'
import './App.scss'

import { BrowserRouter as Router, Route, Switch, RouteChildrenProps } from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'

interface AppState {}

interface PropsType extends RouteChildrenProps {}

class App extends Component<PropsType, AppState> {
	static defaultProps = {
		name: 'Hello everyone!',
	}

	constructor(props: PropsType) {
		super(props)
		console.log('mounted, from app')
	}

	render() {
		return <Fragment>HomePage</Fragment>
	}
}

class RouterWrapper extends Component {
	render() {
		return (
			<Fragment>
				<Router basename='/inkredo-challenge'>
					<Switch>
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
