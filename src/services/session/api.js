import { Buffer } from 'buffer';
import { fetchApi, fetchRestApi } from 'PaomAds/src/services/api';
import apiConfig from 'PaomAds/src/services/api/config';

const endPoints = {
	authenticate: '/login/',
	get_product: '/pft/product',
	revoke: '/users/auth/revoke',
	refresh: '/users/auth/refresh',
};

export const authenticate = (email, password) => fetchApi(endPoints.authenticate, {email: email, password: password}, 'post', {
});

export const get_product = () => fetchRestApi(endPoints.get_product, {}, 'post', {});

export const refresh = (token, user) => fetchApi(endPoints.refresh, { token, user }, 'post', {
	'Client-ID': apiConfig.clientId,
	Authorization: null,
});

export const revoke = tokens => fetchApi(endPoints.revoke, { tokens }, 'post');
