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
import Nav from 'PaomAds/src/components/Nav';

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
    error: {
        color: 'red',
        marginBottom: 20,
    },
});

class Like extends Component {
    static propTypes = {
        navigator: PropTypes.shape({
            getCurrentRoutes: PropTypes.func,
            jumpTo: PropTypes.func,
        }),
    };

    constructor(props) {
        super(props);

        this.initialState = {
            isLoading: false,
            error: null,
        };
        this.state = this.initialState;
    }

    onPressLogin() {
        this.setState({
            isLoading: true,
            error: '',
        });
        dismissKeyboard();
    }

    onPressBack() {
        const routeStack = this.props.navigator.getCurrentRoutes();
        this.props.navigator.jumpTo(routeStack[2]);
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
                <Nav type="back" gotoBack={() => this.onPressBack()} />
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>
                        Like
                    </Text>
                </ScrollView>
            </View>
        );
    }
}

export default Like;
