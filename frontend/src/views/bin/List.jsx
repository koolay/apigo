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

import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as actionCreators } from '../../redux/modules/bin/list';
import getBasePath from '../../helpers/getBasePath';
import getApiPath from '../../helpers/getApiPath';
import { apiDomain } from '../../config'

import './list.less';

const BinList = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },

	getInitialState() {
    return {
      activeKey: 0,
      host:apiDomain,
      basePath:'/',
    };
  },

	componentDidMount() {
		this.props.actions.fetchBinList();
	},

	render() {
		const { list } = this.props
		const projectId = '57729f9d5df150cc0ab98825'

		return (
			<Grid data-page="bin/list">
				<Row className="toolbar">
					<h3>项目接口列表</h3>
					<Button bsStyle="primary" style={{backgroundColor:'#fff',color:'#2196F3',borderColor:'#a5ccfa'}} onClick={this.configTestDomain}>配置API测试域名</Button>
					<a href={getApiPath(`docs/${projectId}`)} target="_blank"><Button bsStyle="primary" style={{backgroundColor:'#fff',color:'#2196F3',borderColor:'#a5ccfa',marginRight:'20px'}}>在线API文档</Button></a>
					<Button bsStyle="primary" onClick={this.handleCreateBin} style={{marginRight:'20px'}}>创建接口</Button>
				</Row>

				<Form horizontal ref="apiTestDomain" style={{display:'none'}}>
			    <FormGroup controlId="formHorizontalEmail">
			      <Col sm={6}>
			      	<InputGroup>
      					<InputGroup.Addon>Host</InputGroup.Addon>
      					<FormControl type="text" defaultValue={this.state.host} onChange={this.changeDomain.bind(this,'host')}/>
      				</InputGroup>
			      </Col>
			      <Col sm={6}>
			        <InputGroup>
      					<InputGroup.Addon>BasePath</InputGroup.Addon>
      					<FormControl type="text" placeholder="没有可不填" value={this.state.basePath}  onChange={this.changeDomain.bind(this,'basePath')}/>
      				</InputGroup>
			      </Col>
			    </FormGroup>
			  </Form>

				<PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelectPanel} accordion>
	        <Panel header="项目1" eventKey={0}>
	        	<ListGroup fill className="bin-list">
		        	{list ? list.map((item, index) => 		
					      <ListGroupItem key={index}>
					      	<Row>
						      	<Col sm={8}>
						      		<h5 className="title">{item.summary}</h5>{item.path}
						      	</Col>
						      	<Col sm={4}>
						      		<div className="button-wrapper">
							      		<a href={getApiPath('apitest/'+item._id,{host:this.state.host,basePath:this.state.basePath})} target="_blank">在线测试</a>
							      		<LinkContainer to={`${getBasePath()}/mock/list/${item['_id']}`}><a href="javascript:;">MOCK列表</a></LinkContainer>
							      		<a href={getApiPath(`docs/${projectId}#${item.tag}-${item.summary}`)} target="_blank">详情</a>
							      	</div>
						      	</Col> 
					      	</Row>     	
					      </ListGroupItem>
		        	) : <ListGroupItem>没有可显示的数据</ListGroupItem>}
	        	</ListGroup>
	        </Panel>
	      </PanelGroup>
			</Grid>
		)
	},

	changeDomain(key,e){
		this.setState({
			[key]:e.target.value
		})
	},

	configTestDomain(){
		ReactDOM.findDOMNode(this.refs.apiTestDomain).style.display='block';
	},

	handleCreateBin() {
		this.context.router.push(`${getBasePath()}/bin/define`)
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
