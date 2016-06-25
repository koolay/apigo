import React from 'react';
import ReactDOM from 'react-dom';
import Tip from 'react-bootstrap-myui/lib/Tip';

import { tipOptions } from './tipUtils'

const TipMixin = {
	getInitialState() {
		return {
			tipOptions
		}
	},
  componentWillReceiveProps(nextProps) {
    const tipOptions = nextProps.tipOptions

    if( tipOptions && tipOptions.show !== this.state.tipOptions.show ){

      this.setState({
        tipOptions: {
          show: tipOptions.show,
          status: tipOptions.status,
          content: tipOptions.content,
          timeout: tipOptions.timeout || '2000'
        }
      })

    }   
  },
  componentDidMount() {
    this._renderTip();
  },
  componentDidUpdate() {
  	this._renderTip();
  },
  componentWillUnmount() {
    if(this.props.tipActions && this.props.tipActions.clearTipStatus){
      this.props.tipActions.clearTipStatus()
    }
  },
  _renderTip() {
  	const tipOptions = this.state.tipOptions, 
  		tip = tipOptions.show ?  (
        <Tip 
          status={tipOptions.status} 
          show={tipOptions.show}
          container={this}
          onDismiss = {this.hideTip} 
          timeout= {tipOptions.timeout}
        > 
          <span>{tipOptions.content}</span>
        </Tip>
	  	): (<div></div>);

    this._mountTipTarget();
    this._tipInstance = ReactDOM.unstable_renderSubtreeIntoContainer(
      this, tip, this._tipTarget
    );
  },
  _mountTipTarget() {
    if (!this._tipTarget) {
      this._tipTarget = document.createElement('div');
      this._getTipContainerDOMNode().appendChild(this._tipTarget);
    }
  },
  _getTipContainerDOMNode() {
    const node = ReactDOM.findDOMNode(this), body = document.body
    return node ? node.parentNode || body : body
  },
  hideTip() {
    //需要判断当前component是否已mount，不然可能会出现警告
		this.isMounted() && this.setState({
			tipOptions: {
				...this.state.tipOptions,
				show: false
			}
		})
	},
  showTip(options) {
  	this.isMounted() && this.setState({
			tipOptions: {
				...this.state.tipOptions,
				show: true,
        status: options.status,
				content: options.content,
        timeout: '2000'
			}
		})
  }
};

export default TipMixin;