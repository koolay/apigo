import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap-myui/lib/Navbar';
import Breadcrumb from 'react-bootstrap-myui/lib/Breadcrumb';

import Col from 'react-bootstrap-myui/lib/Col';
import Pager from 'react-bootstrap-myui/lib/Pager';
import PageItem from 'react-bootstrap-myui/lib/PageItem';
import Panel from 'react-bootstrap-myui/lib/Panel';
import Loading from 'react-bootstrap-myui/lib/Loading';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import CustomerDetailSection from '../../../components/CustomerDetailSection';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TipMixin from '../../../helpers/tipMixin';
import getBasePath from '../../../helpers/getBasePath';


import { actions as detailActionCreators } from '../../../redux/modules/examples/360image/detail';
import { actions as tipActionCreators } from '../../../redux/modules/tip';

import './detail.less';

const ImageDetail = React.createClass({
  mixins: [TipMixin],

  /**
   * 这里维护和redux state相同的数据，是因为在查询明细时，先显示空页面
   * 而没有使用clearDatas()来做，是因为sections这个数据不需重新加载
   */
  getInitialState() {
    return {
      /**
       * 基础信息（如人员名称，标签）
       */
      info: null,
      /**
       * 栏目信息(不包括它的内容明细)
       */
      sections: null,
      /**
       * 存储栏目内容的map，key为setion.id，方便后面取值
       */
      sectionDetailMaps: null,
      /**
       * 数据加载状态，key为section.id，存储各个栏目的pending值，方便后面取值
       */
      pending: {}
    }
  },

  componentDidMount() {
    const { sections, actions, params } = this.props

    // 拉取 tag 
    actions.fetchImageTags( params.dataImageId )

    // 栏目数据如果存在，不再更新
    sections || actions.fetchImageColumn()
  },

  componentWillReceiveProps(nextProps){
    const { info, sections, sectionDetailMaps, pending } = nextProps
    let state = {}

    if (info !== this.props.info) {
      state.info = info
    }

    // 因为sections不作二次更新，只要它存在，就更新到state去
    if (sections || sections !== this.props.sections) {
      state.sections = sections
    }

    if (sectionDetailMaps !== this.props.sectionDetailMaps) {
      state.sectionDetailMaps = sectionDetailMaps
    }

    if (pending !== this.props.pending) {
      state.pending = pending
    }

    this.setState( state )
  },

  render() {
    const basePath = getBasePath()
    const { location } = this.props
    const { info, sections, sectionDetailMaps, pending } = this.state

    return (
        <div className="data-image-detail">
          <Navbar className="page-title">
            <Navbar.Header>
              <Navbar.Brand>
                <Breadcrumb className="page-breadcrumb">
                  <LinkContainer to={`${basePath}/examples/360image/list`}><Breadcrumb.Item>客户360画像</Breadcrumb.Item></LinkContainer>
                  <Breadcrumb.Item active>客户详情</Breadcrumb.Item>
                </Breadcrumb>
              </Navbar.Brand>
            </Navbar.Header>
          </Navbar>

          
          {/** 主体内容，这里需info和sections同时显示 **/}
          {
            info && sections ? (
              <div className="padding">
                <div className="main-title">
                  <h2>{info.title}</h2>
                  <div className="tags">
                    {this.renderTags(info.tag)}
                  </div>
                </div>
                {
                /**
                 * 下面，我们使用了onDidMount的回调去获取栏目内容
                 * 这是因为在更新完section后，才去拉取栏目内容，不会阻塞栏目的渲染。
                 * 如果在componentWillReceiveProps执行这个逻辑，栏目UI可能正在更新中，而这时redux state有更新（如请求状态），
                 * 这样会导致栏目UI又被渲染，栏目的显示看起来像是被阻塞的。
                 */
                }
                {sections.map((section, index) => 
                  <CustomerDetailSection 
                    ref={`section${section.id}`} 
                    key={index} 
                    info={section} 
                    data={sectionDetailMaps ? sectionDetailMaps[section.id] : null} 
                    pending={pending[section.id]} 
                    onDidMount={this.handleFetchSectionDetail.bind(this, section)}
                    onChangePage={this.handleFetchSectionDetail.bind(this, section)} />
                )}
              </div>
            ) : null
          }
        </div> 
      )
  },

  renderTags(tags){
    let storage = []
    if(tags && tags.length > 0){
      tags.forEach((item,index) => {
        storage.push(<span className="tag" key={index}>{item.tag_text}</span>)  
      })
    }
    return storage
  },

  handleFetchSectionDetail(section, page) {
    const { actions, params } = this.props

    let data = {
      id: params.dataImageId,
      section_id: section.id
    }

    if (section.type === 'table') {
      data = Object.assign(data, {page: page || 1})
    }

    actions.fetchImageColumnDetail(data)
  }

})


const stateToProps = (state) => {
  return {
    ...state.imageDetail,
    tipOptions: state.tip.tipOptions
  }
}

const dispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(detailActionCreators, dispatch),  tipActions: bindActionCreators(tipActionCreators, dispatch) }
}

export default connect(stateToProps, dispatchToProps)(ImageDetail);

