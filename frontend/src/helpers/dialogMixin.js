import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'react-bootstrap-myui/lib/Dialog';

const DialogMixin = {
	getInitialState() {
		return {
			dialogOptions: {
				show: false,
				title:'标题',
				content:'',
				width:600,
				height:300
			}
		}
	},
  componentDidMount() {
  	this._renderDialog();
  },
  componentDidUpdate() {
  	this._renderDialog();
  },
  _renderDialog() {
  	const dialogOptions = this.state.dialogOptions, 
  		dialog = (
	      <Dialog 
          className={dialogOptions.className}
	      	show={dialogOptions.show} 
	      	onHide={this.hideDialog} 
	      	size={{width:dialogOptions.width+'px',height:dialogOptions.height=='auto' ? 'auto' : (dialogOptions.height +'px')}}> 
          <Dialog.Header closeButton>
            <Dialog.Title>{dialogOptions.title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            {dialogOptions.content}
          </Dialog.Body>
        </Dialog>
	  	);

  	this._mountDialogTarget();
    this._dialogInstance = ReactDOM.unstable_renderSubtreeIntoContainer(
      this, dialog, this._dialogTarget
    );
  },
  _mountDialogTarget() {
    if (!this._dialogTarget) {
      this._dialogTarget = document.createElement('div');
      this._getContainerDOMNode().appendChild(this._dialogTarget);
    }
  },
  _getContainerDOMNode() {
  	const node = ReactDOM.findDOMNode(this), body = document.body
  	return node ? node.parentNode || body : body
  },
  hideDialog() {
		this.setState({
			dialogOptions: {
				...this.state.dialogOptions,
				show: false
			}
		})
	},
  showDialog(options) {
  	this.setState({
			dialogOptions: {
				...this.state.dialogOptions,
				show: true,
				title: options.title,
				content: options.content,
				width: options.width || 600,
				height:options.height || 300,
        className:options.className
			}
		})
  }
};

export default DialogMixin;