import React from 'react';

import {
	Row,
	Col,
	Icon,
	Modal,
	Tabs,
	Card,
	Upload,
	Affix,
	Menu,
	Dropdown
} from 'antd';
const TabPane = Tabs.TabPane;
const myFetchOptions = {
	method: 'GET'
}
var infos = '';


class mobileUserCenter extends React.Component {
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
		console.log(this.state)
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
	exit() {
		localStorage.userid = '';
		localStorage.userNickName = '';
		this.setState({
			hasLogined: false
		});
	};
	handleData(data, index = 0) {
		const end = 5,
			newData = [];
		for (let i = index; i < index + end; i++) {
			newData.push(data[i]);
		}
		return newData;
	}
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
		)) : '您还未做任何评论';
		const menu = (
			<Menu>
				<Menu.Item>
					{"退出"}
				</Menu.Item>

			</Menu>
		);
		const usercommentsListEnd = this.handleData(usercommentsList);
		console.log(this.props)
		return (
			<div className="m-user">
			<Row>
				<Col span="24" className="m-userCenter">
				 <Affix className="m-banner">
				 	<div className="m-fixed">
					 	<a href="/" className="m-back"> <Icon type="home" style={{ fontSize:20, color: '#666' }} /> </a>
					 	{localStorage.userNickName}
					 	<Dropdown overlay={menu} >
							<a className="ant-dropdown-link m-option" href="/" onClick={this.exit.bind(this)}>
							<Icon type="logout" style={{ fontSize:20, color: '#666' }}  />
							</a>
						</Dropdown>
					</div>	
				 </Affix>
					<Tabs  defaultActiveKey="1">
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
											{usercommentsListEnd}
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
			</Row>


			</div>


		)
	}
}
export default mobileUserCenter;