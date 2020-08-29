import { RouteChildrenProps } from 'react-router'
import React, { Fragment } from 'react'
import Axios from 'axios'
import { options } from './config'

interface ICompanyState {
	company_name: string
	total_employees: number
	past: Array<string>
	present: Array<string>
}

interface IMatchProps {
	id: string
}

interface ICompanyProps extends RouteChildrenProps<IMatchProps> {}

export default class Company extends React.Component<ICompanyProps, ICompanyState> {
	state = { company_name: '', total_employees: 0, past: [''], present: [''] }

	async componentDidMount() {
		let name: string = (this.props.match?.params?.id as string) || ''
		this.setState({ company_name: name }, async () => {
			let result = await Axios.post(options.link + 'company/' + this.state.company_name, {})
			let past = []
			for (let index = 0; index < result.data.past.length; index++) {
				const element = result.data.past[index]

				past.push(element.user.username)
			}
			let present = []
			for (let index = 0; index < result.data.present.length; index++) {
				const element = result.data.present[index]

				present.push(element.user.username)
			}

			this.setState({ past: past, present: present })
		})
	}

	render() {
		return (
			<Fragment>
				<div className='App'>
					<h1>{this.state.company_name}</h1>
					<h3>Past</h3>[
					{this.state.past.map((elem) => {
						return <Fragment>{elem}, </Fragment>
					})}
					]
					<br />
					<br />
					<h3>Present</h3>[
					{this.state.past.map((elem) => {
						return <Fragment>{elem}, </Fragment>
					})}
					]
				</div>
			</Fragment>
		)
	}
}
