import React, { Component, PropTypes } from 'react';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import {
	TouchableWithoutFeedback,
	StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
	Container,
	Header,
	Title,
	InputGroup,
	Input,
	Button,
	Icon,
	Text,
	View,
	Spinner,
} from 'native-base';

import FormMessage from 'PaomAds/src/components/FormMessage';
import CustomFillButton from 'PaomAds/src/components/CustomFillButton';
import CustomNoFillButton from 'PaomAds/src/components/CustomNoFillButton';
import Nav from 'PaomAds/src/components/Nav';
import BannerImage from 'PaomAds/src/components/BannerImage';

import * as session from 'PaomAds/src/services/session';
import * as api from 'PaomAds/src/services/api';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    title:{
        justifyContent:'center',
        alignItems:'center',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'normal',
        paddingTop: 20
    },
    textInput: {
        borderWidth: 2,
        borderColor: '#afafaf',
        height: 50,
        padding: 10,
        marginTop: 20
    },
    alink: {
        fontSize: 15,
        textAlign: 'right',
        paddingTop: 5
    },
    line: {
        width: '100%',
        height: 2,
        borderWidth: 1,
        borderColor: '#afafaf',
        marginTop: 20,
        marginBottom: 20
    },
	error: {
		color: 'red',
		marginBottom: 20,
	},
});

class Login extends Component {
	static propTypes = {
		navigator: PropTypes.shape({
			getCurrentRoutes: PropTypes.func,
			jumpTo: PropTypes.func,
		}),
	}

	constructor(props) {
		super(props);

		this.initialState = {
			isLoading: false,
			error: null,
			email: 'goldbyol@outlook.com',
			password: 'gold12345',
		};
		this.state = this.initialState;
	}

	onPressLogin() {
		this.setState({
			isLoading: true,
			error: '',
		});
		dismissKeyboard();

		session.authenticate(this.state.email, this.state.password).then(() => {
		    this.setState(this.initialState);
            const routeStack = this.props.navigator.getCurrentRoutes();
			this.props.navigator.jumpTo(routeStack[2]);
		})
		.catch((exception) => {
			// Displays only the first error message
			const error = api.exceptionExtractError(exception);
			this.setState({
				isLoading: false,
				...(error ? { error } : {}),
			});

			if (!error) {
				throw exception;
			}
		});
	}

	onPressBack() {
		const routeStack = this.props.navigator.getCurrentRoutes();
		this.props.navigator.jumpTo(routeStack[0]);
	}

    forgotUsername(){

    }

    forgotPassword(){

    }

    signup(){

    }

	renderError() {
		if (this.state.error) {
			return (
				<Text
					style={styles.error}
				>
					{this.state.error}
				</Text>
			);
		}
	}

	render() {
		return (
                <View style={{flex:1}}>
                    <Nav type="default" />
					<TouchableWithoutFeedback
						onPress={dismissKeyboard}
					>
                        <ScrollView style={styles.container}>
                            <BannerImage image={require('../../../../images/banner.png')} style={{height: 150}} />
							{this.state.error ? (
								<FormMessage message={this.state.error} />
							) : null}
                            <Text style={styles.title}>
                                Let's Do It
                            </Text>
                            <View style={{ paddingLeft: 30, paddingRight: 30 }}>
                                <Input
                                    style={styles.textInput}
                                    placeholder="UserName"
                                    keyboardType="email-address"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onChangeText={email => this.setState({ email })}
                                    value={this.state.email}
                                />
                                <TouchableOpacity onPress = {() => this.forgotUsername()}>
                                    <Text style={styles.alink}>
                                        Forgot Username?
                                    </Text>
                                </TouchableOpacity>
                                <Input
                                    style={styles.textInput}
                                    placeholder="Password"
                                    onChangeText={password => this.setState({ password })}
                                    value={this.state.password}
                                    secureTextEntry
                                />
                                <TouchableOpacity onPress = {() => this.forgotPassword()} style={{marginBottom: 20}}>
                                    <Text style={styles.alink}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>
                                {this.state.isLoading ? (
                                    <Spinner size="small" color="#000000" />
                                ) : (
                                    <CustomFillButton
                                        onPress={() => this.onPressLogin()}
                                        text="SIGN IN"
                                    />
                                )}
                                <View style={styles.line} />
                                <CustomNoFillButton
                                    onPress = {() => this.signup()}
                                    text = "SIGN UP" />
                            </View>
                        </ScrollView>
					</TouchableWithoutFeedback>
				</View>
		);
	}
}

export default Login;
