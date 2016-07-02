import React from 'react';
import ReactDOM from 'react-dom';

import Grid from 'react-bootstrap/lib/Grid';
import Panel from 'react-bootstrap/lib/Panel';
import PageHeader from 'react-bootstrap/lib/PageHeader';

const Question = React.createClass({
	render() {
		return (
			<Grid>
				<PageHeader className="question-header">API自动化平台解决的痛点</PageHeader>

				<Panel className="question-panel" header="低效的前后端接口联调">
      		<p>1、并行开发时如果前后端没有约定好接口字段，前端自己模拟数据，容易与后台接口不一致，联调时浪费时间修改。</p>
					<p>2、如果接口提供延迟，前端需要等待联调，延长开发周期。</p>
					<p>3、如果接口请求或响应数据交代不具体，前端经常不断的询问后台人员，或者自己查看代码或数据库字段，消耗开发时间。</p>
    		</Panel>

    		<Panel className="question-panel"  header="API文档的不规范或缺失">
      		<p>1、缺少API文档增加前后端联调沟通成本。</p>
		    	<p>2、花时间专门编写API文档，很多程序员实在力不从心。</p>
		    	<p>3、API文档形式团队不统一、不规范</p>
    		</Panel>

    		<Panel className="question-panel"  header="接口开发测试的繁琐">
      		<p>1、程序员使用第三方接口测试工具，需要自己组织请求参数，比较繁琐。</p>
				  <p>2、组织的接口列表，团队之间不能很好的共享。</p>
    		</Panel>

    		<Panel className="question-panel"  header="复杂的自动化测试">
      		<p>1、接口自动化测试要编写自动化脚本，接口有变动还要做相应修改。</p>
    		</Panel>
			</Grid>
		)
	}
})

export default Question;
