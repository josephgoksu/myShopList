import React from 'react';
import ReactDOM from 'react-dom';
import ShopList from './ShopList';
import './styles/style.css';
import './styles/list.css';

var destination = document.querySelector('#root');

ReactDOM.render(
	<div>
		<ShopList />
	</div>,
	destination
);
