import React from 'react';
import MobileHeader from './mobileHeader'
import MobileFooter from './mobileFooter'
import {
	Tabs
} from 'antd';
import MobileList from './mobileList'
const TabPane = Tabs.TabPane;
export default class IndexMobile extends React.Component {

	render() {

		return (
			<div className="mobilePage">
				<MobileHeader></MobileHeader>
					<Tabs defaultActiveKey="1">
						<TabPane tab="头条" key="1">
						 <MobileList type="top" count="6"/>
						</TabPane>
						<TabPane tab="社会" key="2"><MobileList type="shehui" count="6"/>	</TabPane>
						<TabPane tab="国内" key="3"><MobileList type="guonei" count="6"/>	</TabPane>
						<TabPane tab="国际" key="4"><MobileList type="guoji" count="6"/>	</TabPane>
						<TabPane tab="娱乐" key="5"><MobileList type="yule" count="6"/>	</TabPane>
				</Tabs>
				<MobileFooter />
			</div>
		)
	}
}
