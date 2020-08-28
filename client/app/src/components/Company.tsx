import { RouteChildrenProps } from 'react-router'
import React, { Fragment } from 'react'

interface ICompanyState {
	company_name: string
	total_employees: number
	employees: Array<string>
}

interface IMatchProps {
	id: string
}

interface ICompanyProps extends RouteChildrenProps<IMatchProps> {}

export default class Company extends React.Component<ICompanyProps, ICompanyState> {
	state = { company_name: '', total_employees: 0, employees: [''] }

	componentDidMount() {
		let name: string = (this.props.match?.params?.id as string) || ''
		this.setState({ company_name: name })
	}

	render() {
		return (
			<Fragment>
				<div className='App'>
					<h1>{this.state.company_name}</h1>
				</div>
			</Fragment>
		)
	}
}
