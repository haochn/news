import React from 'react';
import {
	Icon,
	Button,
	Modal,
	Tabs,
	Form,
	Input,
	message
} from 'antd';
import {
	Link
} from 'react-router';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class MobileHeader extends React.Component {

	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userId: 0
		}
	}
	componentWillMount() {
		if (localStorage.userid) {
			this.setState({
				hasLogined: true
			});
			this.setState({
				userNickName: localStorage.getItem('userNickName'),
				userid: localStorage.getItem('userid')
			});
		}
	};
	handleSubmit(e) {
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		this.props.form.validateFields((err, values) => {
			if (this.state.action === 'login') {
				fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + values.username + "&password=" + values.password, myFetchOptions).then(response => response.json()).then(json => {
					this.setState({
						userNickName: json.NickUserName,
						userid: json.UserId
					});
					localStorage.setItem('userid', json.UserId);
					localStorage.setItem('userNickName', json.NickUserName);
					message.success("登录成功");
					this.setModalVisible(false);
				});
				this.setState({
					hasLogined: true
				});
			}
			if (this.state.action === 'register') {
				fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&r_userName=" + values.r_username + "&r_password=" + values.r_password + "r_confirmPassword=" + values.r_confirmpassword, myFetchOptions).then(response => response.json()).then(json => {
					if (json) {

						message.success("注册成功");

						this.setModalVisible(false);
					}
				});
				this.setState({
					hasLogined: false
				});
			}
			//清空表单数据
			this.props.form.resetFields();

		});



	}
	empty(dom) {
		for (let i = 0, len = dom.length; i < len; i++) {
			dom[i].value = '';
		}
	}

	login() {
		this.setModalVisible(true);
		if (localStorage.userid) {
			this.setModalVisible(false);
		}
	};
	callback(key) {
		if (key === '1') {
			this.setState({
				action: 'login'
			});
		} else if (key === '2') {
			this.setState({
				action: 'register'
			});
		}
	}
	handleOk = (e) => {
		this.setState({
			modalVisible: false,
		});
	}
	handleCancel = (e) => {
		this.setState({
			modalVisible: false,
		});
	}
	setModalVisible(value) {
		this.setState({
			modalVisible: value
		});
	}
	handleClose(e) {
		if (e.target.innerText === '') {
			this.setModalVisible(false);
		}
		if (e.target.innerText === '取 消') {
			this.props.form.resetFields();
		}
	}
	render() {
		const {
			getFieldDecorator
		} = this.props.form;

		const userShow = this.state.hasLogined ?
			<Link to={`/userCenter`}><Icon type="user"/>

		</Link> : <Icon type="login" onClick={this.login.bind(this)}/>


		return (
			<div id="mobileheader">
				<header>
					<img src={require('../../../images/logo.png')} alt="logo" />
					<span>新闻资讯</span>
					{userShow}
				</header>
				<Modal title="用户中心" visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleClose.bind(this)} okText = "关闭">
				    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
				     <TabPane tab="登录" key="1">
				            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
				                <FormItem>{getFieldDecorator('username', {rules: [{ required: true, message: '请输入您的用户名!' }],})(
				                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入您的用户名" />)}</FormItem>
				                <FormItem>{getFieldDecorator('password', {rules: [{ required: true, message: '请输入您的密码!' }],})(
				                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入您的密码" />)}</FormItem>{getFieldDecorator('remember', {valuePropName: 'checked',initialValue: true,})(
				                <Button type="primary" htmlType="submit">登录</Button>)}</Form>
				        </TabPane>
				        <TabPane tab="注册" key="2">
				            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
				                <FormItem>{getFieldDecorator('userName', {rules: [{ required: true, message: '请输入您的用户名!' }],})(
				                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入您的用户名" />)}</FormItem>
				                <FormItem>{getFieldDecorator('password', {rules: [{ required: true, message: '请输入您的密码!' }],})(
				                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入您的密码" />)}</FormItem>
				                <FormItem>{getFieldDecorator('confirmPassword', {rules: [{ required: true, message: '请确认您的密码!' }],})(
				                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请确认您的密码!" />)}</FormItem>{getFieldDecorator('remember', {valuePropName: 'checked',initialValue: true,})(
				                <Button type="primary" htmlType="submit">登录</Button>)}</Form>
				        </TabPane>

				    </Tabs>
				</Modal>
			</div>
		)
	}
}

const MOBILEHeader = Form.create()(MobileHeader);
export default MOBILEHeader;