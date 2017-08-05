import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	Image,
	ScrollView,
	Text
} from 'react-native';
import {
	Container,
	Header,
	Title,
	Button,
	View,
} from 'native-base';
import Selectbox from 'react-native-selectbox'

import Nav from 'PaomAds/src/components/Nav';
import CustomFillButton from 'PaomAds/src/components/CustomFillButton';
import CustomNoFillButton from 'PaomAds/src/components/CustomNoFillButton';
import ShippingForm from 'PaomAds/src/components/ShippingForm';
import SizeForm from 'PaomAds/src/components/SizeForm';

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
        fontSize: 25,
        fontWeight: 'normal',
    },
	subtitle: {
    	paddingTop: 10,
		fontSize: 15,
        textAlign: 'left',
	},
	button: {
		marginTop: 20,
		alignSelf: 'center',
		width: 150,
	},
	select: {
        borderWidth: 2,
        borderColor: '#afafaf',
	},
	select_title: {
    	textAlign: 'right',
		fontSize: 15,
		marginTop: 20,
		marginBottom: 5
	}
});

class Main extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            isLoading: false,
			show_item: false,
            error: null,
            product_image: 'https://images.paom.com/epaomdev/15449_132203.png',
			product_title: 'T-shirt',
			product_price: 3800,
			designed_object_title: 'Cotton Tee',
			designer_display_name: 'The Processing Foundation',
			product_content: 'This is sample product to test for now. This is sample product to test for now. This is sample product to test for now.',
        	size_items: [
                { key: 0, label: 'Select Size', value:"" },
                { key: 1, label: '2XS', value:"2xs" },
                { key: 2, label: 'XS', value:"xs" },
                { key: 3, label: 'S', value:"s" },
            ],
			selected_item: { key: 0, label: 'Select Size', value:"" }
        };
        this.state = this.initialState;
    }

    componentDidMount() {
		this.getProduct();
	}

	getProduct(){
    	console.log('get Product');
        session.get_product().then((res) => {
            console.log(res);
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

    watchAD(){

	}

    gotoHelp(){
        const routeStack = this.props.navigator.getCurrentRoutes();
        this.props.navigator.jumpTo(routeStack[3]);
    }

    gotoLike(){
        const routeStack = this.props.navigator.getCurrentRoutes();
        this.props.navigator.jumpTo(routeStack[4]);
    }

	getItem(){
    	this.setState({
			show_item: true
		});
	}

    _onChange = (item) => {
        // the full item as defined in the list of items is passed to the onChange handler to give full
        // flexibility on what to do...
		this.setState({
			selected_item: item
		});
    }

    render(){
        const routeStack = this.props.navigator.getCurrentRoutes();
        return (
			<View style={{flex:1}}>
				<Nav type="main" gotoHelp={() => this.gotoHelp()} gotoLike={() => this.gotoLike()} />
				<ScrollView style={styles.container}>
					<View style={{paddingLeft: 30, paddingRight: 30}}>
						<Image
							resizeMode="stretch"
							source={{uri: `${this.state.product_image}`}}
							style={{width: '100%', height: 300}}
						/>
						<Text style={styles.title}>
							{this.state.product_title}
						</Text>
						<Text style={styles.subtitle}>
							{this.state.product_price}pts
						</Text>
						<Text style={styles.subtitle}>
							{this.state.designed_object_title}, by {this.state.designer_display_name}
						</Text>
						<Text style={styles.subtitle}>
							{this.state.product_content}
						</Text>
						<View style={{marginTop: 20, marginBottom: 20}}>
							<CustomNoFillButton
								onPress = {() => this.watchAD()}
								text = "WATCH AD, +20pts" />
						</View>
						<CustomFillButton
							style={{marginTop: -20}}
							onPress = {() => this.getItem()}
							text = "GET ITEM!" />
						<Text style={styles.select_title}>
							View Sizing Chart
						</Text>
						<Selectbox
							style={styles.select}
							selectedItem={this.state.selected_item}
							onChange={this._onChange}
							items={this.state.size_items} />
						<SizeForm/>
						<ShippingForm/>
					</View>
				</ScrollView>
			</View>
        );
	}
}

Main.propTypes = {
	navigator: PropTypes.shape({
		getCurrentRoutes: PropTypes.func,
		jumpTo: PropTypes.func,
	}),
};

export default Main;
