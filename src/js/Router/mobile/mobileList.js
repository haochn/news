import React from 'react';
import {
	Row,
	Col,
	Icon
} from 'antd';
import {
	Link
} from 'react-router';
export default class mobileList extends React.Component {
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
		const newsList = news.length ? news.map((newsItem, index) => (
			<section key={index} className="m_article list-item special_section clearfix">
				<Link to={`details/${newsItem.uniquekey}`}>
					<div className="m_article_img">
					<img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
					</div>
					<div className="m_article_info">
              <div className="m_article_title">
                <span>{newsItem.title}</span>
              </div>
              <div className="m_article_desc clearfix">
                <div className="m_article_desc_l">
                  <span className="m_article_channel"><Icon type="tag-o" style={{ fontSize: 12, margin: '0 3px 0 0' }} />{newsItem.realtype}</span>
                  <span className="m_article_time">{newsItem.date}</span>
                </div>
              </div>
            </div>

				</Link>
			</section>

		)) : '没有加载到任何新闻';


		return (
			<div className="m-list">
				<Row>
					<Col span={24}>
					{newsList}

					</Col>
				</Row>


			</div>
		)
	}
}
