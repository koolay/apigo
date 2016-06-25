import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from 'react-bootstrap-myui/lib/Navbar';
import DataTable from 'react-bootstrap-myui/lib/DataTable';
import Button from 'react-bootstrap-myui/lib/Button';
import Glyphicon from 'react-bootstrap-myui/lib/Glyphicon';
import Input from 'react-bootstrap-myui/lib/Input';
import ButtonInput from 'react-bootstrap-myui/lib/ButtonInput';
import Grid from 'react-bootstrap-myui/lib/Grid';
import Row from 'react-bootstrap-myui/lib/Row';
import Col from 'react-bootstrap-myui/lib/Col';
import Loading from 'react-bootstrap-myui/lib/Loading';

import { Form, ValidatedInput } from '../../../components/bootstrap-validation'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TipMixin from '../../../helpers/tipMixin';
import getBasePath from '../../../helpers/getBasePath';

import { DEFAULT_PAGINATION_OPTIONS } from '../../../constants/paginationOptions';

import { actions as imageCustomerActionCreators } from '../../../redux/modules/examples/360image/list';
import { actions as tipActionCreators } from '../../../redux/modules/tip';

import './list.less';

const Page2 = React.createClass({
  mixins: [TipMixin],
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render(){
    let searchParams = this.props.searchParams || {}

    return (
      <div className="data-image-customer">
        <Navbar className="page-title">
          <Navbar.Header>
            <Navbar.Brand>客户360画像</Navbar.Brand>
          </Navbar.Header>
        </Navbar>

        <Form className="form-search form-horizontal padding" onValidSubmit={this.handleValidSubmit}>
          <Grid>
            <Row>
              <Col md={5}>
                <Input 
                  ref="inputName" 
                  type="text" 
                  name="input-name" 
                  label="姓名：" 
                  labelClassName="col-md-3" 
                  wrapperClassName="col-md-9" 
                  defaultValue={searchParams["name"] || ''} />
              </Col>
              <Col md={5}>
                <Input 
                  ref="inputMobile" 
                  type="text" 
                  name="input-mobile" 
                  label="手机：" 
                  labelClassName="col-md-3" 
                  wrapperClassName="col-md-9" 
                  defaultValue={searchParams["mobile"] || ''} />
              </Col>
              <Col md={2} className="button-wapper"><ButtonInput type='submit' bsStyle='primary' value='查询'/></Col>
            </Row>
          </Grid>
        </Form>

        {this.renderDataTable()}

      </div>   
    )
  },

  renderDataTable() {
    const { list, total, currentPage, pending } = this.props;
    
    const dataFields = [{
      idField: true,
      name: 'id'
    }, {
      name: 'cst_name',
      text: '姓名'
    }, {
      name: 'gender',
      text: '性别'
    }, {
      name: 'ages',
      text: '年龄'
    }, {
      name: 'mobile_tel',
      text: '联系电话'
    }, {
      text: '操作'
    }];
  
    const rowTemplate = (
      <tr>
        <td>%id%</td>
        <td>%cst_name%</td>
        <td>%gender%</td>
        <td>%ages%</td>
        <td>%mobile_tel%</td>
        <td className="cell-operation" childrenNode={(rowData) => this.renderCustomColumn(rowData)}></td>
      </tr>
    );

    const pagination = {
      ...DEFAULT_PAGINATION_OPTIONS,
      activePage: currentPage, 
      total: total, 
      onChangePage: this.handleChangePage
    };

    return (
      <div className='data-view padding'>
        <DataTable
          tableWrapperId='datatable-wrapper' 
          hover 
          serialNumber 
          bordered={false} 
          dataFields={dataFields} 
          data={list || []} 
          rowTemplate={rowTemplate} 
          pagination={pagination}/>
        <Loading show={pending} containerId='datatable-wrapper' />
      </div>
    )
  },
  
  handleChangePage(event, selectEvent) {
    this.props.actions.searchDatas( this.getSearchParams(selectEvent.eventKey) )
  },

  renderCustomColumn(rowData) {
    return (
      <span>
        <a className="link-button" href="javascript:;" onClick={this.handleViewDetail.bind(this, rowData)}><Glyphicon glyph="search" /></a>
      </span>
    )
  },

  handleViewDetail(rowData) {
    const basePath = getBasePath()
    this.context.router.push(`${basePath}/examples/360image/detail/${rowData.id}`)
  },

  handleValidSubmit() {
    // 点击查询时，默认回到第1页
    this.props.actions.searchDatas( this.getSearchParams(1) )
  },

  getSearchParams(pageNumber) {
    return {
      name: this.refs.inputName.getValue(),
      mobile: this.refs.inputMobile.getValue(),
      page: pageNumber
    }
  }

})


const stateToProps = (state) => {
  return {
    ...state.imageList,
    tipOptions: state.tip.tipOptions
  }
}

const dispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(imageCustomerActionCreators, dispatch), tipActions: bindActionCreators(tipActionCreators, dispatch) }
}

export default connect(stateToProps, dispatchToProps)(Page2);