import React from 'react';
import PageFooter from 'react-bootstrap-myui/lib/PageFooter';
import Loading from 'react-bootstrap-myui/lib/Loading';

import PageHeader from '../../components/PageHeader'
import PageMenu from '../../components/PageMenu'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {actions as mainActions} from '../../redux/modules/main';
import {actions as tipActions} from '../../redux/modules/tip';

import TipMixin from '../../helpers/tipMixin';
import Token from '../../helpers/token';

import 'react-bootstrap-myui/dist/css/react-bootstrap-myui.min.css';
import '../../static/css/main.less';


const Main = React.createClass({
	mixins: [TipMixin],

	componentDidMount() {
		this.props.actions.fetchLoginInfo().then(() => this.fitPageFooter())

		window.onresize = () => this.fitPageFooter(); 
	},

	componentDidUpdate(){
		this.fitPageFooter()
	},

	// componentWillUnmount(){
 //    this.fitPageFooter();
 //  },

	render(){
		const { loginInfo, navs, menus, location, pending, children } = this.props

		return navs && navs.length > 0 ? (
			<div role="page">
				<PageHeader navs={navs} loginInfo={loginInfo} location={location} onChange={this.handleChangeNavPath}/>
				
				<div className="container page-container" id="pageContainer">
					<div className="page-side">
						<div id="pageMenus">
							<PageMenu menus={menus} location={location}/>
						</div>
			    </div>

			    <div className="page-main" id="pageMain">
			    	{/** 在切换nav项时，会重新加载数据，这时会出现loading层，这里把children隐藏，避免它和子页面中的loading重叠 **/}
			      {pending ? null : children}
			    </div>

			    <Loading show={pending} containerId="pageContainer" />
				</div>

				<PageFooter id="pagefooter">
				  Copyright  2016 明源云 版权所有 鄂ICP备15011531号-1
				</PageFooter>
			</div>
		) : null
	},

	handleChangeNavPath(appCode) {
		Token.setAppCode( appCode )
		this.props.actions.fetchLoginInfo( appCode )
	},

	fitPageFooter(){
    const pagefooter = document.getElementById('pagefooter'),
      pageContainer = document.getElementById('pageContainer'),
      pageMenus = document.getElementById('pageMenus');

    if(pagefooter && pageContainer){
      const winHeight = window.innerHeight,
        pageContainerHeight = pageContainer.clientHeight,
        pagefooterHeight = pagefooter.clientHeight,
        visibleHeight = winHeight  - ( pageContainer.offsetTop + 70 + pagefooterHeight )

        // 可见高度大于初始内容高度..避免出现内容过多，截取了菜单项
        if((visibleHeight - 8) > pageMenus.clientHeight){
        	pageMenus.style.height =  (visibleHeight - 8) + 'px' ;
        }
    }
  }

})

const stateToProps = (state) => {
  return {
  	...state.main,
  	tipOptions: state.tip.tipOptions
  }
}

const dispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(mainActions, dispatch), tipActions: bindActionCreators(tipActions, dispatch) }
}

export default connect(stateToProps, dispatchToProps)(Main);
