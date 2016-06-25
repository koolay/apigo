import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import classnames from 'classnames';

import Button from 'react-bootstrap-myui/lib/Button';

import './selection-button.less';

const SelectionButton = React.createClass({

	shouldComponentUpdate(nextProps, nextState) {
		const { selected, children } = this.props
		return selected !== nextProps.selected || children !== nextProps.children
	},

	render() {
		const { selected, children, className, ...otherProps } = this.props
		
		return (
			<div className="selection-button">
				{selected ? (
					<Button 
						{...otherProps} 
						className={classnames('active', className)}>
						<span className="close-wapper">
							<i className="icon-close"/>
						</span>
						{children}
					</Button>
				) : (
					<Button {...otherProps} className={className}>{children}</Button>
				)}
			</div>
		)	
	}

});

SelectionButton.PropTypes = {
	selected: PropTypes.bool
}

export default SelectionButton;

