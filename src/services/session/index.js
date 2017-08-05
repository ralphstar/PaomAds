import store from 'PaomAds/src/store';

import * as api from './api';
import * as selectors from './selectors';
import * as actionCreators from './actions';
import { initialState } from './reducer';

const SESSION_TIMEOUT_THRESHOLD = 300; // Will refresh the access token 5 minutes before it expires

let sessionTimeout = null;

const setSessionTimeout = (duration) => {
	clearTimeout(sessionTimeout);
	sessionTimeout = setTimeout(
		refreshToken, // eslint-disable-line no-use-before-define
		(duration - SESSION_TIMEOUT_THRESHOLD) * 1000
	);
};

const clearSession = () => {
	clearTimeout(sessionTimeout);
	store.dispatch(actionCreators.update(initialState));
};

const onAuthRequestSuccess = (response) => {
	// const tokens = response.tokens.reduce((prev, item) => ({
	// 	...prev,
	// 	[item.type]: item,
	// }), {});
	// store.dispatch(actionCreators.update({ user: response.user }));
	const user = {
		id: response.id,
		username: response.usernrame,
		points: response.points,
		display_name: response.display_name,
        following_count: response.following_count,
		avatar: response.avatar,
		token: response.token
	};
    store.dispatch(actionCreators.update({ user: user }));
	console.log(response);
};

const onProductRequestSuccess = (response) => {
    console.log(response);
	const product = {
		id: response.id,
		title: response.title,
		slug: response.slug,
		description: response.description,
		designed_object_title: (response.design_object) ? response.design_object.title : null,
		designer_display_name: (response.designer) ? response.designer.display_name : null,
	};
    store.dispatch(actionCreators.update({ product: product }));
    throw product;

};

const onRequestFailed = (exception) => {
	console.log(exception);
	clearSession();
	throw exception;
};

export const refreshToken = () => {
	const session = selectors.get();

	// if (!session.tokens.refresh.value || !session.user.id) {
	if (!session.token || !session.user.id) {
		return Promise.reject();
	}

	return api.refresh(session.token, session.user)
	.then(onAuthRequestSuccess)
	.catch(onRequestFailed);
};

export const authenticate = (email, password) =>
	api.authenticate(email, password)
	.then(onAuthRequestSuccess)
	.catch(onRequestFailed);

export const revoke = () => {
	const session = selectors.get();
	return api.revoke(Object.keys(session.tokens).map(tokenKey => ({
		type: session.tokens[tokenKey].type,
		value: session.tokens[tokenKey].value,
	})))
	.then(clearSession())
	.catch(() => {});
};

export const get_product = () =>
	api.get_product()
	.then(onProductRequestSuccess)
	.catch(onRequestFailed);
