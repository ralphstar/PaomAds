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
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'normal',
        paddingTop: 20
    },
    subtitle:{
        justifyContent:'center',
        alignItems:'center',
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'normal',
        paddingTop: 10,
        color: '#afafaf'
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

class ShippingForm extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            isLoading: false,
            error: null,
            full_name: '',
            address1: '',
            address2: '',
            city: '',
            zip_code: '',
            state: '',
            country: '',
            phone: '',
            email: '',
            shipping_total: 1200,
            my_points: 4,
            product_title: 'SHIRT NAME',
            product_size: 'L'
        };
        this.state = this.initialState;
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Text style={styles.title}>
                    Shipping Info
                </Text>
                <Input
                    style={styles.textInput}
                    placeholder="Full Name"
                    onChangeText={full_name => this.setState({ full_name })}
                />
                <Input
                    style={styles.textInput}
                    placeholder="Shipping Address Line 1"
                    onChangeText={address1 => this.setState({ address1 })}
                />
                <Input
                    style={styles.textInput}
                    placeholder="Shipping Address Line 2"
                    onChangeText={address2 => this.setState({ address2 })}
                />
                <Input
                    style={styles.textInput}
                    placeholder="City"
                    onChangeText={city => this.setState({ city })}
                />
                <Input
                    style={styles.textInput}
                    placeholder="Zip / Postal"
                    onChangeText={zip_code => this.setState({ zip_code })}
                />
                <Input
                    style={styles.textInput}
                    placeholder="State"
                    onChangeText={state => this.setState({ state })}
                />
                <Input
                    style={styles.textInput}
                    placeholder="Country"
                    onChangeText={country => this.setState({ country })}
                />
                <Input
                    style={styles.textInput}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    onChangeText={phone => this.setState({ phone })}
                />
                <Input
                    style={styles.textInput}
                    placeholder="E-Mail Address"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={email => this.setState({ email })}
                />
                <Text style={styles.title}>
                    Confirmation
                </Text>
                <Text style={styles.subtitle}>
                    {this.state.product_title}, size {this.state.product_size}
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text style={styles.subtitle}>
                            Total..........................................
                        </Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.rightsubtitle}>{this.state.shipping_total}pts</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Text style={styles.subtitle}>
                            Balance after purchase............
                        </Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.rightsubtitle}>{this.state.my_points}pts</Text>
                    </View>
                </View>
                <View style={{marginTop: 25, marginBottom: 25}}>
                {this.state.isLoading ? (
                    <Spinner size="small" color="#000000" />
                ) : (
                    <CustomFillButton
                        onPress={() => this.onPressLogin()}
                        text="SUBMIT"
                    />
                )}
                </View>
            </View>
        );
    }
}

export default ShippingForm;
