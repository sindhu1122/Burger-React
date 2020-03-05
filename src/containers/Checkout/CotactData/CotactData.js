import React, { Component } from 'react';
import {connect} from 'react-redux'
import Button from '../../../components/UI/Button/Button';
import Loader from '../../../components/UI/loader/loader';
import classes from './CotactData.css';
import axios from '../../../axios-order';
import Iput from '../../../components/UI/Iput/Iput'
class CotactData extends Component {
    state = {
        orderForm:
        {
            
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your name'
                    },
                    value:''
                } ,
                street: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your street'
                    },
                    value:''
                } ,
                zipCode: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your ZIP CODE'
                    },
                    value:''
                } ,
                country: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your coutry'
                    },
                    value:''
                } ,
                email: {
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your mail-id'
                    },
                    value:''
                } ,
                deliveryMethod: {
                    elementType:'select',
                    elementConfig:{
                       options:[
                           {value:'fastest',displayValue:'Fastest'},
                       {value:'cheapest',displayValue:'Cheapest'}
                    ]
                    },
                    value:''
                } ,

        },
        load:false
    }
    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { load: true } );
        const order = {
            igrediets: this.props.igs,
            price: this.props.price,
            
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
    inputChangeHandler=(event)=>
    {

    }

    render () {
        const formElementsArray=[];
        for(let key in this.state.orderForm)
        {
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (
            <form>
                
                {formElementsArray.map(formElement=>(
                    <Iput 
                    key={formElement.id}
                    elementType= {formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={this.inputChangeHandler}/>
                ))}

                
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
const mapStateToProps=state=>
{
    return{
    igs:state.igrediets,
    price:state.totalPrice
}
}
export default connect(mapStateToProps)( CotactData);