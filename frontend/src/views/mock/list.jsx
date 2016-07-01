import React from 'react';
import ReactDOM from 'react-dom';

import Grid from 'react-bootstrap/lib/Grid';
import Navbar from 'react-bootstrap/lib/Navbar';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as actionCreators } from '../../redux/modules/mock/list';
import {getQuery} from '../../helpers/getQuery';

import './mock.less';

const MockList = React.createClass({
	componentDidMount() {
		this.fetchMocklist();
	},
	render() {
		let {mocks} = this.props;

		return (
			<Grid className="mocklist">
				<Navbar className="table-toolbar">
			    <Navbar.Header>
			      <Navbar.Brand>Mock模拟接口列表</Navbar.Brand>
			    </Navbar.Header>
			    <Navbar.Collapse>
			      <Navbar.Text pullRight>
			        <Button bsStyle="primary">创建Mock接口</Button>
			      </Navbar.Text>
			    </Navbar.Collapse>
			  </Navbar>

				<Table bordered hover>
			    <thead>
			      <tr>
			      	<th>序号</th>
			        <th>Mock名称</th>
			        <th>Mock描述</th>
			        <th>操作</th>
			      </tr>
			    </thead>
			    <tbody>
			    	{mocks&&mocks.map(function(mock,index){
			    		return <tr key={mock._id}>
				      	<td>{index+1}</td>
				        <td>{mock.summary}</td>
				        <td>{mock.description}</td>
				        <td>
				        	<p><a href="javascript:;">预览</a><a href="javascript:;">编辑</a><a href="javascript:;">删除</a></p>
				        </td>
				      </tr>
			    	})}
			    </tbody>
			  </Table>
			</Grid>
		)
	},

	fetchMocklist(){
		let pathid = getQuery('pathid');

		let {actions} = this.props;
		actions.fetchMocklist(pathid,json=>{
			if(!json.result){
				alert(json.result)
			}
		});
	}
})

const stateToProps = (state) => {
  return {
    mocks: state.mockList.mocks
  }
}

const dispatchToProps = (dispatch) => {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(stateToProps, dispatchToProps)(MockList);
