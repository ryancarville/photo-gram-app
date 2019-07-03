import React, { Component } from 'react';
import PhotoGramContext from '../../PhotoGramContext';
import './fileSelected.css';

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
					<>
						<div className='uploadFormContainer'>
							<img
								src={this.props.state.imagePreview}
								className='uploadImgPreview'
								alt=''
							/>
							<form
								className='imageUploadForm'
								encType='multipart/form-data'
								onSubmit={this.props.handleUpload}>
								<label htmlFor='comments'>
									{' '}
									Caption
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
						</div>
					</>
				)}
			</PhotoGramContext.Consumer>
		);
	}
}
