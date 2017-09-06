import React from 'react';
import PcHeader from './pcHeader'
import PcFooter from './pcFooter'
import {
	Row,
	Col,
	Icon,
	Modal,
	Tabs,
	Card,
	Upload
} from 'antd';
const TabPane = Tabs.TabPane;
const myFetchOptions = {
	method: 'GET'
}
var infos = '';
export default class PcUserCenter extends React.Component {
	constructor() {
		super();
		this.state = {
			usercollection: [],
			usercomments: [],
			previewImage: '',
			previewVisible: false,
			fileList: [{
				uid: -1,
				name: 'xxx.png',
				status: 'done',
				url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			}]
		}
	}
	handleClick(e) {

		if (e.key === "shoucang") {
			const usercollectionLength = this.state.usercollection.length;
			infos = usercollectionLength ? this.state.usercollection.map((collect, index) => (
				<Card title={"收藏"+(index+1)} extra={<a href="">发布于{collect.datetime}</a>} key={index}>
				<p>{collect.Title}</p>
				</Card>
			)) : '您还未收藏任何文章'
		}
		if (e.key === "pinglun") {
			const usercommentsLength = this.state.usercomments.length;
			infos = usercommentsLength ? this.state.usercomments.map((comment, index) => (
				<Card title={"评论"+index} extra={<a href="">发布于{comment.datetime}</a>} key={index}>
				<p>{comment.Comments}</p>
				</Card>
			)) : '您还未做任何评论'
		}

	}
	componentDidMount() {
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({
				usetcollection: json
			})
		})
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({
				usercomments: json
			})
		})
	}


	handleCancel = () => this.setState({
		previewVisible: false
	})

	handlePreview = (file) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		});
	}

	handleChange = ({
		fileList
	}) => this.setState({
		fileList
	})


	render() {
		const {
			previewVisible,
			previewImage,
			fileList
		} = this.state;
		const uploadButton = (
			<div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
		);

		const {
			usercollection,
			usercomments
		} = this.state;
		//收藏功能

		const usercollectionList = usercollection.length ? usercollection.map((collect, index) => (
			<Card title={"收藏"+index} extra={<a href="">发布于{collect.datetime}</a>} key={index}>
				<p>{collect.Title}</p>
				</Card>
		)) : '您还未收藏任何文章'


		const usercommentsList = usercomments.length ? usercomments.map((comment, index) => (
			<Card title={"评论"+(index+1)} extra={<a href="">发布于{comment.datetime}</a>} key={index}>
				<p>{comment.Comments}</p>
				</Card>
		)) : '您还未做任何评论'
		return (
			<div className="pcPage">
				<PcHeader/>
				<Row>
				<Col span={2}></Col>
					<Col span={20} className="talk">
						<Tabs>
							<TabPane tab="我的收藏列表" key="1">
								<div className="clearfix">
								<div className="comment">
									<Row>
										<Col span={24}>
											{usercollectionList}
										</Col>
									</Row>
								</div>
								</div>
							</TabPane>
							<TabPane tab="我的评论列表" key="2">
							<div className="clearfix">
							<div className="comment">
								<Row>
									<Col span={24} >
										{usercommentsList}
									</Col>
								</Row>
							</div>
							</div>
							</TabPane>
							<TabPane tab="头像设置" key="3">
								<div className="clearfix">
							        <Upload
							          action="//jsonplaceholder.typicode.com/posts/"
							          listType="picture-card"
							          fileList={fileList}
							          onPreview={this.handlePreview}
							          onChange={this.handleChange}
							        >
							          {fileList.length >= 3 ? null : uploadButton}
							        </Upload>
							        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
							          <img alt="example" style={{ width: '100%' }} src={previewImage} />
							        </Modal>
						      </div>
							</TabPane>
						</Tabs>
					</Col>
					<Col span={2}></Col>

				</Row>
				<PcFooter/>
			</div>
		)
	}
}