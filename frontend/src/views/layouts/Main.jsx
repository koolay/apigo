import React from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

// import {actions as mainActions} from '../../redux/modules/main';

// import TipMixin from '../../helpers/tipMixin';
import getBasePath from '../../helpers/getBasePath';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';

import '../../static/css/bootstrap/less/bootstrap.less';
import '../../static/css/main.less';


const Main = React.createClass({
	// mixins: [TipMixin],

	render() {
		return (
			<div role="page">
				<header>
					<Navbar staticTop className="main-header">
				    <Navbar.Header>
				      <Navbar.Brand>
				        <a href="/" style={{paddingTop:'14px'}}><img src={require('../../static/images/logo.png')} width="40" height="40" style={{marginRight:'10px',display:'inline-block'}}/>APICloud</a>
				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>

				    <Navbar.Collapse>
					    <Nav pullRight className="nav-right">
					    	<LinkContainer to={`${getBasePath()}/bin/list`}><NavItem className="exit">接口列表</NavItem></LinkContainer>
					    	<LinkContainer to={`${getBasePath()}/bin/define`}><NavItem className="exit">创建接口</NavItem></LinkContainer>
					    	<NavItem className="exit" href="https://github.com/koolay/apigo" target="_brank">Github</NavItem>
				      </Nav>
				    </Navbar.Collapse>
					</Navbar>
				</header>
				
				<div className="main-container">
					{this.props.children}
				</div>

				<footer className="hidden-xs">
					<Navbar fixedBottom={true} className="main-footer">
						Copyright  2016 明源云 版权所有 鄂ICP备15011531号-1
					</Navbar>
				</footer>
			</div>
		)
	}

})

// const stateToProps = (state) => {
//   return {
//   	...state.main,
//   	tipOptions: state.tip.tipOptions
//   }
// }

// const dispatchToProps = (dispatch) => {
//   return { actions: bindActionCreators(mainActions, dispatch) }
// }

// export default connect(stateToProps, dispatchToProps)(Main);
export default Main

