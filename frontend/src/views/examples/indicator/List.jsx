import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap-myui/lib/Navbar';
import DataTable from 'react-bootstrap-myui/lib/DataTable';
import Loading from 'react-bootstrap-myui/lib/Loading';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TipMixin from '../../../helpers/tipMixin';

import { DEFAULT_PAGINATION_OPTIONS } from '../../../constants/paginationOptions';

import { actions as indicatorActionCreators } from '../../../redux/modules/examples/indicator/list';
import { actions as tipActionCreators } from '../../../redux/modules/tip';

import './list.less';

const Page1 = React.createClass({
  mixins: [TipMixin],
  componentDidMount(){
    const { actions, list } = this.props
    // 仅当list=false时刷新列表数据
    if (!list || list.length <= 0) {
      actions.fetchList( 1 )
    }
  },

	render(){
		const { actions, list, total, currentPage, pending } = this.props
    
    const dataFields = [{
      idField: true,
      name: 'id'
    }, {
      name: 'name',
      text: '指标'
    }, {
      name: 'cate_name',
      text: '指标类型'
    }, {
      name: 'source',
      text: '数据来源'
    }];

    const rowTemplate = (
      <tr>
        <td>%id%</td>
        <td>%name%</td>
        <td className="cell-cate-name">%cate_name%</td>
        <td className="cell-source">%source%</td>
      </tr>
    );

    const pagination = {
      ...DEFAULT_PAGINATION_OPTIONS,
      activePage: currentPage, 
      total: total, 
      onChangePage: this.handleChangePage
    };

    let emptyText = (
      <p>没有可显示的数据</p>
    );

    if (pending && (!list || list.length <= 0)) {
      emptyText = (<p>数据加载中...</p>)
    }

		return (
      <div className="indicator-data-list">
        <Navbar className="page-title">
          <Navbar.Header>
            <Navbar.Brand>基础指标</Navbar.Brand>
          </Navbar.Header>
        </Navbar>

  			<div className="data-view padding">
          <DataTable 
            tableWrapperId='datatable-wrapper'
            hover 
            serialNumber 
            bordered={false} 
            dataFields={dataFields} 
            data={list} 
            rowTemplate={rowTemplate}
            emptyText={emptyText}
            pagination={pagination}/> 
          <Loading show={pending} containerId='datatable-wrapper' />       
        </div> 
      </div>   
		)
	},
	
  handleChangePage(event, selectEvent){
    this.props.actions.fetchList(selectEvent.eventKey)
  }

})

const stateToProps = (state) => {
  return {
    ...state.indicatorList,
    tipOptions: state.tip.tipOptions
  }
}

const dispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(indicatorActionCreators, dispatch), tipActions: bindActionCreators(tipActionCreators, dispatch) }
}

export default connect(stateToProps, dispatchToProps)(Page1);