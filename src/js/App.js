import React from 'react';
import {
	Router,
	Route,
	browserHistory
} from 'react-router';
import MediaQuery from 'react-responsive';
import IndexPc from './Router/pc/index';
import PcNewsDetails from './Router/pc/pcNewsDetails';
import PcNewsList from './Router/pc/pcNewsList';
import MobileIndex from './Router/mobile/index';
import MobileNewsDetails from './Router/mobile/mobileNewsDetails';
import PcUserCenter from './Router/pc/pcUserCenter';
import MobileUserCenter from './Router/mobile/mobileUserCenter'
export default class App extends React.Component {
	render() {
		return (
			<div>
				<MediaQuery query='(min-device-width:1224px)'>
					<Router history={browserHistory}>
						<Route path="/" component={IndexPc}></Route>
						<Route path="/list/:tag" component={PcNewsList}></Route>
						<Route path="/details/:uniquekey" component={PcNewsDetails}></Route>
						<Route path="/usercenter" component={PcUserCenter}></Route>
					</Router>
				</MediaQuery>
				<MediaQuery query='(max-device-width:1224px)'>
					<Router history={browserHistory}>
						<Route path="/" component={MobileIndex}></Route>
						<Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
						<Route path="/userCenter" component={MobileUserCenter}></Route>
					</Router>
				</MediaQuery>
			</div>
		)
	}
}