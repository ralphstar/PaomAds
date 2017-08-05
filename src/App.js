/* global XMLHttpRequest */

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import { Provider } from 'react-redux';

import store from 'PaomAds/src/store';
import * as session from 'PaomAds/src/services/session';
import * as routeHistoryActions from 'PaomAds/src/services/routeHistory/actions';
import Splash from 'PaomAds/src/scenes/Splash';
import Main from 'PaomAds/src/scenes/Main';
import Login from 'PaomAds/src/scenes/Main/scenes/Login';
import Register from 'PaomAds/src/scenes/Main/scenes/Register';
import Help from 'PaomAds/src/scenes/Main/scenes/Help';
import Like from 'PaomAds/src/scenes/Main/scenes/Like';
// This is used in order to see requests on the Chrome DevTools
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
	GLOBAL.originalXMLHttpRequest :
	GLOBAL.XMLHttpRequest;

const transition = Navigator.SceneConfigs.HorizontalSwipeJump;
transition.gestures = null;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eee',
	},
});

const routeStack = [
	{ name: 'Login', component: Login },
	{ name: 'Register', component: Register },
    { name: 'Main', component: Main },
    { name: 'Help', component: Help },
    { name: 'Like', component: Like },
];

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			initialRoute: null,
		};
	}

	componentDidMount() {
		// Waits for the redux store to be populated with the previously saved state,
		// then it will try to auto-login the user.
		const unsubscribe = store.subscribe(() => {
			if (store.getState().services.persist.isHydrated) {
				unsubscribe();
				this.autoLogin();
			}
		});
	}

	autoLogin() {
		// session.refreshToken().then(() => {
		// 	this.setState({ initialRoute: routeStack[2] });
		// }).catch(() => {
		// 	this.setState({ initialRoute: routeStack[0] });
		// });
        this.setState({ initialRoute: routeStack[0] });
	}

	renderContent() {
		if (!this.state.initialRoute) {
			return <Splash />;
		}

		return (
			<Navigator
				initialRoute={this.state.initialRoute}
				initialRouteStack={routeStack}
				configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
				onWillFocus={route => store.dispatch(routeHistoryActions.push(route))}
				renderScene={(route, navigator) =>
					<route.component route={route} navigator={navigator} {...route.passProps} />
				}
			/>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<Provider store={store}>
					{this.renderContent()}
				</Provider>
			</View>
		);
	}
}

export default App;
