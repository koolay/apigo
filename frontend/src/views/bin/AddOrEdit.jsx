import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as actionCreators } from '../../redux/modules/bin/addOrEdit';

import './add-edit.less';

const AddOrEdit = React.createClass({

	render() {
		return (
			<Grid>
				<Panel header={(<h3>新建接口</h3>)} bsStyle="primary">
		      Panel content
		    </Panel>
			</Grid>
		)
	}

})

const stateToProps = (state) => {
  return {
    ...state.binAddOrEdit,
    tipOptions: state.tip.tipOptions
  }
}

const dispatchToProps = (dispatch) => {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(stateToProps, dispatchToProps)(AddOrEdit);
