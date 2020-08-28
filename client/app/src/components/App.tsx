import React, { Component } from 'react'
import './App.scss'

/**
 * @typedef State
 * @state {Date} date
 */
interface AppState {
	data: Date
}

/**
 * @typedef Props
 * @prop {React.ReactNode} children
 * @prop {React.ReactNode} name
 */
interface PropsType {
	children?: JSX.Element[] | JSX.Element
	name?: string
}

class App extends Component<PropsType, AppState> {
	static defaultProps = {
		name: 'Hello everyone!',
	}

	constructor(props: PropsType) {
		super(props)

		this.setState({
			data: new Date(),
		})
	}

	render() {
		return (
			<div className='App'>
				{this.props.name}
				{this.props.children}
			</div>
		)
	}
}

export default App
