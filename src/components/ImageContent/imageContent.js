import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ImageContent extends Component {
	constructor(props) {
		super(props);
		this._isMounted = false;
	}
	componentDidMount() {
		this._isMounted = true;
	}
	componentDidUpdate(prevProps, prevState) {
		this._isMounted = false;
	}

	render() {
		const image = this.props.image;
		const user = this.props.user;

		return (
			<>
				<button type='button' id='imagePageBackBtn' onClick={this.props.goHome}>
					&#171;{' '}
				</button>
				<div className='image-page-container'>
					<img
						key={image.id}
						src={image.img_url}
						alt={image.alt}
						className='singleImg'
					/>
					<div className='image-info'>
						<p>{image.caption}</p>
						<span>Date: {this.props.formatDate(image.date_created)}</span>

						<div className='imageButtons'>
							<Link to={`/user/${user.id}/edit/${image.id}`}>
								<button type='button'>Edit Post</button>
							</Link>
							<button
								type='button'
								onClick={() => this.props.deleteImageRequest(image.id)}>
								Delete
							</button>
						</div>
					</div>
				</div>
			</>
		);
	}
}
