import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Button from 'react-bootstrap/lib/Button';

import './index.less';

const Index = React.createClass({

	render() {
		return (
			<div>
				<div className="showcase">
					<Grid>
						<h1>APICloud</h1>
						<p>APICloud 允许你创建自定义的接口，用来测试、模拟和跟踪HTTP请求和响应的libraries, sockets and APIs. 同时生成接口文档，方便团队协同开发; 还可以在上面构建你的自动化测试，用来测试接口的完整性。</p>
					</Grid>
				</div>

				<Grid>
					<div className="btn-wrapper">
						<Button componentClass="a" bsStyle="primary" bsSize="large" style={{width: '300px'}}>Create Bin</Button>
					</div>
				</Grid>
			</div>
		)
	}

})

export default Index;
