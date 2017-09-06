import React from 'react';
import PcHeader from './pcHeader'
import PcFooter from './pcFooter'
import PcNewsContainer from './pcNewsContainer'
import {
	BackTop
} from 'antd'
export default class IndexPc extends React.Component {
	render() {
		return (
			<div className="pcPage">
				<PcHeader />
				<PcNewsContainer />
				<PcFooter />
				<BackTop />
			</div>
		)
	}
}