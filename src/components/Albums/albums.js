import React, { Component } from 'react';
import './albums.css';

class Albums extends Component {
	render() {
		return (
			<div className='albums-bar' id='albums'>
				<ul>
					<li>
						<a href='#'>Album 1</a>
					</li>
					<li>
						<a href='#'>Album 2</a>
					</li>
					<li>
						<a href='#'>Album 3</a>
					</li>
					<li>
						<a href='#'>Album 4</a>
					</li>
				</ul>
			</div>
		);
	}
}

export default Albums;
