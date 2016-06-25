import React, { PropTypes } from 'react';

import Col from 'react-bootstrap-myui/lib/Col';
import Pager from 'react-bootstrap-myui/lib/Pager';
import PageItem from 'react-bootstrap-myui/lib/PageItem';
import Panel from 'react-bootstrap-myui/lib/Panel';
import Loading from 'react-bootstrap-myui/lib/Loading';

import './customer-detail-section.less';

class CustomerDetailSection extends React.Component {
	static propTypes = {
		/**
		 * 栏目的基本信息
		 */
		info: PropTypes.object.isRequired,
		/**
		 * 栏目内容数据
		 */
		data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
		/**
		 * 数据加载状态
		 */
		pending: PropTypes.bool,
		/**
		 * 组件挂载完成后的回调事件
		 */
		onDidMount: PropTypes.func,
		/**
		 * 栏目的分页按钮回调事件
		 */
		onChangePage: PropTypes.func
	};

	static defaultProps = {
		pending: true
	};

	componentDidMount() {
		const { onDidMount } = this.props

		onDidMount && onDidMount()
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { info, data, pending } = this.props
		return info !== nextProps.info || data !== nextProps.data || pending !== nextProps.pending
	}

	render() {
		const { info, data, pending, ...otherProps } = this.props

		return (
			<Panel {...otherProps} header={info.name} className='customer-detail-section'>
				<div id={info.id} className='section-body'>
					{this.renderBody()}
				</div>
				<Loading show={pending} backdrop={false} containerId={info.id} />
			</Panel>
		)
	}

	renderBody() {
		const { info, data, pending } = this.props

		if (!info || !data) {
			return null
		}

		switch (info.type) {
      case 'time_zone':
        return this.renderTimeLine(data)
      case 'base':
      	// 这里组装data数据，以保持和type='table'时的data格式一致，因为它们都使用相同的render方法
        let __data = {
        	total: 0,
        	data
        };
        return this.renderOtherPanel(__data)
      case 'table':
      	return this.renderOtherPanel(data)
      default:
      	return null
    }

	}

	/**
	 * info.type='time_zone'的body
	 */
	renderTimeLine(item) {
		
    const removeLastSymbol = (str) => {
	    if(typeof str === "string" && str.length > 0){
	      let arr = str.split("")
	      const lastSymbol = arr[ str.length - 1 ]

	      if(lastSymbol === ","){
	        arr = arr.slice(0, str.length - 1)
	      }

	      str = arr.join("");
	    }
	    
	    return str
	  };

	  const rendercontent = (data) => {
      let contents = []
      if(data.content && data.content.length > 0){
        data.content.forEach((content,contentIndex) => 
          contents.push(
            <div className="row" key={contentIndex}>
              <div className="tail"></div>
              <div className="head"></div>
              <div className="content">{removeLastSymbol(content)}</div>
            </div>
          )
        )
      } 
      return contents
    };

    const renderItem = (itemdata) => {
      let items = []
      if(itemdata && itemdata.length > 0){
        itemdata.forEach((data,dataindex) => {

          items.push(
            <li className="item" key={dataindex}>
              <div className="time">{data.date}</div>
              <div className="rows">
                {rendercontent(data)}
              </div>
            </li>
          )
        })
      }
      return items
    };

    let tab = [];

    if (item && item.length > 0) {
      tab.push(
        <ul className="timeline" key={0}>
          {renderItem(item)}
        </ul>
      )
    }

    return tab.length > 0 ? tab : <p className="no-data-msg">未找到相关信息！</p>
  }

  /**
   * info.type!='time_zone'时的body
   */
  renderOtherPanel(item){
    
    const renderCol = (data) => {
      let arr = []
      if(data){
        data.forEach((col,colIndex) => {
          arr.push(
            <Col xs={4} key={colIndex}>  
              <span className="name" title={col.key}>{col.key}</span>
              <span className="value" title={col.value}>{col.value}</span>
            </Col> 
          )
        })
      }
      return arr
    };

    let tab = [];

    if(item.data && item.data.length > 0){
      // item.total = Number(item.data.total)

      let isDisabled = function(page){
        const minPage = 1
        const maxPage = Math.ceil(item.total / 5 )

        return !(page >= minPage && page <= maxPage)
      }

      item.data.forEach((data,dataIndex) => {
        tab.push(
          <div className="content-block" key={dataIndex}>
            {dataIndex > 0 ? <hr/> : null}
            <div className="detail-cols">
              {renderCol(data)}
            </div>
            {(dataIndex + 1) % 5 == 0 ? <Pager><PageItem previous disabled={isDisabled(item.page - 1)} href="javascript:;" eventKey={item.page - 1} onSelect={this.handSelect.bind(this, item.page - 1)}>&larr; 上一页</PageItem><PageItem next eventKey={item.page + 1} disabled={isDisabled(item.page + 1)} href="javascript:;" onSelect={this.handSelect.bind(this, item.page + 1)}>下一页 &rarr;</PageItem></Pager> : null}
          </div>
        )
      })
    }

    return tab.length > 0 ? tab : <p className="no-data-msg">无数据！</p>
  }

  handSelect(page){
    const { onChangePage } = this.props
    onChangePage && onChangePage( page )
  }

}

export default CustomerDetailSection