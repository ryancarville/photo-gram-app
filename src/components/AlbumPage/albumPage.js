import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import PhotoGramContext from '../../PhotoGramContext';
import PhotoGramApiService from '../../services/photoGram-api-service';
import Image from '../Image/image';
import './albumPage.css';

export default class AlbumPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: this.props.match.params.user_id,
			album_id: this.props.match.params.album_id,
			images: [],
			albumName: '',
			albumImages: [],
			redirect: false,
			error: null
		};
	}
	static proptTypes = {
		images: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string
			})
		)
	};
	static defaultProps = { images: [], albums: [] };
	static contextType = PhotoGramContext;
	//on mount set state with all images assigned to current album
	componentDidMount() {
		const images = this.context.images;
		const album_id = this.state.album_id;
		const albumImgs = images.filter(
			img => img.album_id.toString() === album_id
		);
		const albumData = this.context.getAlbumData(this.state.album_id);
		this.setState({
			images: images,
			albumName: albumData.album_name,
			albumImages: albumImgs
		});
	}
	//handle back event
	handleBack = e => {
		const user_id = this.state.user_id;
		this.props.history.push(`/user/${user_id}`);
	};
	//delete request of Album sent to context event handler
	deleteAlbumRequest = albumId => {
		PhotoGramApiService.deleteAlbum(albumId)
			.then(data => this.context.updateAlbumsOnDelete(albumId))
			.then(
				setTimeout(() => {
					this.setState({
						redirect: true
					});
				}, 500)
			);
	};

	render() {
		if (this.state.redirect) {
			const user_id = this.state.user_id;
			return <Redirect to={`/user/${user_id}`} />;
		}
		const { album_id, albumImages } = this.state;
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<section>
						<div className='albumPage-container'>
							<div className='albumPageBtnContainer'>
								<button
									type='button'
									id='imagePageBackBtn'
									onClick={this.handleBack}>
									&#171;{' '}
								</button>
								<p>{this.state.albumName}</p>
								<button
									id='removeAlbumBtn'
									type='button'
									onClick={() => this.deleteAlbumRequest(album_id)}>
									Delete Album
								</button>
							</div>
							<div className='grid-container'>
								{albumImages.map(img => (
									<Image
										key={img.id.toString()}
										{...img}
										user_id={context.user.id}
									/>
								))}
							</div>
						</div>
					</section>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}
