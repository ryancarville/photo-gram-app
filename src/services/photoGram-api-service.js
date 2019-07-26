import config from '../config';
import TokenService from './token-service';

const PhotoGramApiService = {
	singUp(newUser) {
		return new Promise(resolve =>
			fetch(config.API_ENDPOINT + '/signup', {
				method: 'POST',
				body: JSON.stringify(newUser),
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
					? res.json().then(err => Promise.reject(err))
					: res.json().then(data => {
							return resolve(data);
					  });
			})
		);
	},
	getUserData(user) {
		return new Promise(resolve =>
			fetch(config.API_ENDPOINT + `/user/${user.id}`, {
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`
				}
			}).then(res => {
				!res.ok
					? res.json().then(err => Promise.reject(err))
					: res.json().then(data => {
							return resolve(data);
					  });
			})
		);
	},
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
	deleteAlbum(id) {
		return new Promise(resolve =>
			fetch(config.API_ENDPOINT + `/albums/${id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`
				}
			}).then(res => {
				!res.ok ? res.json().then(err => Promise.reject(err)) : res.json();
			})
		);
	},
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
	},
	refreshContent(id) {
		return fetch(config.API_ENDPOINT + `/user/${id}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	}
};

export default PhotoGramApiService;
