import * as actionTypes from './actionTypes';

export const initialState = {
	user: {
		id: null,
		username: null,
		points: null,
		display_name: null,
		following_count: null,
		avatar: null,
		token: null
	},
	product: {
		id: null
	}
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return {
				...action.session,
			};
		default:
			return state;
	}
};
