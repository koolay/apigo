import React from 'react';
import ReactDOM from 'react-dom';

import CodeMirror from 'codemirror';
// import 'codemirror/addon/lint/lint';
// import 'codemirror/addon/lint/javascript-lint';
// import 'jsonlint';
// import 'codemirror/addon/lint/json-lint';
import 'codemirror/mode/javascript/javascript';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
// import FormControl from 'react-bootstrap/lib/FormControl';
import FormControl from '../../components/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import Input from 'react-bootstrap/lib/Input';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as actionCreators } from '../../redux/modules/bin/define';

import './define.less';

const Define = React.createClass({
	getInitialState() {
		return {
			errors: {},
			inputValues: {
				name: null,
				host: null,
				params: null,
				response: null
			}
		}
	},

	componentDidMount() {
		// this.setPanelBodyHeight()
		const options = {
			lineNumbers: true,
			mode: {name: 'javascript', json: true}
		} 
		CodeMirror.fromTextArea(ReactDOM.findDOMNode(this.refs.params), options)
		CodeMirror.fromTextArea(ReactDOM.findDOMNode(this.refs.response), options)
	},

	render() {
		const { errors, inputValues } = this.state
		const panelHeader = (<h3>接口定义</h3>)
		const panelFooter = (<Button pullRight bsStyle="primary" onClick={this.handleSubmit}>保存</Button>)
		const tipText = '{id: string|length|require|desc}'
		const tipParams = (<Popover id="tip-params" className="field-tips">JSON格式，如：{'{"id": "string|length|require|desc"}'}<br/>其中，key为参数名，value为参数的值定义，以|分隔，分别代表数据类型、长度、是否必填、描述。</Popover>)
		const tipResponseBody = (<Popover id="tip-response" className="field-tips">JSON格式，如：{'{"result": "bool|desc", "data": {"id": "string|desc", "name": "string|desc"}}'}<br/>其中，value为数据值定义，以|分隔，分别代表数据类型、描述，可以对它的子对象进行定义。</Popover>)

		return (
			<Grid data-page="bin/define">
				<Panel ref="panel" header={panelHeader} footer={panelFooter}>
			    <form>
			    	<Row>
			      	<Col sm={6}>
			      		<FormGroup validationState={errors.name}>
		      				<ControlLabel>ApiID*</ControlLabel>
		      				<FormControl ref="name" type="text" placeholder="唯一的API接口标识符" value={inputValues.apiId} onChange={this.inputOnChange.bind(this, 'apiId')} />
		      			</FormGroup>

		      			<FormGroup validationState={errors.name}>
		      				<ControlLabel>Name*</ControlLabel>
		      				<FormControl ref="name" type="text" placeholder="接口名称" value={inputValues.name} onChange={this.inputOnChange.bind(this, 'name')} />
		      			</FormGroup>

		      			<FormGroup validationState={errors.host}>
		      				<ControlLabel>Host*</ControlLabel>
		      				<FormControl ref="host" type="text" placeholder="接口地址" value={inputValues.host} onChange={this.inputOnChange.bind(this, 'host')} />
		      			</FormGroup>

		      			<FormGroup>
		      				<ControlLabel>Method</ControlLabel>
		      				<FormControl ref="method" componentClass="select" defaultValue="GET">
		      					<option value="GET">GET</option>
		      					<option value="POST">POST</option>
		      					<option value="PUT">PUT</option>
		      					<option value="DELETE">DELETE</option>
		      					<option value="HEAD">HEAD</option>
		      					<option value="OPTIONS">OPTIONS</option>
		      				</FormControl>
		      			</FormGroup>

		      			<FormGroup>
		      				<ControlLabel>Headers</ControlLabel>
		      				<InputGroup className="multi">
		      					<InputGroup.Addon>Header</InputGroup.Addon>
		      					<FormControl type="text" placeholder="name" />
		      					<FormControl type="text" placeholder="value"/>
		      					<InputGroup.Button>
						          <Button bsStyle="success"><Glyphicon glyph="plus" /></Button>
						        </InputGroup.Button>
		      				</InputGroup>
		      			</FormGroup>

		      			<FormGroup>
		      				<ControlLabel>Description</ControlLabel>
		      				<FormControl ref="desc" componentClass="textarea" />
		      			</FormGroup>
			      	</Col>
			      	<Col sm={6}>
			      		<FormGroup validationState={errors.params}>
		      				<ControlLabel>
		      					Request params*
		      					<OverlayTrigger placement="right" overlay={tipParams}>
				              <Glyphicon glyph="info-sign"/>
				            </OverlayTrigger>
		      				</ControlLabel>
		      				<FormControl ref="params" componentClass="textarea" rows={4} value={inputValues.params} onChange={this.inputOnChange.bind(this, 'params')} />
		      			</FormGroup>

		      			<FormGroup validationState={errors.response}>
		      				<ControlLabel>
		      					Response body*
		      					<OverlayTrigger placement="right" overlay={tipResponseBody}>
				              <Glyphicon glyph="info-sign"/>
				            </OverlayTrigger>
		      				</ControlLabel>
		      				<FormControl ref="response" componentClass="textarea" rows={5} value={inputValues.response} onChange={this.inputOnChange.bind(this, 'response')} />
		      			</FormGroup>

		      			
			      	</Col>
			      </Row>
			    </form>
		    </Panel>
			</Grid>
		)
	},

	setPanelBodyHeight() {
		const panel = ReactDOM.findDOMNode( this.refs.panel ), 
			panelChildren = panel.children,
			winHeight = window.innerHeight,
			pageHeaderHeight = 89,
			pageFooterHeight = 89,
			panelHeaderHeight = 57,
			panelFooterHeight = 59,
			visibleHeight = winHeight - pageHeaderHeight - pageFooterHeight - panelHeaderHeight - panelFooterHeight;
		
		for (var i = 0; i < panelChildren.length; i++) {
			if (panelChildren[i].className === 'panel-body') {
				panelChildren[i].style.maxHeight = visibleHeight + 'px';
				break;
			}
		}
	},

	inputOnChange(name) {
		const inputValue = this.refs[name].getValue()
		let error = !!inputValue ? null : 'error'

		// 这里只更新当前输入框的值和状态
		this.setState({
			errors: {
				...this.state.errors,
				[name]: error
			},
			inputValues: {
				...this.state.inputValues,
				[name]: inputValue
			}
		})
	},

	validInputs() {
		const { inputValues } = this.state, refs = this.refs
		let errors = {}, hasError = false

		for (var t in inputValues) {
			// is require
			if (!inputValues[t]) {
				hasError = true
				errors[t] = 'error'
			} else {
				errors[t] = null
			}
		}

		this.setState({errors})

		return !hasError
	},

	handleSubmit() {
		if (!this.validInputs()) {
			return
		}

		console.log('valid...')

	}

})

const stateToProps = (state) => {
  return {
    ...state.binDefine,
    tipOptions: state.tip.tipOptions
  }
}

const dispatchToProps = (dispatch) => {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(stateToProps, dispatchToProps)(Define);
