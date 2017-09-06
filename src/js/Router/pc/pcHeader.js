import React from 'react';
import {
	Row,
	Col,
	Menu,
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
class PcHeader extends React.Component {
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
	logout() {
		localStorage.userid = '';
		localStorage.userNickName = '';
		this.setState({
			hasLogined: false
		});
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
	handleClick(e) {
		if (e.key === 'register') {
			this.setState({
				current: 'register'
			});
			this.setModalVisible(true);
		} else {
			this.setState({
				current: e.key
			})
		}
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
		const userShow = this.state.hasLogined ? <Menu.Item key="logout"  className='register'>
		<Button type="primary" shape="circle" htmlType="button">{this.state.userNickName}</Button>
		&nbsp;&nbsp;
		<Link target="_blank" to={`/usercenter`}>
			<Button type="dashed" htmlType="button">个人中心</Button>
		</Link>
		&nbsp;&nbsp;
		<Button type="ghost"  htmlType="button"  onClick={this.logout.bind(this)}>退出</Button>
		</Menu.Item> : <Menu.Item key="register" className='register'>
			<Icon type="user" />登录/注册
		</Menu.Item>;

		return (
			<header>
				<Row>
					<Col span={2}></Col>
					<Col span={3}>
						<a className="logo" href="/">
							<img src={require('../../../images/logo.png')} alt="logo" />
							<span>新闻讯息</span>
						</a>

					</Col>
					<Col span={17}>
						<Menu  mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.props.select]}>
								<Menu.Item key="top">
									<Icon type='plus-square' /><Link   target="_blank" to={`/list/top`}>头条</Link>
								</Menu.Item>
								<Menu.Item key="shehui">
									<Icon type='plus-square' /><Link   target="_blank" to={`/list/shehui`}>社会</Link>
								</Menu.Item>
								<Menu.Item key="guonei" >
									<Icon type='plus-square' /><Link  target="_blank" to={`/list/guonei`}>国内</Link>
								</Menu.Item>
								<Menu.Item key="guoji" >
									<Icon type='plus-square' /><Link target="_blank" to={`/list/guoji`}>国际</Link>
								</Menu.Item>
								<Menu.Item key="yule">
									<Icon type='plus-square' /><Link  target="_blank" to={`/list/yule`}>娱乐</Link>
								</Menu.Item>
								<Menu.Item key="junshi">
									<Icon type='plus-square' /><Link  target="_blank" to={`/list/junshi`}>军事</Link>
								</Menu.Item>
								<Menu.Item key="keji">
									<Icon type='plus-square' /><Link  target="_blank" to={`/list/keji`}>科技</Link>
								</Menu.Item>
								<Menu.Item key="caijing">
									<Icon type='plus-square' /><Link  target="_blank" to={`/list/caijing`}>财经</Link>
								</Menu.Item>
								{userShow}
						</Menu>
						<Modal title="用户中心" visible={this.state.modalVisible} onOk={this.handleOk}  onCancel={this.handleClose.bind(this)} okText = "关闭">
				      <Tabs defaultActiveKey="1" size="small" onChange={this.callback.bind(this)}>
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
										 <FormItem>{getFieldDecorator('r_username', {rules: [{ required: true, message: '请输入您的用户名！' }],})(
												 <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入您的用户名" />)}</FormItem>
										 <FormItem>{getFieldDecorator('r_password', {rules: [{ required: true, message: '请输入您的密码!' }],})(
												 <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入您的密码" />)}</FormItem>
										 <FormItem>{getFieldDecorator('r_confirmpassword', {rules: [{ required: true, message: '请确认您的密码!'}],})(
												 <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请确认您的密码" />)}</FormItem>{getFieldDecorator('remember2', {valuePropName: 'checked',initialValue: true,})(
										 <Button type="primary" htmlType="submit">注册</Button>)}</Form>
								</TabPane>
						  </Tabs>
				   </Modal>
					</Col>
					<Col span={2}></Col>

				</Row>
			</header>
		)
	}
}
const PCHeader = Form.create()(PcHeader);
export default PCHeader;