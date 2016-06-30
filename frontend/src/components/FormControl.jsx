import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import _FormControl from 'react-bootstrap/lib/FormControl';

/**
 * 这个版本的react-bootstrap.FormControl没有提供getValue()，这里封装一下
 */
class FormControl extends _FormControl {
	render() {
		return super.render()
	}

	getValue() {
		const { type, multiple } = this.props

		if (type && type === 'select' && multiple) {
			return this.getSelectedOptions()
		}

		return ReactDOM.findDOMNode(this).value
	}

	getSelectedOptions() {
    let values = [];

    Array.prototype.forEach.call(
      ReactDOM.findDOMNode(this).getElementsByTagName('option'),
      (option) => {
        if (option.selected) {
          let value = option.getAttribute('value') || option.innerHtml;
          values.push(value);
        }
      });

    return values;
  }
}

export default FormControl