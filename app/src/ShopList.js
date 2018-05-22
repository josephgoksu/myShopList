import React, { Component } from 'react';
import axios from 'axios';
import ActiveList from './ActiveList';
import DoneList from './DoneList';
import { Button, Icon, Row, Col } from 'react-materialize';
import Header from './components/headerComponent';

const initialState = { items: [] };

class ShopList extends Component {
	constructor(props) {
		super(props);

		this.state = initialState;

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

	changeItem(key) {
		console.log(key);
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
					if (res.data.code === 'E11000') {
						return alert('you already add this');
					} else {
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
					}
				})
				.then(value => {
					console.log(value);
				});
			event.preventDefault();

			this._inputElement.value = '';
		}
	};

	handleStatus = key => {
		console.log(this.state.items);
		axios.get(`http://35.234.83.110/api/all`).then(value => {
			let getData = value.data.items;

			getData.map(res => {
				let getData2 = {
					text: res.content,
					status: res.status,
					key: res._id
				};

				if (getData2.key === key) {
					axios
						.put(`http://35.234.83.110/api/`, {
							content_id: key,
							content: getData2.text,
							status: true
						})
						.then(() => {
							this.setState(initialState);
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
						});
				}

				return true;
			});
		});
	};

	clearEverything = () => {
		for (var i = 0; i < this.state.items.length; i++) {
			axios.delete(`http://35.234.83.110/api/`, {
				data: { content_id: this.state.items[i].key }
			});
		}
		this.setState(initialState);
	};

	render() {
		return (
			<Row>
				<Col s={8}>
					<div className="ShopListMain">
						<Header />
						<div className="header">
							<Row>
								<form onSubmit={this.handleSubmit}>
									<Col s={7}>
										<input
											ref={a => {
												this._inputElement = a;
											}}
											placeholder="enter an item"
										/>
									</Col>
									<Col s={5}>
										<Button waves="light">
											<Icon left>playlist_add</Icon>add
										</Button>
									</Col>
								</form>
							</Row>
						</div>
						<Row>
							<Col s={8}>
								<ActiveList
									entries={this.state.items}
									delete={this.deleteItem}
									keyItem={this.handleStatus}
								/>
							</Col>
						</Row>
					</div>
				</Col>
				<Col s={4}>
					<h4 className="saga">Done</h4>
					<div className="theListDone">
						<DoneList entries={this.state.items} />
					</div>
					<Button
						waves="light"
						className="buttonClass red"
						onClick={this.clearEverything}
					>
						clear<Icon left>clear</Icon>
					</Button>
				</Col>
			</Row>
		);
	}
}

export default ShopList;
