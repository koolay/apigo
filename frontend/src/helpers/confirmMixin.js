import React from 'react';
import ReactDOM from 'react-dom';
import Confirm from 'react-bootstrap-myui/lib/Confirm';
import Button from 'react-bootstrap-myui/lib/Button';
import createChainedFunction from 'react-bootstrap-myui/lib/utils/createChainedFunction'

const ConfirmMixin = {
	getInitialState() {
		return {
			confirmOptions: {
				show: false,
				title: '提示',
        info: '',
				content: '',
        ok: null
			}
		}
	},
  componentDidMount() {
  	this._renderConfirm();
  },
  componentDidUpdate() {
  	this._renderConfirm();
  },
  _renderConfirm() {
  	const confirmOptions = this.state.confirmOptions, 
  		confirmDialog = (
        <Confirm 
          show={confirmOptions.show} 
          onHide={this.hideConfirm} 
          size={{width: '500px', height: '240px'}}> 
          <Confirm.Header closeButton>
            <Confirm.Title>{confirmOptions.title}</Confirm.Title>
          </Confirm.Header>
          <Confirm.Body bsType="warn">
            <Confirm.Title>{confirmOptions.info}</Confirm.Title>
            <p>{confirmOptions.content}</p>
          </Confirm.Body>
          <Confirm.Footer>
            <Button onClick={createChainedFunction(this.hideConfirm, confirmOptions.ok)} bsStyle="success">确定</Button>
            <Button onClick={this.hideConfirm}>取消</Button>
          </Confirm.Footer>
        </Confirm>
	  	);

  	this._mountConfirmTarget();
    this._confirmInstance = ReactDOM.unstable_renderSubtreeIntoContainer(
      this, confirmDialog, this._confirmTarget
    );
  },
  _mountConfirmTarget() {
    if (!this._confirmTarget) {
      this._confirmTarget = document.createElement('div');
      this._getConfirmContainerDOMNode().appendChild(this._confirmTarget);
    }
  },
  _getConfirmContainerDOMNode() {
  	const node = ReactDOM.findDOMNode(this), body = document.body
  	return node ? node.parentNode || body : body
  },
  hideConfirm() {
		this.setState({
			confirmOptions: {
				...this.state.confirmOptions,
				show: false
			}
		})
	},
  showConfirm(options) {
  	this.setState({
			confirmOptions: {
				...this.state.confirmOptions,
				show: true,
				title: options.title || '提示',
        info: options.info,
				content: options.content,
        ok: options.ok
      }
		})
  }
};

export default ConfirmMixin;