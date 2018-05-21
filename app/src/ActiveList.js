import React, { Component } from 'react';

class ActiveItems extends Component {
	constructor(props) {
		super(props);
	}

	delete(key) {
		this.props.delete(key);
	}

	returnEntries(data) {
		return (
			<li
				onClick={() => {
					this.delete(data.key);
				}}
				key={data.key}
			>
				{data.text}
			</li>
		);
	}

	render() {
		return (
			<ul className="theList">
				{this.props.entries.map(data => {
					return this.returnEntries(data);
				})}
			</ul>
		);
	}
}

export default ActiveItems;
