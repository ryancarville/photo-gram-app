import config from '../config';
import TokenService from './token-service';

const PhotoGramApiService = {
	//all API fetch request

	//GET landing page image
	landingPageImage() {
		return new Promise(resolve =>
			fetch(config.API_ENDPOINT, {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			}).then(res => {
				!res.ok
					? res.json().then(err => Promise.reject(err))
					: res.json().then(data => {
							return resolve(data);
					  });
			})
		);
	},
	//POST for new user signup
	signUp(newUser) {
		return new Promise((resolve, reject) => {
			fetch(config.API_ENDPOINT + '/signup', {
				method: 'POST',
				body: JSON.stringify(newUser),
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res =>
					!res.ok
						? res.json().then(err => {
								return resolve(err);
						  })
						: res.json().then(data => {
								return resolve(data);
						  })
				)
				.catch(err => {
					return err;
				});
		});
	},
	//POST for login credentials
	login(credintials) {
		return new Promise(resolve =>
			fetch(config.API_ENDPOINT + '/login', {
				method: 'POST',
				body: JSON.stringify(credintials),
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			}).then(res => {
				!res.ok
					? res.json().then(err => Promise.reject(resolve(err)))
					: res.json().then(data => {
							return resolve(data);
					  });
			})
		);
	},
	//GET for user data
	getUserData(user) {
		return new Promise((resolve, reject) => {
			fetch(config.API_ENDPOINT + `/user/${user.id}`, {
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`
				}
			}).then(res => {
				!res.ok
					? res.json().then(err => {
							console.log('reject');
							return reject(err);
					  })
					: res.json().then(data => {
							return resolve(data);
					  });
			});
		}).catch(err => {
			return err;
		});
	},
	//POST for image data upload
	uploadImage(data) {
		const user_id = data.user_id;
		return new Promise(resolve =>
			fetch(config.API_ENDPOINT + `/upload/${user_id}`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`
				},
				mode: 'cors'
			}).then(res => {
				!res.ok
					? res.json().then(err => Promise.reject(err))
					: res.json().then(data => {
							return resolve(data);
					  });
			})
		);
	},
	//POST for new album data
	addAlbum(newAlbum) {
		return new Promise(resolve =>
			fetch(config.API_ENDPOINT + '/albums/addAlbum', {
				method: 'POST',
				body: JSON.stringify(newAlbum),
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`
				},
				mode: 'cors'
			}).then(res => {
				!res.ok
					? res.json().then(err => Promise.reject(err))
					: res.json().then(data => {
							return resolve(data);
					  });
			})
		);
	},

	//PATCH for album
	updateAlbum(newAlbumInfo) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + `/albums/editAlbum/${newAlbumInfo.id}`, {
				method: 'PATCH',
				body: JSON.stringify(newAlbumInfo),
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`
				},
				mode: 'cors'
			}).then(res => {
				!res.ok
					? res.json().then(err => Promise.reject(err))
					: res.json().then(data => {
							return resolve(data);
					  });
			});
		});
	},
	//PATCH for edit image data
	updateImage(newImageInfo) {
		return new Promise(resolve =>
			fetch(config.API_ENDPOINT + `/images/${newImageInfo.id}`, {
				method: 'PATCH',
				body: JSON.stringify(newImageInfo),
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`
				},
				mode: 'cors'
			}).then(res => {
				!res.ok
					? res.json().then(err => Promise.reject(err))
					: res.json().then(data => {
							return resolve(data);
					  });
			})
		);
	},
	//DELETE for image
	deleteImage(id) {
		return new Promise(resolve =>
			fetch(config.API_ENDPOINT + `/images/${id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`
				},
				mode: 'cors'
			}).then(res => {
				!res.ok
					? res.json().then(err => Promise.reject(err))
					: res.json().then(data => {
							return resolve(data);
					  });
			})
		);
	},
	//DELETE for album
	deleteAlbum(album_id) {
		return new Promise(resolve =>
			fetch(config.API_ENDPOINT + `/albums/${album_id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`
				}
			}).then(res => {
				!res.ok
					? res.json().then(err => Promise.reject(err))
					: res.json().then(data => resolve(data));
			})
		);
	},
	//PATCH for user data change
	updateUserInfo(user_id, newInfo) {
		return new Promise(resolve =>
			fetch(config.API_ENDPOINT + `/user/${user_id}`, {
				method: 'PATCH',
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`
				},
				body: JSON.stringify(newInfo)
			}).then(res => {
				!res.ok
					? res.json().then(err => Promise.reject(err))
					: res.json().then(data => {
							return resolve(data);
					  });
			})
		);
	}
};

export default PhotoGramApiService;
