import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhotoGramContext from '../../PhotoGramContext';
import Image from '../Image/image';
import './albumPage.css';

export default class AlbumPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			albumId: this.props.match.params.album_id,
			images: this.props.location.state.images,
			albumImages: [],
			albumName: '',
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
	componentWillMount() {
		const { images } = this.state;
		const albumId = this.state.albumId;
		const albumImgs = images.filter(img => img.album_id == albumId);
		const albumName = this.props.location.state.album_name;
		this.setState(
			{
				albumImages: albumImgs,
				albumName: albumName
			},
			() => console.log(this.state)
		);
	}
	//handle back event
	handleBack = e => {
		this.props.history.goBack();
	};
	//delete request of Album sent to context event handler
	deleteAlbumRequest = (albumId, cd) => {
		cd(albumId);
		this.handleBack();
	};

	render() {
		const albumId = this.props.match.params.album_id;
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
									onClick={() =>
										this.deleteAlbumRequest(albumId, context.deleteAlbum)
									}>
									Remove Album
								</button>
							</div>
							<div className='grid-container'>
								{this.state.albumImages.map(img => (
									<Image key={img.id.toString()} {...img} />
								))}
							</div>
						</div>
					</section>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}
