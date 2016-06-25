import React from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {actions as mainActions} from '../../redux/modules/main';

import TipMixin from '../../helpers/tipMixin';

import '../../static/css/bootstrap/less/bootstrap.less';
import '../../static/css/main.less';


const Main = React.createClass({
	mixins: [TipMixin],

	render() {
		return (
			<div role="page">
				<Navbar staticTop componentClass="header" className="main-header">

			    <Navbar.Header>
			      <Navbar.Brand>
			        <a href="">APICloud</a>
			      </Navbar.Brand>
			    </Navbar.Header>

			    <Nav pullRight className="nav-right">
			    	<NavItem className="exit" href="/bin/create">CREATE BIN</NavItem>
			    	<NavItem className="exit" href="https://github.com/koolay/apigo" target="_brank">GITHUB</NavItem>
		      </Nav>
				</Navbar>
				
				<div className="main-container">
					{this.props.children}
				</div>

				<Navbar componentClass="footer" fixedBottom={true} className="main-footer">
					Copyright  2016 明源云 版权所有 鄂ICP备15011531号-1
				</Navbar>
			</div>
		)
	}

})

const stateToProps = (state) => {
  return {
  	...state.main,
  	tipOptions: state.tip.tipOptions
  }
}

const dispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(mainActions, dispatch) }
}

export default connect(stateToProps, dispatchToProps)(Main);
