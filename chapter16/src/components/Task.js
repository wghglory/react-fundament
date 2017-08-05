import React from 'react';
const PropTypes = require('prop-types');
import Button from '../bootstrap/Button';
import { removeTask } from '../flux/actions/tasks.client.action';

export default class Task extends React.Component {
	constructor(props) {
		super(props);

		this.removeHandler = this.removeHandler.bind(this);
	}

	removeHandler() {
		removeTask({ _id: this.props.id });
	}
	render() {
		return (
			<p className="alert alert-danger clear">
				{this.props.children}
				<Button onClick={this.removeHandler} className="-primary -sm floatRight">remove</Button>
			</p>
		);
	}
}

Task.propTypes = {
	id: PropTypes.number.isRequired,
	children: PropTypes.string.isRequired
};