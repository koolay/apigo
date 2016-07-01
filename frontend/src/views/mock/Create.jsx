import React from 'react';
import ReactDOM from 'react-dom';

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

import CodeExample from '../../components/CodeExample';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as actionCreators } from '../../redux/modules/bin/define';

import '../bin/define.less';
import './create.less';

const DEFALUT_METHOD = 'GET'
const DEFALUT_CONTENT_TYPE = 'application/json'

const Create = React.createClass({
	// CodeMirror 在初始后，会创建一个实例对象，如果再次对同一个textarea进行初始化，会出现多个editor
	// 这里把editor缓存起来
	codeEditors: {},
	getInitialState() {
		return {
			errors: {},
			inputValues: {
				summary: null, //接口名称
				description: null,		
				/**
				 * request对象，包括method, contentType, params, headers
				 * @type {Object}
				 */
				request: {
					method: DEFALUT_METHOD,
					contentType: DEFALUT_CONTENT_TYPE,
					params: null,
					headers: [{
						key: null,
						description: null
					}]
				},
				/**
				 * response 可以定义多组，每组都有http-code, content-type, headers, schema值
				 * @type {Array}
				 */
				responses: [{
					httpCode: null,
					contentType: DEFALUT_CONTENT_TYPE,
					headers: [{
						key: null,
						description: null
					}],
					schema: null
				}]
			}
		}
	},

	componentDidMount() {
		// this.setPanelBodyHeight()
		this.initCodeMirror()
	},

	componentDidUpdate() {
		// this.setPanelBodyHeight()
		this.initCodeMirror()
	},

	initCodeMirror() {
		const options = {
			lineNumbers: true,
			mode: {name: 'javascript', json: true}
		} 

		if (CodeMirror) {
			const paramsRef = 'request.params'

			if (!this.codeEditors[paramsRef]) {
				this.codeEditors[paramsRef] = true
				CodeMirror.fromTextArea(ReactDOM.findDOMNode(this.refs[paramsRef]), options)
						// 这里监听editor的change事件，实时更新value到textarea，以便更新textarea的校验状态
						.on('change', (editor) => {
							editor.save()
							this.requestParamsInputOnChange()
						})
			}
			

			// response body
			this.state.inputValues.responses.forEach((item, index) => {
				const bodyRef = `responses.schema${index}`
				if (!this.codeEditors[bodyRef]){
					this.codeEditors[bodyRef] = true
					CodeMirror.fromTextArea(ReactDOM.findDOMNode(this.refs[bodyRef]), options)
							.on('change', (editor) => {
								editor.save()
								this.responseBodyInputOnChange(index)
							})
				}
			})
			
		}
	},

	render() {
		const { errors, inputValues, headerInputs } = this.state
		const panelHeader = (<h3>数据模拟</h3>)
		const panelFooter = (<Button pullRight bsStyle="primary" onClick={this.handleSubmit}>保存</Button>)
		const codeMode = {name: 'javascript', json: true}
		const tipText = 
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
}
`
		const tipNodes = (
				<div className="highlight">
					<CodeExample mode={codeMode} codeText={tipText}/>
					<p>其中，root节点的key值为字段名，它的属性定义格式如下：</p>
					<p>type，数据类型，必填，值可为：['string', 'integer', 'boolean', 'number', 'array', 'object']，当type=array时，它的子属性集合为 items，当type=object时，它的子属性集合为 properties</p>
					<p>default，默认值</p>
					<p>required，标识是否必填，true || false</p>
					<p>description，字段描述</p>
				</div>
			)
		const tipParams = (<Popover id="tip-params" className="field-tips">{tipNodes}</Popover>)
		const tipResponseBody = (<Popover id="tip-response" className="field-tips">{tipNodes}</Popover>)

		return (
			<Grid data-page="mock/create">
				<Panel ref="panel" header={panelHeader} footer={panelFooter}>
			    <form>
			    	<Row>
			      	<Col sm={6}>
			      		<FormGroup validationState={errors.summary}>
		      				<ControlLabel>Name*</ControlLabel>
		      				<FormControl ref="summary" type="text" placeholder="接口名称" value={inputValues.summary} onChange={this.inputOnChange.bind(this, 'summary')} />
		      			</FormGroup>

		      			<FormGroup>
		      				<ControlLabel>Method</ControlLabel>
		      				<FormControl ref="request.method" componentClass="select" value={inputValues.request.method} onChange={this.requestMethodInputOnChange}>
		      					<option value="GET">GET</option>
		      					<option value="POST">POST</option>
		      					<option value="PUT">PUT</option>
		      					<option value="DELETE">DELETE</option>
		      					<option value="HEAD">HEAD</option>
		      					<option value="OPTIONS">OPTIONS</option>
		      				</FormControl>
		      			</FormGroup>

		      			<FormGroup className="multi">
		      				<ControlLabel>Request Headers</ControlLabel>
		      				<InputGroup>
		      					<InputGroup.Addon>Content-Type</InputGroup.Addon>
		      					<FormControl ref="request.contentType" componentClass="select" value={inputValues.request.contentType} onChange={this.requestContentTypeInputOnChange}>
			      					<option value="application/json">application/json</option>
			      					<option value="text/xml">text/xml</option>
			      					<option value="text/html">text/html</option>
			      				</FormControl>
		      				</InputGroup>

		      				{inputValues.request.headers.map((item, index) => {
		      					const keyRef = `request.header.key${index}`
		      					const valueRef = `request.header.value${index}`
		      					const isLast = index === (inputValues.request.headers.length - 1)
		      					const buttonBsStyle = isLast ? 'success' : 'danger'
		      					const glyph = isLast ? 'plus' : 'remove'
		      					const handleClick = isLast ? this.handleAddRequestHeaderInput : this.handleRemoveRequestHeaderInput.bind(this, index)
		      					return (
		      						<InputGroup key={index} className="multi">
				      					<InputGroup.Addon>Header</InputGroup.Addon>
				      					<FormControl ref={keyRef} type="text" value={item.key} placeholder="key" onChange={this.requestHeadersInputOnChange.bind(this, keyRef, index, 'key')} />
				      					<FormControl ref={valueRef} type="text" value={item.description} placeholder="description" onChange={this.requestHeadersInputOnChange.bind(this, valueRef, index, 'description')} />
				      					<InputGroup.Button>
								          <Button bsStyle={buttonBsStyle} onClick={handleClick}><Glyphicon glyph={glyph} /></Button>
								        </InputGroup.Button>
				      				</InputGroup>
		      					)
		      				})}
		      			</FormGroup>

		      			<FormGroup>
		      				<ControlLabel>
		      					Request Params
		      					<OverlayTrigger placement="right" overlay={tipParams}>
				              <Glyphicon glyph="info-sign"/>
				            </OverlayTrigger>
		      				</ControlLabel>
		      				<FormControl ref="request.params" componentClass="textarea" rows={4} value={inputValues.request.params} />
		      			</FormGroup>

		      			<FormGroup>
		      				<ControlLabel>Description</ControlLabel>
		      				<FormControl ref="description" componentClass="textarea" value={inputValues.description} onChange={this.inputOnChange.bind(this, 'description')} />
		      			</FormGroup>
			      	</Col>
			      	<Col sm={6}>
			      		<div className="response-add-button-wrapper"><Button bsStyle="primary" onClick={this.handleAddResponseGroup}>Add Response</Button></div>
			      		{inputValues.responses && inputValues.responses.map((item, groupIndex) => {
			      			const httpCodeRef = `responses.httpCode${groupIndex}`
			      			const contentTypeRef = `responses.contentType${groupIndex}`
			      			const bodyRef = `responses.schema${groupIndex}`
				      		
				      		return (
				      			<div key={groupIndex} className="response-group-wrapper">
				      				{groupIndex > 0 ? <div className="response-add-button-wrapper"><Button bsStyle="danger" onClick={this.handleRemoveResponseGroup.bind(this, groupIndex)}>Remove</Button></div> : null}
				      				<FormGroup validationState={errors.path}>
					      				<ControlLabel>HTTP Code*</ControlLabel>
					      				<FormControl ref={httpCodeRef} type="text" placeholder="http code" value={item.httpCode} onChange={this.responseHttpCodeInputOnChange.bind(this, groupIndex)} />
					      			</FormGroup>

				      				<FormGroup className="multi">
					      				<ControlLabel>Response Headers</ControlLabel>
					      				<InputGroup>
					      					<InputGroup.Addon>Content-Type</InputGroup.Addon>
					      					<FormControl ref={contentTypeRef} componentClass="select" value={item.contentType} onChange={this.responseContentTypeInputOnChange.bind(this, groupIndex)}>
						      					<option value="application/json">application/json</option>
						      					<option value="text/xml">text/xml</option>
						      					<option value="text/html">text/html</option>
						      				</FormControl>
					      				</InputGroup>

					      				{item.headers && item.headers.map((header, index) => {
					      					const keyRef = `responses.headers.key${groupIndex}${index}`
					      					const valueRef = `responses.headers.value${groupIndex}${index}`
					      					const isLast = index === (item.headers.length - 1)
					      					const buttonBsStyle = isLast ? 'success' : 'danger'
					      					const glyph = isLast ? 'plus' : 'remove'
					      					const handleClick = isLast ? this.handleAddResponseHeaderInput.bind(this, groupIndex) : this.handleRemoveResponseHeaderInput.bind(this, groupIndex, index)
					      					return (
					      						<InputGroup key={index} className="multi">
							      					<InputGroup.Addon>Header</InputGroup.Addon>
							      					<FormControl ref={keyRef} type="text" value={header.key} placeholder="key" onChange={this.responseHeadersInputOnChange.bind(this, keyRef, groupIndex, index, 'key')} />
							      					<FormControl ref={valueRef} type="text" value={header.description} placeholder="description" onChange={this.responseHeadersInputOnChange.bind(this, valueRef, groupIndex, index, 'description')} />
							      					<InputGroup.Button>
											          <Button bsStyle={buttonBsStyle} onClick={handleClick}><Glyphicon glyph={glyph} /></Button>
											        </InputGroup.Button>
							      				</InputGroup>
					      					)
					      				})}
					      			</FormGroup>

					      			<FormGroup validationState={errors.responses}>
					      				<ControlLabel>
					      					Response Body*
					      					<OverlayTrigger placement="left" overlay={tipResponseBody}>
							              <Glyphicon glyph="info-sign"/>
							            </OverlayTrigger>
					      				</ControlLabel>
					      				<FormControl ref={bodyRef} componentClass="textarea" rows={5} value={item.schema} />
					      			</FormGroup> 
				      			</div>
				      		)
			      		})}			      		 			
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

	handleAddRequestHeaderInput() {
		console.log('handleAddRequestHeaderInput')
		const { inputValues } = this.state

		this.setState({
			inputValues: {
				...inputValues,
				request: {
					...inputValues.request,
					headers: [...inputValues.request.headers, {key: null, description: null}]
				} 
			}
		})
	},

	handleRemoveRequestHeaderInput(index) {
		console.log('handleRemoveRequestHeaderInput', index)
		const { inputValues } = this.state

		this.setState({
			inputValues: {
				...inputValues,
				request: {
					...inputValues.request,
					headers: inputValues.request.headers.filter((item, i) => i !== index)
				} 
			}
		})
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

	requestMethodInputOnChange() {
		const name = 'request.method'
		const { inputValues } = this.state
		const inputValue = this.refs[name].getValue()
		
		// 这里只更新当前输入框的值和状态
		this.setState({
			inputValues: {
				...inputValues,
				request: {
					...inputValues.request,
					method: inputValue
				}
			}
		})	
	},

	requestContentTypeInputOnChange() {
		const name = 'request.contentType'
		const { inputValues } = this.state
		const inputValue = this.refs[name].getValue()
		
		// 这里只更新当前输入框的值和状态
		this.setState({
			inputValues: {
				...inputValues,
				request: {
					...inputValues.request,
					contentType: inputValue
				}
			}
		})
	},

	requestParamsInputOnChange() {
		const name = 'request.params'
		const { inputValues } = this.state
		const inputValue = this.refs[name].getValue()
		// let error = !!inputValue ? null : 'error'

		// 这里只更新当前输入框的值和状态
		this.setState({
			// errors: {
			// 	...this.state.errors,
			// 	[name]: error
			// },
			inputValues: {
				...inputValues,
				request: {
					...inputValues.request,
					params: inputValue
				}
			}
		})
	},

	requestHeadersInputOnChange(name, index, type) {
		const inputValue = this.refs[name].getValue()
		const { inputValues } = this.state

		// 这里只更新当前输入框的值和状态
		this.setState({
			inputValues: {
				...inputValues,
				request: {
					...inputValues.request,
					headers: inputValues.request.headers.map((item, i) => {
						if (i === index) {
							return type === 'key' ? {key: inputValue, description: item.value} : {key: item.key, description: inputValue}
						}

						return item
					})
				}
			}
		})
	},

	handleAddResponseGroup() {
		console.log('handleAddResponseGroup')
		const { inputValues } = this.state

		this.setState({
			inputValues: {
				...inputValues,
				responses: [...inputValues.responses, {
					httpCode: null,
					contentType: DEFALUT_CONTENT_TYPE,
					headers: [{
						key: null,
						description: null
					}],
					schema: null
				}]
			}
		})
	},

	handleRemoveResponseGroup(index) {
		console.log('handleRemoveResponseGroup')
		const { inputValues } = this.state

		this.setState({
			inputValues: {
				...inputValues,
				responses: inputValues.responses.filter((item, i) => i !== index)
			}
		})
	},

	responseHeadersInputOnChange(name, groupIndex, headerIndex, type) {
		const inputValue = this.refs[name].getValue()
		const { inputValues } = this.state

		console.log('responseHeadersInputOnChange:', name, groupIndex, headerIndex, type, inputValue)

		let responses = inputValues.responses.map((response, i) => {
				if (i === groupIndex) {
					let headers = response.headers.map((header, j) => {
						if (j === headerIndex) {
							return type === 'key' ? {key: inputValue, description: header.description} : {key: header.key, description: inputValue}
						}
						return header
					})
					return {...response, headers}
				}
				return response
			})

		console.log('responses:', responses)

		// 这里只更新当前输入框的值和状态
		this.setState({
			inputValues: {
				...inputValues,
				responses
			}
		})
	},

	handleAddResponseHeaderInput(groupIndex) {
		console.log('handleAddResponseHeaderInput', groupIndex)
		const { inputValues } = this.state

		let responses = inputValues.responses.map((response, i) => {
				if (i === groupIndex) {
					return {...response, headers: [...response.headers, {key: null, description: null}]}
				}
				return response
			})

		console.log('responses:', responses)

		this.setState({
			inputValues: {
				...inputValues,
				responses
			}
		})
	},

	handleRemoveResponseHeaderInput(groupIndex, headerIndex) {
		console.log('handleRemoveResponseHeaderInput', groupIndex, headerIndex)
		const { inputValues } = this.state

		let responses = inputValues.responses.map((response, i) => {
				if (i === groupIndex) {
					let headers = response.headers.filter((header, j) => j !== headerIndex)
					return {...response, headers}
				}
				return response
			})

		console.log('responses:', responses)

		this.setState({
			inputValues: {
				...inputValues,
				responses
			}
		})
	},

	responseHttpCodeInputOnChange(groupIndex) {
		console.log('responseHttpCodeInputOnChange', groupIndex)
		const { inputValues } = this.state
		const inputValue = this.refs[`responses.httpCode${groupIndex}`].getValue()

		let responses = inputValues.responses.map((response, i) => {
				if (i === groupIndex) {
					return {...response, httpCode: inputValue}
				}
				return response
			})

		console.log('responses:', responses)

		this.setState({
			inputValues: {
				...inputValues,
				responses
			}
		})
	},

	responseContentTypeInputOnChange(groupIndex) {
		console.log('responseContentTypeInputOnChange', groupIndex)
		const { inputValues } = this.state
		const inputValue = this.refs[`responses.contentType${groupIndex}`].getValue()

		let responses = inputValues.responses.map((response, i) => {
				if (i === groupIndex) {
					return {...response, contentType: inputValue}
				}
				return response
			})

		console.log('responses:', responses)

		this.setState({
			inputValues: {
				...inputValues,
				responses
			}
		})
	},

	responseBodyInputOnChange(groupIndex) {
		const name = `responses.schema${groupIndex}`
		const { inputValues } = this.state
		const inputValue = this.refs[name].getValue()
		// let error = !!inputValue ? null : 'error'
		
		let responses = inputValues.responses.map((response, i) => {
				if (i === groupIndex) {
					return {...response, schema: inputValue}
				}
				return response
			})

		console.log('responses:', responses) 
		

		// 这里只更新当前输入框的值和状态
		this.setState({
			// errors: {
			// 	...this.state.errors,
			// 	[name]: error
			// },
			inputValues: {
				...inputValues,
				responses
			}
		})
	},

	validInputs() {
		const { inputValues } = this.state, refs = this.refs, excludes = 'request|responses|description'
		let errors = {}, hasError = false

		for (var t in inputValues) {
			if (excludes.indexOf(t) !== -1) {
				continue;
			}

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

		console.log('valid...', this.state.inputValues)

		this.props.actions.saveDatas( this.state.inputValues )
			.then(() => {
				console.log( this.props.saved )
				if ( this.props.saved === true ) {
					window.alert('保存成功')
				} else {
					window.alert('保存失败')
				}
			})

	}

})

const stateToProps = (state) => {
  return {
    ...state.mockCreate,
    tipOptions: state.tip.tipOptions
  }
}

const dispatchToProps = (dispatch) => {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(stateToProps, dispatchToProps)(Create);
