import React, { Component } from 'react';
import {connect} from 'react-redux'
import Button from '../../../components/UI/Button/Button';
import Loader from '../../../components/UI/loader/loader';
import classes from './CotactData.css';
import axios from '../../../axios-order';
import Iput from '../../../components/UI/Iput/Iput'
import * as actio from '../../../store/actions/index'
import ErrorHadler from '../../../hoc/Errorhadler/Errorhadler'
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
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                } ,
                street: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                } ,
                zipCode: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your ZIP CODE'
                    },
                    value:'',
                    validation:
                    {
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false,
                    touched:false
                } ,
                country: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your coutry'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                } ,
                email: {
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your mail-id'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                } ,
                deliveryMethod: {
                    elementType:'select',
                    elementConfig:{
                       options:[
                           {value:'fastest',displayValue:'Fastest'},
                       {value:'cheapest',displayValue:'Cheapest'}
                    ]
                    },
                    value:'fastest',
                    valid:true,
                    validation:{}
                } ,

        },
        formIsValid: false
    }
    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            igrediets: this.props.igs,
            price: this.props.price,
            orderData:formData,
            userId:this.props.useId
            
        }
        this.props.oOrderBurger(order,this.props.token)
        // axios.post( '/orders.json', order )
        //     .then( response => {
        //         this.setState( { load: false } );
        //         this.props.history.push('/');
        //     } )
        //     .catch( error => {
        //         this.setState( { load: false } );
        //     } );
    }
    checkValidity(value, rules) {
        let isValid = true;
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Iput 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if ( this.props.load ) {
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
    igs:state.burgerBuilder.igrediets,
    price:state.burgerBuilder.totalPrice,
    load:state.order.load,
    token:state.auth.token,
    useId:state.auth.userId

}
}
const mapDispatchToProps=dispatch=>{
    return{
    oOrderBurger:(orderData,token)=>dispatch(actio.purchase(orderData,token))
    }
    
}
export default connect(mapStateToProps,mapDispatchToProps)(ErrorHadler( CotactData,axios));