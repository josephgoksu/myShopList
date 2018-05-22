import React, { Component } from 'react';
import { Col, Button } from 'react-materialize';

class ActiveList extends Component {
	delete(key) {
		this.props.delete(key);
	}

	status(key) {
		this.props.keyItem(key);
	}

	render() {
		return (
			<div>
				<ul className="theList">
					{this.props.entries.map(data => {
						if (data.status === false) {
							return (
								<div key={data.key}>
									<Col s={8}>
										<li
											onClick={() => {
												this.status(data.key);
											}}
										>
											{data.text}
										</li>
									</Col>
									<Col s={2}>
										<Button
											onClick={() => {
												this.delete(data.key);
											}}
											floating
											large
											className="red"
											waves="light"
											icon="delete"
										/>
									</Col>
								</div>
							);
						} else {
							<p>list empty</p>;
						}
					})}
				</ul>
			</div>
		);
	}
}

export default ActiveList;
