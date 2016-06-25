import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap-myui/lib/Navbar';
import Breadcrumb from 'react-bootstrap-myui/lib/Breadcrumb';
import DataTable from 'react-bootstrap-myui/lib/DataTable';
import Nav from 'react-bootstrap-myui/lib/Nav';
import NavItem from 'react-bootstrap-myui/lib/NavItem';
import Button from 'react-bootstrap-myui/lib/Button';
import Glyphicon from 'react-bootstrap-myui/lib/Glyphicon';
import Loading from 'react-bootstrap-myui/lib/Loading';
import OverlayTrigger from 'react-bootstrap-myui/lib/OverlayTrigger';
import Popover from 'react-bootstrap-myui/lib/Popover';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TipMixin from '../../../helpers/tipMixin';
import ConfirmMixin from '../../../helpers/confirmMixin';
import getBasePath from '../../../helpers/getBasePath';

import { DEFAULT_PAGINATION_OPTIONS } from '../../../constants/paginationOptions';

import { actions as populationActionCreators } from '../../../redux/modules/examples/tag/list';
import { actions as tipActionCreators } from '../../../redux/modules/tip';

import './list.less';

const PopulationTagList = React.createClass({
  mixins: [TipMixin, ConfirmMixin],
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount(){
    const { actions, list, location } = this.props
    // 仅当list=false || location.state.refresh=true时刷新列表数据
    if (!list || list.length <= 0 || (location.state && location.state.refresh === true)) {
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
      text: '标签名称'
    }, {
      name: 'indicator_name',
      text: '标签类别'
    }, {
      name: 'type',
      text: '类型'
    }, {
      name: 'total_record',
      text: '人数'
    }, {
      name: 'status',
      text: () => {
        return (
          <div>
            <span>状态</span>
            <OverlayTrigger trigger="hover" placement="left" overlay={ (<Popover className="cell-status-tips">新增／修改操作后需要等待15分钟左右生效。“已生效”状态为可用状态。</Popover>) }>
              <Glyphicon glyph="info-sign"/>
            </OverlayTrigger>
          </div>
        )}
    }, {
      text: '操作'
    }];
  
    const rowTemplate = (
      <tr>
        <td>%id%</td>
        <td>%name%</td>
        <td className="cell-indicator-name">%indicator_name%</td>
        <td className="cell-type">%type%</td>
        <td className="cell-total_record">%total_record%</td>
        <td className="cell-status" childrenNode={rowData => this.renderStatusColumn(rowData)}></td>
        <td className="cell-operation" childrenNode={(rowData) => this.renderCustomColumn(rowData)}></td>
      </tr>
    );

    let emptyText = (
      <p>没有自定义客户标签，<a href="javascript:;" onClick={this.hanldeAdd}>马上添加</a></p>
    );

    if (pending && (!list || list.length <= 0)) {
      emptyText = (<p>数据加载中...</p>)
    }

    const pagination = {
      ...DEFAULT_PAGINATION_OPTIONS,
      activePage: currentPage, 
      total: total, 
      onChangePage: this.handleChangePage
    };

    return (
      <div className="population-tag-list">
        <Navbar className="page-title">
          <Navbar.Header>
            <Navbar.Brand>客户标签管理</Navbar.Brand>
          </Navbar.Header>
        </Navbar>

        <div className="data-view padding">
          <Navbar className="data-table-toolbar">
            <Nav pullRight>
              <NavItem><Button bsStyle="primary" onClick={this.hanldeAdd}>新增</Button></NavItem>
            </Nav>
          </Navbar>
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
  },

  renderStatusColumn(rowData) {
    let statusText, classes
    
    switch(rowData.status) {
      case '1':
        statusText = '已生效';
        classes = 'txt-valid';
        break; 
      case '0':
        statusText = '生效中';
        classes = 'txt-invalid';
        break;
    }

    return (
      <span className={classes}>{statusText}</span>
    )
  },

  renderCustomColumn(rowData) {
    return (
      <span>
        <a className="link-button" href="javascript:;" onClick={this.handleEdit.bind(this, rowData)}><Glyphicon glyph="pencil" /></a>
        <a className="link-button" href="javascript:;" onClick={this.handleDelete.bind(this, rowData)}><Glyphicon glyph="trash" /></a>
      </span>
    )
  },

  hanldeAdd() {
    const { router } = this.context, basePath = getBasePath()
    router.push(`${basePath}/examples/tag/add`)
  },

  handleEdit(rowData) {
    const { router } = this.context, basePath = getBasePath()
    router.push(`${basePath}/examples/tag/edit/${rowData.id}`)
  },

  handleDelete(rowData) {
    const { actions } = this.props

    this.showConfirm({
      title: '提示',
      info: '确定删除吗？',
      content: '您确定要删除该数据吗？删除后将无法恢复。',
      ok: () => {
        let params = {id: rowData.id, ind_id: rowData.indicator_id, indv_id: rowData.indicator_value_id}
        actions.deleteItem(params)
          .then(() => {
            // 成功删除数据后，刷新列表数据
            if (this.props.deleted === true) {
              actions.fetchList(1)
            }
          })
      }
    })
  }
})


const stateToProps = (state) => {
  return {
    ...state.tagList,
    tipOptions: state.tip.tipOptions
  }
}

const dispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(populationActionCreators, dispatch), tipActions: bindActionCreators(tipActionCreators, dispatch) }
}

export default connect(stateToProps, dispatchToProps)(PopulationTagList);