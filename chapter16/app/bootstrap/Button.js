/**
 * reusable bootstrap button
 */

import React from 'react';
const PropTypes = require('prop-types');

export default class Button extends React.Component {
	render() {
		//<Button onClick={this.onClick} className="-primary -lg -block">{this.props.children}</Button>;
		const { className, children, ...rest } = this.props;
		const cn = ("btn " + className).split(" -").join(" btn-");

		return <button type="button" className={cn} {...rest}>{children}</button>;
	}
}

Button.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired
};