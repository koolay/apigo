import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Button from 'react-bootstrap-myui/lib/Button';
import Tabs from 'react-bootstrap-myui/lib/Tabs';
import Tab from 'react-bootstrap-myui/lib/Tab';
import Grid from 'react-bootstrap-myui/lib/Grid';
import Row from 'react-bootstrap-myui/lib/Row';
import Col from 'react-bootstrap-myui/lib/Col';

import SelectionButton from './SelectionButton'

import './indicator-selection.less';

const IndicatorSelection = React.createClass({
  
	getInitialState() {
    return {
      tabsActiveKey: 0
    };
  },

	render() {
		const { indicators, selectedIndicators } = this.props
		
		return (
				<div className="indicator-selection">

	        <Tabs activeKey={this.state.tabsActiveKey} className="page-tab" onSelect={this.handleSelectTab}>
	        	{indicators.map((category, categoryIndex) => 
	        		<Tab key={'tab-' + categoryIndex} eventKey={categoryIndex} title={category.name} />
	        	)}
          </Tabs> 

          {/* 切换tab时，不切换上面form面板，这里把content放到外面渲染，自己控制它的切换事件 */} 
	        <div className="padding">
	        	<Grid>
	        		<Row>
	        			<Col sm={8}>

	        				<div className="tab-content">
				          {indicators.map((category, categoryIndex) =>
				      			<div role="tabpanel" key={'indicator-wapper-' + categoryIndex} className="indicator-wapper" style={{display: this.state.tabsActiveKey === categoryIndex ? '' : 'none'}}>
				      			{Array.isArray(category.indicators) ? category.indicators.map((indicator, indicatorIndex) => {

				      				if(!Array.isArray(indicator.values) || indicator.values.length <= 0){
			    							return null
			    						}

			    						return (
			    							<div key={'indicator-' + indicatorIndex} className="indicators">
						          		<label key={'label-' + indicatorIndex} aria-name={indicator.name}>{indicator.name}：</label>
						          		{indicator.values.map((indicatorValue, i) => {
						          			let selected = selectedIndicators.indexOf(indicatorValue.id) !== -1
						          			return <SelectionButton selected={selected} key={'button' + i} onClick={this.handleSelectIndicator.bind(this, indicator, indicatorValue)}>{indicatorValue.name}</SelectionButton>
						          		})}
						          	</div>
			    						)		          	
						          
				      			}) : null}
				      			</div>
				          )}
				          </div>

	        			</Col>

	        			<Col sm={4}>
	        				{this.props.children}
	        			</Col>
	        		</Row>
	        	</Grid>
	        	
	        </div>
	      </div> 
			)
	},

	handleSelectTab(key) {
		this.setState({
			tabsActiveKey: key
		})
	},

	handleSelectIndicator(indicator, indicatorValue) {		
		this.props.handleSelectIndicator( indicator, indicatorValue )
	}

});

IndicatorSelection.PropTypes = {
	/**
	 * 指标数据
	 */
	indicators: PropTypes.array,
	/**
	 * 选中的指标数据，其为IndicatorValue.indicator_value_id数组
	 */
	selectedIndicators: PropTypes.array,
	/**
	 * 选取指标项的回调函数，回传参数 indicator（选中的指标值所属的指标对象）, indicatorValue（选中的指标值对象）
	 */
	handleSelectIndicator: PropTypes.func

}

IndicatorSelection.defaultProps = {
	indicators: [],
	selectedIndicators: [],
	handleSelectIndicator: () => {}
}

export default IndicatorSelection;

