import React from 'react';
import ReactDOM from 'react-dom';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';

import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as actionCreators } from '../../redux/modules/bin/list';
import getBasePath from '../../helpers/getBasePath';
import getApiPath from '../../helpers/getApiPath';
import { apiDomain } from '../../config'

import './list.less';

const BinTestResult = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },

	getInitialState() {
    return {
      activeKey: 0
    };
  },

	componentDidMount() {
		// this.props.actions.fetchBinTestResult();
	},

	render() {
		const { list } = this.props
		const projectId = '57729f9d5df150cc0ab98825'
		const panelHeader = (
				<div className="">
					<h4 className="title">项目A</h4>
				</div>
			)

		return (
			<Grid data-page="bin/list">
				<Row className="toolbar">
					<h3>接口测试结果</h3>
				</Row>

				<Panel header={panelHeader} eventKey={0}>
        	<ListGroup fill className="test-results">
	        	<ListGroupItem className="error">
			      	<Row>
			      		<Col sm={10}>
				      		<h5 className="title">接口A</h5>/api/examples/test1
				      	</Col>
				      	<Col sm={2}>
				      		<div className="button-wrapper">
					      		<a href={getApiPath(`docs/${projectId}`)} target="_blank">结果详情</a>
					      	</div>
				      	</Col> 
			      	</Row>     	
			      </ListGroupItem>
			      <ListGroupItem className="success">
			      	<Row>
			      		<Col sm={10}>
				      		<h5 className="title">接口B</h5>/api/examples/test2
				      	</Col>
				      	<Col sm={2}>
				      		<div className="button-wrapper">
					      		<a href={getApiPath(`docs/${projectId}`)} target="_blank">结果详情</a>
					      	</div>
				      	</Col> 
			      	</Row>     	
			      </ListGroupItem>
			      <ListGroupItem>
			      	<Row>
			      		<Col sm={10}>
				      		<h5 className="title">接口C</h5>/api/examples/test3
				      	</Col> 
			      	</Row>     	
			      </ListGroupItem>
        	</ListGroup>
        	<div className="result-desc">
        		<ProgressBar>
	        		<ProgressBar bsStyle="success" now={60}/>
	        		<ProgressBar bsStyle="danger" now={40}/>
	        	</ProgressBar>
	        	<p>测试的接口数：10，成功6，失败4。</p>
        	</div>
        </Panel>
			</Grid>
		)
	}

})

const stateToProps = (state) => {
  return {
    ...state.binTestResult
  }
}

const dispatchToProps = (dispatch) => {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(stateToProps, dispatchToProps)(BinTestResult);
