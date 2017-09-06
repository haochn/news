import React from 'react';
import {
	Row,
	Col,
	BackTop,
	Breadcrumb,
	Icon
} from 'antd';
import PcHeader from './pcHeader'
import PcFooter from './pcFooter'
import PcNewsBlock from './pcNewsBlock';
import PcNewsImagesBlock from './pcNewsImagesBlock'
var content = '',
	banner = '';
export default class PcNewsList extends React.Component {
	constructor() {
		super();
		this.state = {
			newsItem: ''
		}
	}
	componentWillMount() {
		if (this.props.params.tag === 'top') {
			content = 'top';
			banner = '头条'
		}
		if (this.props.params.tag === 'shehui') {
			content = 'shehui';
			banner = '社会'
		}
		if (this.props.params.tag === 'guonei') {
			content = 'guonei';
			banner = '国内'
		}
		if (this.props.params.tag === 'guoji') {
			content = 'guoji';
			banner = '国际'
		}
		if (this.props.params.tag === 'yule') {
			content = 'yule';
			banner = '娱乐'
		}
		if (this.props.params.tag === 'junshi') {
			content = 'junshi';
			banner = '军事'
		}
		if (this.props.params.tag === 'keji') {
			content = 'keji';
			banner = '科技'
		}
		if (this.props.params.tag === 'caijing') {
			content = 'caijing';
			banner = '财经'
		}

	}
	render() {
		return (
			<div className="pcPage">
				<PcHeader select={content}/>
				<Row>
					<Col span={2}></Col>

					<Col span={14}>
					<div className="listBanner">
					  <Breadcrumb>
					    <Breadcrumb.Item><Icon type="home" style={{ fontSize: 16, color: '#08c' }} />首页</Breadcrumb.Item>
					    <Breadcrumb.Item><Icon type="tag" style={{ fontSize: 16, color: '#08c' }} /><a href="">{banner}</a></Breadcrumb.Item>
					  </Breadcrumb>
					 </div>
					 <div className="listItem">
					<PcNewsBlock hasImg={true} count={12} type={content} width="100%" bordered="false" />
					 </div>
					</Col>
					<Col span={6}>
						<div className="ListPic">
							<h3>热点推荐</h3>
							<PcNewsImagesBlock count={16} type="top" carTitle="" imgWidth="130px" bordered="false" />
						</div>
					</Col>
					<Col span={2}></Col>
				</Row>
				<PcFooter />
				<BackTop />
			</div>
		)
	}
}