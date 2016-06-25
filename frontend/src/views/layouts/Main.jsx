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
				        <a href="/">APICloud</a>
				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				    
				    <Navbar.Collapse>
					    <Nav pullRight className="nav-right">
					    	<LinkContainer to={`${getBasePath()}/bin/create`}><NavItem className="exit">CREATE BIN</NavItem></LinkContainer>
					    	<NavItem className="exit" href="https://github.com/koolay/apigo" target="_brank">GITHUB</NavItem>
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

