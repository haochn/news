import React from 'react';
import PcNewsBlock from './pcNewsBlock';
import PcNewsImagesBlock from './pcNewsImagesBlock'
import {
	Row,
	Col,
	Carousel,
	Tabs
} from 'antd';
const TabPane = Tabs.TabPane;
export default class PcNewsContainer extends React.Component {
	render() {
		const settings = {
			autoplay: true,
			speed: 500,
			slidesToShow: 1,
		};
		return (
			<div className="PcNewsContainer">
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
					<Row>
					<Col span={13}>
					<div className="leftContainer">
							    <div className="carousel">
							        <Carousel {...settings}>
							            <div>
							                <img src={require('../../../images/carousel_1.jpg')} alt="" />
							            </div>
							            <div>
							                <img src={require('../../../images/carousel_2.jpg')} alt="" />
							            </div>
							            <div>
							                <img src={require('../../../images/carousel_3.jpg')} alt="" />
							            </div>
							            <div>
							                <img src={require('../../../images/carousel_4.jpg')} alt="" />
							            </div>
							        </Carousel>
							    </div>
						</div>
					</Col>

					<Col span={11} className="index_news">
							<Tabs className="tabs_news">
								<TabPane tab="热点资讯" key="1" className="hotNews">
									<PcNewsBlock count={9} type="top" width="100%" bordered="false"></PcNewsBlock>
								</TabPane>

							</Tabs>
					</Col>

					</Row>
						<PcNewsImagesBlock count={8} type="guoji" carTitle="国际头条" imgWidth="125px" bordered="false" />
						<PcNewsImagesBlock count={16} type="yule" carTitle="娱乐" imgWidth="125px" bordered="false" />

					</Col>
					<Col span={2}></Col>
				</Row>


			</div>
		)
	}
}
