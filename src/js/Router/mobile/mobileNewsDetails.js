import React from 'react';
import {
	Row,
	Col
} from 'antd';
import MobileHeader from './mobileHeader'
import MobileFooter from './mobileFooter'
export default class MobileNewsDetails extends React.Component {
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
			<div>
				<MobileHeader />
				<Row>					
					<Col span={24} className="container">
						<div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
					</Col>					
					
				</Row>
				
				<MobileFooter />
			</div>
		)
	}
}