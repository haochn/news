import React from 'react';
import {
	Row,
	Col,
	Button,
	Form,
	Input,
	message,
	Card,
	notification
} from 'antd';

const TextArea = Input.TextArea;
const FormItem = Form.Item;
const myFetchOptions = {
	method: 'GET'
};
class Common extends React.Component {
	constructor() {
		super();
		this.state = {
			comments: ''
		}
	}
	componentDidMount() {
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({
				comments: json
			});
		})
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const formData = values.talk;
				fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.getItem('userid') + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formData, myFetchOptions).then(response => response.json()).then(json => {
					this.setState({
						comments: json
					});
					message.success('评论成功');
					//清空表单数据
					this.props.form.resetFields();
					this.componentDidMount();
				})
			}
		})
	}
	addUserCollection(e) {
		e.preventDefault();
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.getItem('userid') + "&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			//收藏成功以后进行一下全局的提醒
			notification['success']({
				message: 'ReactNews提醒',
				description: '收藏此文章成功'
			});
		});
	}

	render() {
		const {
			getFieldDecorator
		} = this.props.form;

		const {
			comments
		} = this.state;

		const commentList = comments.length ? comments.map(function(comment, index) {

			if (index < comments.length && index > comments.length - 5) {
				return (<Card title={comment.UserName} extra={<a href="">发布于{comment.datetime}</a>} key={index}>
					<p>{comment.Comments}</p>
				</Card>)
			}
			return '';
		}) : "暂无评论";
		return (
			<div className="comment">
				<Row>
					<Col span={24}>
					{commentList}
						<Form onSubmit={this.handleSubmit.bind(this)}>
							<FormItem label="您的评论">
							 {getFieldDecorator('talk', {rules: [{ required: true, message: '不能为空哦!' }],})(<TextArea default="畅所欲言" autosize={{minRows:2,maxRows:6}}></TextArea>)}
							<Button type="Primary" htmlType="submit">提交评论</Button>
							<Button type="Primary" htmlType="submit" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
							</FormItem>
						</Form>
					</Col>
				</Row>


			</div>
		);
	}
}

const common = Form.create()(Common);

export default common;
