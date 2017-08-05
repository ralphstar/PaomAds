import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';

export default class Nav extends Component {

    default(){
        return (
            <View  style={styles.center_container}>
                <Image source ={require('../../images/logo.png')} resizeMode = "contain" style={{width:100, height:30}} />
            </View>
        );
    }

    main(){
        return (
            <View  style={styles.container}>
                <TouchableOpacity onPress ={() => this.props.gotoHelp()}>
                    <Image source={require('../../images/icons/question_mark.png')} style= {{width: 25, height: 25, marginLeft: 10, marginTop: 5}} />
                </TouchableOpacity>
                <Image source ={require('../../images/logo.png')} resizeMode = "contain" style={{width:100, height:30}} />
                <TouchableOpacity onPress ={() => this.props.gotoLike()}>
                    <Image source={require('../../images/icons/sun_rise_mark.png')} style= {{width: 25, height: 25, marginRight: 10, marginTop: 5}} />
                </TouchableOpacity>
            </View>
        );
    }

    back(){
        return (
            <View  style={styles.container}>
                <TouchableOpacity onPress ={() => this.props.gotoBack()}>
                    <Image source={require('../../images/icons/back.png')} style= {{width: 25, height: 25, marginLeft: 10, marginTop: 5}} />
                </TouchableOpacity>
                <Image source ={require('../../images/logo.png')} resizeMode = "contain" style={{width:100, height:30}} />
                <View/>
            </View>
        );
    }

    render() {
        if (this.props.type == "main"){
            return (
                <View>{this.main()}</View>
            )
        }
        else if (this.props.type == "default"){
            return (
                <View>{this.default()}</View>
            )
        }
        else{
            return (
                <View>{this.back()}</View>
            );}
    }
}

const styles = StyleSheet.create({
    container: {
        height:60,
        flexDirection:'row',
        paddingTop:10,
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor: '#fff',
        borderBottomWidth:1,
        borderColor:'rgba(0,0,0,0.1)'
    },
    center_container: {
        height:60,
        flexDirection:'row',
        paddingTop:10,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#fff',
        borderBottomWidth:1,
        borderColor:'rgba(0,0,0,0.1)'
    },
});