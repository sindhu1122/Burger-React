import React,{ Component } from "react";
import {connect} from 'react-redux'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger' 
import BuildCotrols from '../../components/Burger/BuildCotrols/BuildCotrols'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Loader from '../../components/UI/loader/loader'
import Errorhadler from '../../hoc/Errorhadler/Errorhadler'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component
{
    
    state={
        
       
        purchasing:false,
       
    }
    componentDidMount(){
        console.log(this.props)
        this.props.oIitIgrediets()
        
    }
    purchaseHandler=()=>
    {
        this.setState({purchasing:true})
    }
    purchaseCancelHandler=()=>
    {
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=>
    {
    this.props.onInitpurchase()
    this.props.history.push('/checkout')
     }
    updatePurchaseState(ingredients)
    {
    
        const sum=Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey]
        }).reduce((sum,el)=>{
            return sum+el
        },0)
        return sum>0
    }
    
    render()
    {
        let orderSummary=null
        
    
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Loader />
    if(this.props.igs)
    {
        burger=(
            <Aux>
        <Burger
        igrediets={this.props.igs}>
    
        </Burger>
        <BuildCotrols
        ingredientAdded={this.props.oIgredietadded}
        ingredientRemoved={this.props.oIgredietremoved}
        purchaseable={this.updatePurchaseState(this.props.igs)}
        ordered={this.purchaseHandler}
        price={this.props.price}/>

        </Aux>
        )
        orderSummary=<OrderSummary 
        ingredients={this.props.igs}
        purchaseCanceled={this.purchaseCancelHandler}
        price={this.props.price.toFixed(2)}
        purchaseContinue={this.purchaseContinueHandler}/>
    
    }
   
    
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}
const mapStateToProps=state=>
{
    return{
        igs:state.burgerBuilder.igrediets,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error
    }
}
const mapDispatchToProps= dispatch=>
{
    return{
        oIgredietadded:(igame)=>dispatch(actions.addIgrediet(igame)),
        oIgredietremoved:(igame)=>dispatch(actions.removeIgrediet(igame)),
        oIitIgrediets:()=>dispatch(actions.iitIgrediets()),
        onInitpurchase:()=>dispatch(actions.purchaseInit())

    }
}
export default connect(mapStateToProps,mapDispatchToProps )(Errorhadler(BurgerBuilder,axios));