import React from 'react';
import {
	Row,
	Col,
	BackTop
} from 'antd';
import PcHeader from './pcHeader'
import PcFooter from './pcFooter'
import PcNewsImagesBlock from './pcNewsImagesBlock'
import Common from '../common'
export default class PcNewsDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			newsItem: ''
		}
	}
	componentWillMount() {
		var myFetchOptions = {
			method: 'GET'
		}
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({
				newsItem: json
			});
			document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
		})
	}

	createMarkup() {
		return {
			__html: this.state.newsItem.pagecontent
		}
	}
	render() {
		return (
			<div className="pcPage">
				<PcHeader />
				<Row>
					<Col span={2}></Col>
					<Col span={14} className="container">
						<div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
						<Common uniquekey={this.props.params.uniquekey} />
					</Col>
					<Col span={6}>
						<div className="rightPic">
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