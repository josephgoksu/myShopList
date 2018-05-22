import React from 'react';
import { Col } from 'react-materialize';

class DoneList extends React.Component {
	render() {
		return (
			<ul className="theListDone">
				{this.props.entries.map(data => {
					if (data.status === true) {
						return (
							<div key={data.key}>
								<Col s={8}>
									<li>{data.text}</li>
								</Col>
							</div>
						);
					}
				})}
			</ul>
		);
	}
}

export default DoneList;
