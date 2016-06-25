import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap-myui/lib/Navbar';
import Breadcrumb from 'react-bootstrap-myui/lib/Breadcrumb';
import Tabs from 'react-bootstrap-myui/lib/Tabs';
import Tab from 'react-bootstrap-myui/lib/Tab';
import Input from 'react-bootstrap-myui/lib/Input';
import Grid from 'react-bootstrap-myui/lib/Grid';
import Row from 'react-bootstrap-myui/lib/Row';
import Col from 'react-bootstrap-myui/lib/Col';
import ButtonInput from 'react-bootstrap-myui/lib/ButtonInput';
import Select from 'react-bootstrap-myui/lib/Select';

import { Form, ValidatedInput } from '../../../components/bootstrap-validation'
import IndicatorSelection from '../../../components/IndicatorSelection'
import SelectionButton from '../../../components/SelectionButton'

import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TipMixin from '../../../helpers/tipMixin';
import getBasePath from '../../../helpers/getBasePath';

import { actions as populationActionCreators } from '../../../redux/modules/examples/tag/addOrEdit';
import { actions as tipActionCreators } from '../../../redux/modules/tip';

import './add-edit.less';

const PopulationTagAddOrEdit = React.createClass({
	mixins: [TipMixin],
  
	getInitialState() {
    return {
      info: {
      	id: null,
      	name: '',
      	/**
	       * 当前选取的指标项数据
	       */
      	indicators: [],
      	/**
	       * 当前选取的指标项，以指标项的ID存储，方便后面使用
	       */
      	selectedIndicators: []
      },
      /**
       * 标识当前页面是否加载完成
       */
      loaded: false,
      /**
       * 标识是否选中了“新增”标签类别
       */
      isAddIndicatorType: false,
      /**
       * 标签类别输入框的值（ 仅isAddIndicatorType=true时有效 ）
       */
      indicatorTypeValue: ''
    };
  },
  
	componentDidMount() {
		const { actions, params } = this.props
		const populationTagId = params.populationTagId

		actions.fetchAllIndicators({except_tag: 1})
			.then(actions.fetchAllIndicatorTypes)
			.then(() => {
				if(populationTagId){
					actions.fetchPopulationTagDetail( populationTagId )
				}
				this.setState({loaded: true})
			})
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.info !== this.props.info) {
			this.setState({info: nextProps.info})
		}
	},

	render() {
		const basePath = getBasePath()
		const { info, loaded } = this.state
		const { indicators, params } = this.props
		
		return (
				<div className="population-tag-addoredit">
	        <Navbar className="page-title">
	          <Navbar.Header>
	            <Navbar.Brand>
	            	<Breadcrumb className="page-breadcrumb">
	            		<LinkContainer to={`${basePath}/examples/tag/list`}><Breadcrumb.Item>客户标签管理</Breadcrumb.Item></LinkContainer>
	            		<Breadcrumb.Item active>{params.populationTagId ? '客户标签修改' : '新增客户标签'}</Breadcrumb.Item>
	            	</Breadcrumb>
	            </Navbar.Brand>
	          </Navbar.Header>
	        </Navbar>

	        {loaded ? (
	        	<IndicatorSelection 
		        	indicators={indicators}
		        	selectedIndicators={info.selectedIndicators}
		        	handleSelectIndicator={this.handleSelectIndicator}>
		        	{ this.renderFormPanel() }
		        </IndicatorSelection>
	        ) : null}

	      </div> 
			)
	},

	renderFormPanel() {
		const { info, isAddIndicatorType, indicatorTypeValue } = this.state
		const { indicatorTypes, params } = this.props

		const renderIndicatorTypeInput = () => {
			return (
					<ValidatedInput
						ref="inputIndicatorType"
	          type="text"
	          // Each input that you need validated should have
	          // the "name" prop
	          name="indicatorType"
	          // Validation rules separated with comma
	          validate="required"
	          // Error messages for each error type
	          errorHelp="请输入标签类别"
	          value={indicatorTypeValue}
	          onChange={this.handleChangeIndicatorTypeValue} />
				)
		}

		const renderIndicatorTypePanel = () => {
			// 修改时，标签类别直接显示值，不给修改
			if (params.populationTagId) {
				return (
					<div style={{marginBottom: '20px'}}>
						<label>标签类别：{info.indicator ? info.indicator.name : ''}</label>
					</div>
				)
			} else {

				//当标签类别下拉框的值为空时，直接显示新增输入框，否则判断是否选取了“新增”，显示相应DOM
				return indicatorTypes.length > 0 ? (

					isAddIndicatorType ? (
						<div>
							<div style={{marginBottom: '5px'}}>
								<label>标签类别：</label>
								<Input ref="chbAddIndicatorType" type="checkbox" label="新增" groupClassName="form-group-checkbox" checked={isAddIndicatorType} onChange={this.handleCheckAddIndicatorType} />
							</div>
							{renderIndicatorTypeInput()}
						</div>
		      ) : (
			      <div>
			      	<div style={{marginBottom: '5px'}}>
								<label>标签类别：</label>
								<Input ref="chbAddIndicatorType" type="checkbox" label="新增" groupClassName="form-group-checkbox" checked={isAddIndicatorType} onChange={this.handleCheckAddIndicatorType} />
							</div>
			      	<div className="form-group">
								<Select ref="selectIndicatorType" width={'100%'} selected={[0]}>
									{indicatorTypes.map((item, index) => 
										<option key={index} value={item.id}>{item.name}</option>
									)}
								</Select>
							</div>
			      </div>
		      )

				) : (
					<div>
						<div style={{marginBottom: '5px'}}>
							<label>标签类别：</label>
						</div>
						{renderIndicatorTypeInput()}
					</div>
				)
			}
		}

		return (
			<Form onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handelInvalidSubmit} className="form-wapper">
				<div className="title">自定义标签</div>
				<div ref="formContent" className="content">
					{ renderIndicatorTypePanel() }

					<label>标签名称：</label>
					<ValidatedInput
						ref="inputPopulationTagName"
            type="text"
            // Each input that you need validated should have
            // the "name" prop
            name="populationTagName"
            // Validation rules separated with comma
            validate="required"
            // Error messages for each error type
            errorHelp="请输入标签名称"
            value={info.name}
            onChange={this.handleChangeValue} />
					
					<div className="indicator-wapper">
					{info.indicators && info.indicators.map((indicator, indicatorIndex) => {
						if(!indicator.values || indicator.values.length <= 0){
							return null
						}

						return (
							<div key={indicatorIndex} className="indicators">
	          		<label>{indicator.name}：</label>
	          		{indicator.values.map((indicatorValue, i) =>
	          			<SelectionButton key={i} selected={true} onClick={this.handleSelectIndicator.bind(this, indicator, indicatorValue)}>{indicatorValue.name}</SelectionButton>	
	          		)}
	          	</div>
	          )
					})}
					</div>
				</div>
				<div className="footer">
					<ButtonInput type='submit' bsStyle='primary' value='保存'/>
				</div>
			</Form>
		)
	},

	handleChangeValue() {
		this.setState({
			info: {
				...this.state.info,
				name: this.refs.inputPopulationTagName.getValue()
			}
		})
	},

	handleChangeIndicatorTypeValue() {
		const value = this.refs.inputIndicatorType.getValue()

		this.setState({
			indicatorTypeValue: value
		})
	},

	handleCheckAddIndicatorType() {
		this.setState({
			isAddIndicatorType: !this.state.isAddIndicatorType
		})
	},

	handleSelectIndicator(indicator, indicatorValue) {
		
		let __info = this.state.info, selected = __info.selectedIndicators.indexOf( indicatorValue.id ) === -1

		let indicators = __info.indicators ? __info.indicators.slice() : []

		if(selected){

			//判断当前选取的指标所在的组是否已存在
			let has = indicators.some(item => item.id === indicator.id)

			//如果当前选取的指标所在的组已存在，则更新该指标组数据，否则则新增一个指标组到indicators中
			if(has){
				
				indicators = indicators.map(item => {
					return item.id === indicator.id ? ({
						...item,
						values: [...item.values, {
							id: indicatorValue.id,
							name: indicatorValue.name
						}]
					}) : item
				})

			}else{

				indicators.push({
					id: indicator.id,
					name: indicator.name,
					values: [indicatorValue]
				})

			}

		}else{ //当前选取的指标项已存在时，把indicators中的相应数据清除

			indicators = indicators.map(item => {
				//判断选取的指标项是哪个指标组下的
				if(item.id === indicator.id){
					let values = item.values || []

					return {
						...item,
						values: values.filter(v => v.id !== indicatorValue.id)
					}
				}
				return item
			})

		}	

		//更新selectedIndicators
		let selectedIndicators = selected ? [...__info.selectedIndicators, indicatorValue.id] : __info.selectedIndicators.filter(selectedItem => selectedItem !== indicatorValue.id)

		// 更新info.indicators、info.selectedIndicators
		let info = {
			...__info,
			indicators,
			selectedIndicators
		}

		this.setState({ info })

	},

	handleValidSubmit() {
		const { info } = this.state

		// 没有满足当前客户人群的人员时，给出提示，并且不让保存
		if(!info.selectedIndicators || info.selectedIndicators.length <= 0) {
			return this.showErrorMessage('请先设置指标，然后再保存。')
		}

		this.props.actions.savePopulationTag( this.getFormData() )
	},

	getFormData(formData) {
		const { indicatorTypes, params } = this.props
		const { isAddIndicatorType } = this.state
		let info = formData || this.state.info

		let indicator_data = info.indicators && info.indicators.length > 0 ? info.indicators.map(item => {
			return {
				indicator_id: item.id,
				values: item.values.map(v => v.id)
			}
		}) : []

		let data = {
			id: info.id,
			name: info.name,
			remark: info.name, //暂时写死为name值
			indicator_data: indicator_data
		}

		// 新增时，把标签类别加上
		if (!params.populationTagId) {
			let indicator

			if (isAddIndicatorType || !indicatorTypes || indicatorTypes.length <= 0) { // 输入框的“标签类别”; 当标签类别下拉框数据为空时，直接取输入框的值
				data.indicator = {
					id: '',
					name: this.refs.inputIndicatorType.getValue()
				}
			} else { // 下拉选择框的标签类别
				 // 下拉框返回的selected是个数组
				let selected = this.refs.selectIndicatorType.getSelected()[0]
				data.indicator = {
					id: selected.value,
					name: selected.text
				}
			}
		}

		return data
	},

	handelInvalidSubmit() {
		// 把formContent.scrollTop设为0，避免它看不到表单元素的错误信息
		ReactDOM.findDOMNode( this.refs.formContent ).scrollTop = 0
	},

	showErrorMessage(message) {
		this.showTip({
			show: true,
			status: 'error',
			content: message
		})
	}

})

const stateToProps = (state) => {
  return {
    ...state.tagAddOrEdit,
    tipOptions: state.tip.tipOptions
  }
}

const dispatchToProps = (dispatch) => {
	return { actions: bindActionCreators(populationActionCreators, dispatch), tipActions: bindActionCreators(tipActionCreators, dispatch) }
}

export default connect(stateToProps, dispatchToProps)(PopulationTagAddOrEdit);

