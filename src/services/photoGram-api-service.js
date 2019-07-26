import config from '../config';
import TokenService from './token-service';

const PhotoGramApiService = {
	login(user) {
		return fetch(config.API_ENDPOINT + `/user/${user.id}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	deleteImage(id) {
		return fetch(config.API_ENDPOINT + `/images/${id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			},
			mode: 'cors'
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	deleteAlbum(id) {
		return fetch(config.API_ENDPOINT + `/albums/${id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			}
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	updateUserInfo(user_id, newInfo) {
		return fetch(config.API_ENDPOINT + `/user/${user_id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			},
			body: JSON.stringify({
				profile_img_url: newInfo.profile_img_url,
				full_name: newInfo.full_name,
				user_name: newInfo.user_name
			})
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
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
	},
	singUp(newUser) {
		return fetch(config.API_ENDPOINT + '/signup', {
			method: 'POST',
			body: JSON.stringify(newUser),
			headers: {
				'content-type': 'application/json'
			},
			mode: 'cors'
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	uploadImage(data) {
		console.log(data);
		const user_id = data.user_id;
		console.log(user_id);
		return fetch(config.API_ENDPOINT + `/upload/${user_id}`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`
			},
			mode: 'cors'
		}).then(res =>
			!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	}
};

export default PhotoGramApiService;
