import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
} from 'react-native';

export default class CustomFillButton extends Component {
    constructor(props) {
        super(props);
        this.state = { pressStatus: false };
    }
    _onHideUnderlay(){
        this.setState({ pressStatus: false });
    }
    _onShowUnderlay(){
        this.setState({ pressStatus: true });
    }
    render(){
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    activeOpacity={1}
                    style={ this.state.pressStatus ? styles.buttonPress : styles.button }
                    onHideUnderlay={this._onHideUnderlay.bind(this)}
                    onShowUnderlay={this._onShowUnderlay.bind(this)}
                    onPress={this.props.onPress.bind(this)}
                >
                    <Text style={ this.state.pressStatus ? styles.welcomePress : styles.welcome }>{this.props.text}</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff'
    },
    welcomePress: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#00fa8e'
    },
    button: {
        width: '100%',
        borderColor: '#00fa8e',
        backgroundColor: '#00fa8e',
        borderWidth: 2,
        borderRadius: 0,
    },
    buttonPress: {
        width: '100%',
        borderColor: '#00fa8e',
        borderWidth: 2,
        borderRadius: 0,
    },
});