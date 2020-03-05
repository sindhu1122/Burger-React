import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Loader from '../../../components/UI/loader/loader';
import classes from './CotactData.css';
import axios from '../../../axios-order';

class CotactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        load: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { load: true } );
        const order = {
            igrediets: this.props.igrediets,
            price: this.props.price,
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { load: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { load: false } );
            } );
    }

    render () {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if ( this.state.load ) {
            form = <Loader />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default CotactData;