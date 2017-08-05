import React, { Component} from 'react';
import {
    StyleSheet,
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

import CustomFillButton from 'PaomAds/src/components/CustomFillButton';

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
        textAlign: 'left',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    label:{
        justifyContent:'center',
        alignItems:'center',
        textAlign: 'left',
        fontSize: 15,
        fontWeight: 'normal',
        marginTop: 10,
        marginBottom: 10
    },
    rightsubtitle:{
        textAlign: 'right',
        fontSize: 18,
        fontWeight: 'normal',
        paddingTop: 10,
        color: '#afafaf',
        alignSelf: 'stretch'
    },
    textInput: {
        borderWidth: 2,
        borderColor: '#afafaf',
        height: 40,
        padding: 10,
        marginTop: 20
    },
});

class SizeForm extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            isLoading: false,
            error: null,
            size_items: [
                { key: 1, label: '2XS', value:"2xs" },
                { key: 2, label: 'XS', value:"xs" },
                { key: 3, label: 'S', value:"s" },
            ],
            titles: ['SIZE', 'CHEST', 'WAIST', 'INSEAM'],
            values: [['33-35', '24-26', '27.75'], ['35-37', '26-28', '28.5'], ['33-35', '28-30', '29.25']]
        };
        this.state = this.initialState;
    }

    render() {
        let titles = [];
        this.state.titles.forEach((item, index) => {
            titles.push(
               <View key={'title'+index} style={{flex: 1}}>
                   <Text style={styles.title}>
                       {item}
                   </Text>
               </View>
           ) ;
        });
        let values = [];
        this.state.size_items.forEach((item, index) => {
           let row = [];
           this.state.values[index].forEach((value, val_index) => {
              row.push(
                  <View key={'value'+val_index} style={{flex: 1}}>
                      <Text style={styles.label}>
                          {value}
                      </Text>
                  </View>
              )
           });
           values.push(
               <View key={'row'+index} style={{flexDirection: 'row'}}>
                   <View style={{flex: 1}}>
                       <Text style={styles.title}>
                           {item.label}
                       </Text>
                   </View>
                   {row}
               </View>
           );
        });
        return (
            <View style={{flex:1, borderWidth: 1, borderColor: '#afafaf', marginTop: 20, padding: 10}}>
                <View style={{flexDirection: 'row'}}>
                    {titles}
                </View>
                {values}
            </View>
        );
    }
}

export default SizeForm;
