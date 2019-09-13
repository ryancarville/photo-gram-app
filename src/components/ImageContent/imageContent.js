import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import DeleteConfirm from '../DeleteConfirm/deleteConfirm';

class ImageContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDeletePopup: false,
			goBack: false
		};
	}
	deletePopUp = () => {
		this.setState({
			showDeletePopup: true
		});
	};
	closePopup = () => {
		this.setState({
			showDeletePopup: false
		});
	};
	goBackToAlbum = () => {
		this.props.history.goBack();
	};

	//image page image content component
	render() {
		const image = this.props.image;
		const user = this.props.user;
		return (
			<>
				<button
					type='button'
					id='imagePageBackBtn'
					onClick={this.goBackToAlbum}>
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
							<button type='button' onClick={this.deletePopUp}>
								Delete
							</button>
						</div>
					</div>
					{this.state.showDeletePopup ? (
						<DeleteConfirm
							image_id={image.id}
							deleteImageRequest={this.props.deleteImageRequest}
							close={this.closePopup}
						/>
					) : null}
				</div>
			</>
		);
	}
}
export default withRouter(ImageContent);
