import React, { Component } from 'react';
import axios from 'axios';
import ActiveList from './ActiveList';
// import DoneList from './DoneList';
import { Button, Icon, Row, Col } from 'react-materialize';
import Header from './components/headerComponent';

class ShopList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: []
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	componentDidMount() {
		axios.get(`http://35.234.83.110/api/all`).then(res => {
			const getList = res.data.items;

			getList.map(res => {
				let fetchItems = {
					text: res.content,
					status: res.status,
					key: res._id
				};

				return this.setState(prevState => {
					return {
						items: prevState.items.concat(fetchItems)
					};
				});
			});
		});
	}

	deleteItem(key) {
		var filteredItems = this.state.items.filter(function(item) {
			return item.key !== key;
		});

		axios
			.delete(`http://35.234.83.110/api/`, {
				data: { content_id: key }
			})
			.then(res => {
				console.log(res.data);
				this.setState({
					items: filteredItems
				});
			});
	}

	handleSubmit = event => {
		let input = this._inputElement.value;

		if (input !== '') {
			var newItem = {
				content: input,
				status: false
			};

			axios
				.post(`http://35.234.83.110/api/`, {
					content: newItem.content,
					status: newItem.status
				})
				.then(res => {
					console.log('API Respond');
					console.log(res.data);
					let newState = {
						text: res.data.content,
						status: res.data.status,
						key: res.data._id
					};
					return this.setState(prevState => {
						return {
							items: prevState.items.concat(newState)
						};
					});
				})
				.then(value => {
					console.log(value);
				});
			event.preventDefault();

			this._inputElement.value = '';
		}
	};

	render() {
		return (
			<Row>
				<Col s={12}>
					<div className="ShopListMain">
						<Header />
						<div className="header">
							<form onSubmit={this.handleSubmit}>
								<input
									ref={a => {
										this._inputElement = a;
									}}
									placeholder="enter an item"
								/>
								<Col s={7}>
									<Button waves="light">
										<Icon left>playlist_add</Icon>add
									</Button>
								</Col>
								<Col s={5}>
									<Button waves="light">
										<Icon left>clear</Icon>clear
									</Button>
								</Col>
							</form>
						</div>
						<Col s={12}>
							<ActiveList entries={this.state.items} delete={this.deleteItem} />
						</Col>
					</div>
				</Col>
			</Row>
		);
	}
}

export default ShopList;
