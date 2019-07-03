import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';

export default class FileSelected extends Component {
	static contextType = PhotoGramContext;
	//get all albums in context array
	getAlbumNames = e => {
		console.log(e);
		const albums = e.map(album => (
			<option key={album.id} value={album.id}>
				{album.name}
			</option>
		));
		return albums;
	};

	render() {
		return (
			<PhotoGramContext.Consumer>
				{context => (
					<form
						className='imageUploadForm'
						encType='multipart/form-data'
						onSubmit={this.props.handleUpload}>
						<button
							type='button'
							id='imagePageBackBtn'
							onClick={this.props.handleBack}>
							&#171;{' '}
						</button>
						<img
							src={this.props.state.imagePreview}
							className='imgPreveiw'
							alt=''
						/>
						<label htmlFor='comments'>
							{' '}
							Comments
							<textarea
								className='uploadFormInput'
								name='comments'
								id='commentsForImage'
							/>
						</label>
						<label htmlFor='tags'>
							Tags{' '}
							<input
								className='uploadFormInput'
								type='text'
								name='tags'
								id='tagsForImage'
							/>
						</label>
						<label htmlFor='album'>
							Album{' '}
							<select className='uploadFormInput'>
								{this.getAlbumNames(context.albums)}
							</select>
						</label>
						<label htmlFor='date'>
							Date Taken{' '}
							<input
								className='uploadFormInput'
								type='date'
								name='date'
								id='dateForImage'
							/>
						</label>
						<input
							type='submit'
							value='Upload Image'
							name='submit'
							id='uploadFormBtn'
						/>
						<input
							type='button'
							value='Cancel'
							name='returnHome'
							id='returnHomeBtn'
							onClick={this.props.handleGoHome}
						/>
					</form>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}
