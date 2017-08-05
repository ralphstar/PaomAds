import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    View,
} from 'react-native';
var {height, width} = Dimensions.get('window');
export default class BannerImage extends Component {
    render() {
        const resizeMode = 'center';
        const text1 = '1. WATCH ADS';
        const text2 = '2. EARN POINTS';
        const text3 = '3. GET CLOTHES';

        return (
            <Image
                resizeMode="stretch"
                style = {{
                    width: width,
                    height: 200,
                }}
                source = {this.props.image}>
                <Text
                    style={{
                        backgroundColor: 'transparent',
                        textAlign: 'left',
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: '#ffffff',
                        paddingLeft: 70,
                        paddingTop: 40,
                    }}
                >
                    {text1}
                </Text>
                <Text
                    style={{
                        backgroundColor: 'transparent',
                        textAlign: 'left',
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: '#ffffff',
                        paddingLeft: 70,
                        paddingTop: 10,
                    }}
                >
                    {text2}
                </Text>
                <Text
                    style={{
                        backgroundColor: 'transparent',
                        textAlign: 'left',
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: '#ffffff',
                        paddingLeft: 70,
                        paddingTop: 10,
                    }}
                >
                    {text3}
                </Text>
            </Image>
        );
    }
}