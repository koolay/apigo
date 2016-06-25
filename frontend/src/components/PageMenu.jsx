import React, { PropTypes } from 'react'

import Panel from 'react-bootstrap-myui/lib/Panel';
import ListGroup from 'react-bootstrap-myui/lib/ListGroup';
import ListGroupItem from 'react-bootstrap-myui/lib/ListGroupItem';
import Glyphicon from 'react-bootstrap-myui/lib/Glyphicon';

import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import classnames from 'classnames';

import getBasePath from '../helpers/getBasePath'
import { DEV, apiDomain } from '../config'
import menuRoutes from '../menuRoutes'

class PageMenu extends React.Component {
	static propTypes = {
		/**
		 * [{name: string, url: string, icon: string, active: bool}]
		 */
		menus: PropTypes.array,
		/**
		 * router中的location，用来判断页面路由是否已发生了变化
		 */
		location: PropTypes.object
	};

	shouldComponentUpdate(nextProps, nextState) {
		const { menus, location } = this.props
		return menus !== nextProps.menus || location.pathname !== nextProps.location.pathname
	}

	validMenuRoutes(menupath, nextLocation) {
		const pathname = (nextLocation || this.props.location).pathname, 
			basePath = getBasePath(), 
			// 这里把menupath做转换，去掉basePath以及查询参数部分，以便和menuRoutes中的key匹配
			routeReg = menuRoutes[ menupath.replace(basePath, '').replace(/\?.*/, '') ];

		return routeReg && new RegExp(routeReg).test( pathname.replace(basePath, '') )
	}

	render() {
		const menus = this.props.menus, domain = DEV ? apiDomain : (location.protocol  + '//' + location.host)
		
		return menus && menus.length > 0 ? (
				<div>
					{menus.map((menu, menuIndex) => 
						<Panel key={'panel' + menuIndex} header={(<div><span className={classnames('menu-icon', {[menu.icon]: !!menu.icon})}/><span>{menu.name}</span></div>)}>
							<ListGroup fill key={'list' + menuIndex}>
							{menu.children.map((child, childIndex) => {

								let url = child.url || '';

								//判断是否为外部链接
								if (url.indexOf(domain) === -1) {
									return <ListGroupItem key={'list-item' + childIndex} href={url}>{child.name}</ListGroupItem>
								} else {
									url = url.replace(domain, '').trim()
									
									//如果url为空字符串，这里换成basePath，即前端站点的首页路径，以避免从 “/” 路径中再跳转过来
									if (!url) {
										url = getBasePath()
									}

									let activeClasses = child.active || this.validMenuRoutes(url) ? 'active' : null;

									return <LinkContainer to={url} key={'link-container' + childIndex}><ListGroupItem key={'list-item' + childIndex} className={activeClasses}>{child.name}</ListGroupItem></LinkContainer>
								}

							})}
							</ListGroup>
						</Panel>
					)}
				</div>
			) : null
	}
}

export default PageMenu