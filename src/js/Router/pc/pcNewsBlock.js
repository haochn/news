import React from 'react';
import {
	Card
} from 'antd';
import {
	Link
} from 'react-router';
export default class PcNewsBlock extends React.Component {
	constructor() {
		super();
		this.state = {
			news: ''
		}
	}
	componentWillMount() {
		var myFetchOptions = {
			method: 'GET'
		}
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({
				news: json
			})
		});
	}
	render() {

		const {
			news
		} = this.state;
		const hasIMG = this.props.hasImg || false;
		let newsList = '';
		if (hasIMG) {
			newsList = news.length ? news.map((newsItem, index) => (
				<li key={index} className="listNews">
				<Link to={`/details/${newsItem.uniquekey}`} target="_blank"><span><img src={newsItem.thumbnail_pic_s} alt="pic"/></span> <span>
				{newsItem.title}</span></Link>
			</li>
			)) : '没有加载到任何新闻';
		} else {
			newsList = news.length ? news.map((newsItem, index) => (
				<li key={index}>
				<Link to={`details/${newsItem.uniquekey}`} target="_blank">{newsItem.title}</Link>
			</li>

			)) : '没有加载到任何新闻';
		}
		return (
			<div className="topNewsList">
				<Card>
					<ul>
					{newsList}
					</ul>
				</Card>
			</div>
		)
	}
}
