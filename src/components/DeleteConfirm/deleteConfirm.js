import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './deleteConfirm.css';

export default class DeleteConfirm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: this.props.user_id,
			image_id: '',
			album_id: '',
			album_name: '',
			redirect: false
		};
	}

	componentDidMount() {
		if (this.props.image_id) {
			this.setState({
				image_id: this.props.image_id
			});
		}
		if (this.props.album) {
			this.setState({
				album_id: this.props.album.id,
				album_name: this.props.album.album_name
			});
		}
	}
	render() {
		if (this.state.redirect) {
			return <Redirect to={`/user/${this.state.user_id}`} />;
		}

		return this.state.image_id ? (
			<div className='deleteConfirmImage'>
				<p>Are you sure you want to delete this image?</p>
				<button
					type='button'
					onClick={() => this.props.deleteImageRequest(this.state.image_id)}>
					Yes
				</button>
				<button
					type='button'
					onClick={() => {
						this.props.close();
					}}>
					No
				</button>
			</div>
		) : (
			<div className='deleteConfirmAlbum'>
				<p>
					Are you sure you want to delete the album{' '}
					<b>{this.state.album_name}</b>?
				</p>
				<button
					type='button'
					onClick={() => this.props.deleteAlbumRequest(this.state.album_id)}>
					Yes
				</button>
				<button
					type='button'
					onClick={() => {
						this.props.close();
					}}>
					No
				</button>
			</div>
		);
	}
}
