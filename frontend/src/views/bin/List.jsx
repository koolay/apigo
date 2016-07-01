import React from 'react';
import ReactDOM from 'react-dom';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Navbar from 'react-bootstrap/lib/Navbar';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as actionCreators } from '../../redux/modules/bin/list';
import {getQuery} from '../../helpers/getQuery';
import { apiDomain} from '../../config';

import './list.less';

const BinList = React.createClass({
	getInitialState() {
    return {
      activeKey: 0
    };
  },

	componentDidMount() {
		// this.fetchMocklist();
	},

	render() {
		let _this=this, {mocks} = this.props;

		return (
			<Grid data-page="bin/list">
				<Row className="toolbar">
					<h3>API接口列表</h3>
					<Button bsStyle="primary">创建接口</Button>
				</Row>

				<PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelectPanel} accordion>
	        <Panel header="项目1" eventKey={0}>
	        	<ListGroup fill>
				      <ListGroupItem>aaa</ListGroupItem>
				      <ListGroupItem>bbb</ListGroupItem>
				      <ListGroupItem>&hellip;</ListGroupItem>
				    </ListGroup>
	        </Panel>
	        <Panel header="项目2" eventKey={1}>暂没有数据</Panel>
	      </PanelGroup>
			</Grid>
		)
	},

	handleSelectPanel(activeKey) {
    this.setState({ activeKey });
  },
})

const stateToProps = (state) => {
  return {
    ...state.binList
  }
}

const dispatchToProps = (dispatch) => {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(stateToProps, dispatchToProps)(BinList);
