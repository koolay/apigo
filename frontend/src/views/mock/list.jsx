import React from 'react';
import ReactDOM from 'react-dom';

import Grid from 'react-bootstrap/lib/Grid';
import Navbar from 'react-bootstrap/lib/Navbar';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';

import './mock.less';

const MockList = React.createClass({
	render() {
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
			        <th>MockID</th>
			        <th>Mock描述</th>
			        <th>接口Path</th>
			        <th>操作</th>
			      </tr>
			    </thead>
			    <tbody>
			      <tr>
			      	<td>1</td>
			        <td>查看用户列表</td>
			        <td>mock_queryUsers</td>
			        <td>模拟查看用户列表请求</td>
			        <td>/user/query</td>
			        <td>
			        	<p><a href="javascript:;">编辑</a><a href="javascript:;">查看</a><a href="javascript:;">删除</a></p>
			        </td>
			      </tr>
			    </tbody>
			  </Table>
			</Grid>
		)
	}
})

export default MockList;
