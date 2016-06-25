import React, { PropTypes } from 'react'

import Navbar from 'react-bootstrap-myui/lib/Navbar';
import Nav from 'react-bootstrap-myui/lib/Nav';
import NavItem from 'react-bootstrap-myui/lib/NavItem';

import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import getBasePath from '../helpers/getBasePath'
import { DEV, apiDomain } from '../config'

class PageHeader extends React.Component {
	static propTypes = {
		/**
		 * [{code: string, name: string, url: string, active: bool}]
		 */
		navs: PropTypes.array,
		/**
		 * 登录用户信息
		 */
		loginInfo: PropTypes.object,
		/**
		 * router中的location，用来判断页面路由是否已发生了变化
		 */
		location: PropTypes.object,
		/**
		 * 在切换nav项时的回调事件，用于加载新的菜单数据
		 */
		onChange: PropTypes.func
	};

	shouldComponentUpdate(nextProps, nextState) {
		const { navs, loginInfo, location } = this.props
		return navs !== nextProps.navs || loginInfo !== nextProps.loginInfo || location.pathname !== nextProps.location.pathname
	}

	render() {
		const { loginInfo } = this.props

		return (
				<Navbar staticTop
			    componentClass="header"
			    className="page-top"
			    role="banner">

			    <Navbar.Header>
			      <Navbar.Brand>
			        <a href={getBasePath()}><img src={require('../static/images/logo.png')} /></a>
			      </Navbar.Brand>
			    </Navbar.Header>

			    {this.renderNavs()}

			    <Nav pullRight className="app-navright">
			    	<li className="user-info">
			    		<p><span className="tenant-name">{loginInfo.tenantName}</span><span className="company-name">{loginInfo.companyName}</span></p>
			    		<p><a className="user-name" href="javascript:;">{loginInfo.displayName}</a></p>
			    	</li>
		        <NavItem className="exit" href="/auth/logout" >退出</NavItem>
		      </Nav>
				</Navbar>
			)
	}

	renderNavs() {
		const navs = this.props.navs, domain = DEV ? apiDomain : (location.protocol  + '//' + location.host)
		
		return navs && navs.length > 0 ? (
				<Nav role="navigation">
					{navs.map((nav, index) => {

						let navName = nav.name, navUrl = nav.url, navClasses = nav.active ? 'active' : null
						
						if (navUrl.indexOf(domain) === -1) {
							return <NavItem key={'nav-item' + index} href={navUrl} className={navClasses}>{navName}</NavItem>
						} else {
							navUrl = navUrl.replace(domain, '').trim()
							
							//如果url为空字符串，这里换成basePath，即前端站点的首页路径，以避免从 “/” 路径中再跳转过来
							if (!navUrl) {
								navUrl = getBasePath()
							}

							return <LinkContainer key={'link-container' + index} to={navUrl} onClick={this.onChange.bind(this, nav.code)}><NavItem key={'nav-item' + index} className={navClasses}>{navName}</NavItem></LinkContainer>
						}

					})}
				</Nav>
			) : null
	}

	onChange(appCode) {
		this.props.onChange && this.props.onChange( appCode ) 
	}
}

export default PageHeader
