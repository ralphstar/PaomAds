/* global fetch */

import fetchival from 'fetchival';
import _ from 'lodash';

import * as sessionSelectors from 'PaomAds/src/services/session/selectors';
import apiConfig from './config';

var ApiUtils = {
    checkStatus: function(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
};

export const exceptionExtractError = (exception) => {
	if (!exception.Errors) return false;
	let error = false;
	const errorKeys = Object.keys(exception.Errors);
	if (errorKeys.length > 0) {
		error = exception.Errors[errorKeys[0]][0].message;
	}
	return error;
};

export const fetchApi = (endPoint, payload = {}, method = 'get', headers = {}) => {
	return fetchival(`${apiConfig.url}${endPoint}`, {
		headers: _.pickBy({
			...headers,
		}, item => !_.isEmpty(item)),
	})[method.toLowerCase()](payload)
	.catch((e) => {
		if (e.response && e.response.ok) {
			console.log(e.response);
			e.response.json().then((json) => {
				if (json) throw json;
				throw e;
			});
		} else {
			throw e;
		}
	});
};

export const fetchRestApi = (endPoint, payload = {}, method = 'get', headers = {}) => {
	return fetch(`${apiConfig.url}${endPoint}`, {
		method: method.toUpperCase(),
		headers: headers,
		body: payload
		})
        .then(ApiUtils.checkStatus)
        .then(response => response.json())
        .catch(e => e);
};

