import React, { Component } from 'react';
import './albums.css';

class Albums extends Component {
	render() {
		return (
			<div className='albums-bar' id='albums'>
				<ul>
					<li id='album1' />
					<li id='album2' />
					<li id='album3' />
					<li id='album4' />
				</ul>
			</div>
		);
	}
}

export default Albums;
