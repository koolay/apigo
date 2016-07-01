import React from 'react';
import ReactDOM from 'react-dom';

import Grid from 'react-bootstrap/lib/Grid';
import Navbar from 'react-bootstrap/lib/Navbar';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';
import Modal from 'react-bootstrap/lib/Modal';

import CodeExample from '../../components/CodeExample';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as actionCreators } from '../../redux/modules/mock/list';
import getBasePath from '../../helpers/getBasePath';
import {apiDomain} from '../../config';

import './mock.less';

const MockList = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },

	getInitialState() {
    return { showModal: false,mock:{query:{a:1}} }
  },

	componentDidMount() {
		const { params } = this.props
		const binId = params['binId']
		this.fetchPath(binId);
		this.fetchMocklist(binId);
	},
	render() {
		let _this=this, {pathname, pathid, params, mocks} = this.props;

		const codeMode = {name: 'javascript', json: true}
		const codeText = 
`"id": {
  "type": "string",
  "description": "ID值",
  "required": true
},
"name": {
  "type": "string",
  "defalut": "Project",
  "description": "名称"
},
"users": {
  "type": "array",
  "items": { // 这里定义一个object数组
    "type": "object",
    "properties": { // object类型的子属性定义
      "id": {
        "type": "string"
      },
      "name": {
        "type": "string"
      }
    }
  }
}`

	let queryParams='', querys = this.state.mock["query"];
	if(querys){
		var paramsArr=[];
		for(var param in querys){
			if(querys.hasOwnProperty(param)){
				paramsArr.push(param +'='+ querys[param]);
			}
		}
		queryParams = '?'+paramsArr.join('&');
	}
	
		return (
			<Grid className="mocklist">
				<Navbar className="table-toolbar">
			    <Navbar.Header>
			      <Navbar.Brand>
			      	{pathname} - 模拟用例
			      	<p style={{fontSize:'12px',color:'#999'}}>模拟API: <span style={{color:'#2aa198'}}>{apiDomain}/mock/{pathid}</span></p>
			      </Navbar.Brand>
			    </Navbar.Header>
			    <Navbar.Collapse>
			      <Navbar.Text pullRight>
			        <Button bsStyle="primary" onClick={this.handleCreateMock}>创建Mock接口</Button>
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
				        	<p><a href="javascript:;" onClick={_this.handleShowModal.bind(_this,mock)}>调用示例</a><a href="javascript:;" onClick={_this.removeMock.bind(_this,mock)}>删除</a></p>
				        </td>
				      </tr>
			    	})}
			    </tbody>
			  </Table>

			  <Modal show={this.state.showModal} onHide={this.handleHideModal}>
			  	<Modal.Header closeButton>
            <Modal.Title>调用示例</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          	<div className="list-group">
          		<div className="list-item">
          			<label>{this.state.mock["method"]&&this.state.mock["method"].toUpperCase()} <span style={{color:'#2aa198'}}>{apiDomain}/mock/{pathid}{queryParams}</span></label>
          		</div>
          		
          		{this.state.mock["headers"]?
          		<div className="list-item">
          			<label>Headers</label>
          			<CodeExample codeText={JSON.stringify(this.state.mock["headers"]) || ''} mode={codeMode} />
          		</div>:null}

          		{this.state.mock["body"]?
          		<div className="list-item">
          			<label>Body</label>
          			<CodeExample codeText={JSON.stringify(this.state.mock["body"]) || ''} mode={codeMode} />
          		</div>:null}

          		<div className="list-item">
          			<label>Responses {this.state.mock["httpCode"]}</label>
          			<CodeExample codeText={JSON.stringify(this.state.mock["responses"]) || ''} mode={codeMode} />
          		</div>
          	</div>
          </Modal.Body>
			  </Modal>
			</Grid>
		)
	},

	handleCreateMock() {
		const binId = this.props.params['binId']
		this.context.router.push(`${getBasePath()}/mock/create/${binId}`)
	},

	handleShowModal(mock) {
		console.log(mock)
		this.setState({
			mock:mock,
			showModal: true
		})
	},

	handleHideModal() {
		this.setState({showModal: false})
	},

	removeMock(mock,e){
		let {actions} = this.props;
		actions.removeMock(mock._id,json=>{
			if(!json.result){
				alert(json.result)
			}else{
				this.fetchMocklist();
			}
		});
	},

	fetchPath(pathid){
		let {actions} = this.props;
		actions.fetchPath(pathid,json=>{
			if(!json.result){
				alert(json.result)
			}
		});
	},

	fetchMocklist(pathid){
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
  	pathname:state.mockList.pathname,
    pathid:state.mockList.pathid,
    mocks: state.mockList.mocks
  }
}

const dispatchToProps = (dispatch) => {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(stateToProps, dispatchToProps)(MockList);
