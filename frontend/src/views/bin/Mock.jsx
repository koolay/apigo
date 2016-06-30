import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as actionCreators } from '../../redux/modules/bin/mock';

import './mock.less';

const Mock = React.createClass({

	render() {
		const panelHeader = (<h3>接口定义</h3>)
		const panelFooter = (<Button pullRight bsStyle="primary">保存</Button>)

		return (
			<Grid data-page="bin/mock">
				<Panel bsStyle="primary" header={panelHeader} footer={panelFooter}>
		      <Row>
		      	<Col sm={6}>
		      		<form>
		      			<FormGroup>
		      				<ControlLabel>接口名称</ControlLabel>
		      				<FormControl type="text" placeholder="请输入接口名称" />
		      			</FormGroup>

		      			<FormGroup>
		      				<ControlLabel>接口路径</ControlLabel>
		      				<FormControl type="text" placeholder="请输入接口路径" />
		      			</FormGroup>

		      			<FormGroup>
		      				<ControlLabel>Status</ControlLabel>
		      				<InputGroup className="multi">
		      					<InputGroup.Addon>Code</InputGroup.Addon>
		      					<FormControl type="text" defaultValue="200" />
		      					<FormControl type="text" defaultValue="ok" />
		      				</InputGroup>
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
		      				<ControlLabel>Cookies</ControlLabel>
		      				<InputGroup className="multi">
		      					<InputGroup.Addon>Cookie</InputGroup.Addon>
		      					<FormControl type="text" placeholder="name" />
		      					<FormControl type="text" placeholder="value"/>
		      					<InputGroup.Button>
						          <Button bsStyle="success"><Glyphicon glyph="plus" /></Button>
						        </InputGroup.Button>
		      				</InputGroup>
		      			</FormGroup>

		      			<FormGroup>
		      				<ControlLabel>
		      					参数定义
		      					<OverlayTrigger placement="right" overlay={ (<Popover id="tip-params" className="field-tips">新增／修改操作后需要等待15分钟左右生效。“已生效”状态为可用状态。</Popover>) }>
				              <Glyphicon glyph="info-sign"/>
				            </OverlayTrigger>
		      				</ControlLabel>
		      				<FormControl componentClass="textarea" />
		      			</FormGroup>

		      			<FormGroup>
		      				<ControlLabel>
		      					响应内容定义
		      					<OverlayTrigger placement="right" overlay={ (<Popover id="tip-body" className="field-tips">新增／修改操作后需要等待15分钟左右生效。“已生效”状态为可用状态。</Popover>) }>
				              <Glyphicon glyph="info-sign"/>
				            </OverlayTrigger>
		      				</ControlLabel>
		      				<FormControl componentClass="textarea" />
		      			</FormGroup>

		      			<FormGroup>
		      				<ControlLabel>描述</ControlLabel>
		      				<FormControl componentClass="textarea" />
		      			</FormGroup>
		      		</form>
		      	</Col>
		      	<Col sm={6}></Col>
		      </Row>
		    </Panel>
			</Grid>
		)
	}

})

const stateToProps = (state) => {
  return {
    ...state.binMock,
    tipOptions: state.tip.tipOptions
  }
}

const dispatchToProps = (dispatch) => {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(stateToProps, dispatchToProps)(Mock);
