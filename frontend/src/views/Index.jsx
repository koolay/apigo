import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import getBasePath from '../helpers/getBasePath';

import './index.less';

const Index = React.createClass({

	render() {
		return (
			<div data-page="index">
				<div className="showcase">
					<Grid>
						<h1>API自动化平台</h1>
						<h2 style={{fontSize:'36px',color:'#fff'}}>高效的敏捷团队协同开发利器</h2>
						<p>通过APICloud自动化平台，团队可以快捷的定义接口和测试用例，生成标准的API文档。强大的动态模拟数据接口定义，让前后端协同开发变得高效。同时还提供了便捷的在线接口测试、自动化测试等高级功能。</p>
					</Grid>
					<Grid className="btn-wrapper">
						<LinkContainer to={`${getBasePath()}/bin/list`}><Button componentClass="a" bsSize="large" style={{width: '300px'}}>开始使用</Button></LinkContainer>
					</Grid>
				</div>

				<Grid className="section" style={{paddingTop:'50px'}}>
					<Row>
						<Col sm={3} className="card">
							<Col sm={12}>
								<span className="card-icon">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><title>home-lifecycle-05</title><rect x="9.304" y="27" width="2" height="16"></rect><rect x="23.304" y="30" width="2" height="13"></rect><rect x="37.304" y="21" width="2" height="22"></rect><g><path d="M23.83,23.88l-12.4-6.675L4.955,22.759a1,1,0,1,1-1.3-1.519l7-6,1.125-.121L24.18,21.8,40.911,7.707A1,1,0,0,1,42.2,9.237L24.948,23.765Z"></path><polygon points="40.692 13.632 41.103 8.853 36.324 8.445 38.527 6.59 43.304 7 42.895 11.778 40.692 13.632"></polygon></g></svg>
								</span>
							</Col>
							<Col sm={12}>
								<h4 className="card-title">接口模拟数据</h4>
								<p className="card-text">解决前后端协同开发时低效的接口联调问题，前端根据逻辑可定义不同的模拟响应数据。</p>
							</Col>
						</Col>
						<Col sm={3} className="card">		
							<Col sm={12}>
								<span className="card-icon">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><title>home-lifecycle-01</title><path d="M22,23.009H7l-1-1v-15l1-1H22l1,1v15Zm-14-2H21v-13H8v13Z"></path><path d="M22,42.009H7l-1-1v-15l1-1H22l1,1v15Zm-14-2H21v-13H8v13Z"></path><path d="M41.052,42h-15l-1-1V7l1-1h15l1,1V41Zm-14-2h13V8h-13V40Z"></path></svg>
								</span>
							</Col>
							<Col sm={12}>
								<h4 className="card-title">标准API文档</h4>
								<p className="card-text">让你从繁琐的API文档编写中解脱，实现团队的文档规范化，降低开发之间的沟通成本，提高开发效率。</p>
							</Col>
						</Col>
						<Col sm={3} className="card">
							<Col sm={12}>
								<span className="card-icon">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><title>home-lifecycle-02</title><path d="M24.5,29A12.5,12.5,0,1,1,37,16.5,12.514,12.514,0,0,1,24.5,29Zm0-23A10.5,10.5,0,1,0,35,16.5,10.512,10.512,0,0,0,24.5,6Z"></path><path d="M15.5,44A12.5,12.5,0,1,1,28,31.5,12.514,12.514,0,0,1,15.5,44Zm0-23A10.5,10.5,0,1,0,26,31.5,10.512,10.512,0,0,0,15.5,21Z"></path><path d="M32.5,44A12.5,12.5,0,1,1,45,31.5,12.514,12.514,0,0,1,32.5,44Zm0-23A10.5,10.5,0,1,0,43,31.5,10.511,10.511,0,0,0,32.5,21Z"></path></svg>
								</span>
							</Col>
							<Col sm={12}>
								<h4 className="card-title">接口开发测试</h4>
								<p className="card-text">每个接口有专属的测试面板，从此不用一个一个的敲入输入参数、请求Header，让你更快的测试接口。</p>
							</Col>
						</Col>
						<Col sm={3} className="card">
							<Col sm={12}>
								<span className="card-icon">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><title>home-lifecycle-03</title><path d="M24,31A14,14,0,1,1,38,17,14.016,14.016,0,0,1,24,31ZM24,5A12,12,0,1,0,36,17,12.014,12.014,0,0,0,24,5Z"></path><path d="M31,36H17V27.371l1.426,0.67a11.234,11.234,0,0,0,5.327,1.06l0.046,0,0.046,0a11.156,11.156,0,0,0,5.694-1.262L31,27.077V36ZM19,34H29V30.265a13.147,13.147,0,0,1-5.2.836,13.165,13.165,0,0,1-4.8-.678V34Z"></path><rect x="17" y="37" width="14" height="2"></rect><rect x="18" y="40" width="12" height="2"></rect><rect x="19" y="43" width="10" height="2"></rect></svg>
								</span>
							</Col>
							<Col sm={12}>
								<h4 className="card-title">接口自动化测试</h4>
								<p className="card-text">简单高效的接口自动化测试，减少自动化脚本编写的苦恼，大大提高测试效率。</p>
							</Col>
						</Col>
					</Row>
				</Grid>
			</div>
		)
	}

})

export default Index;
