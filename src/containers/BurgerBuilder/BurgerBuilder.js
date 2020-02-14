import React,{ Component } from "react";
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger' 
import BuildCotrols from '../../components/Burger/BuildCotrols/BuildCotrols'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const ING_RATE={
    salad:0.5,
    cheese:0.4,
    meat:2.5,
    bacon:0.7
}
class BurgerBuilder extends Component
{
    
    state={
        igrediets:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchaseable:false,
        purchasing:false
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
        alert("YaaY!")
    }
    updatePurchaseState(ingredients)
    {
    
        const sum=Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey]
        }).reduce((sum,el)=>{
            return sum+el
        },0)
        this.setState({purchaseable:sum>0})
    }
    addIngredientHandler=(type)=>
    {
        const count=this.state.igrediets[type];
        const updatecount=count+1
        const updateingredient={
            ...this.state.igrediets
        }
        updateingredient[type]=updatecount;
        const priceAddition=ING_RATE[type]
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition
        this.setState({totalPrice:newPrice,igrediets:updateingredient})
        this.updatePurchaseState(updateingredient)

    }
    removeIngredientHandler=(type)=>
    {
        const count=this.state.igrediets[type];
        let updatecount=0
        let newPrice=this.state.totalPrice
        if(count>0){
            updatecount=count-1}
        const updateingredient={
            ...this.state.igrediets
        }
        updateingredient[type]=updatecount;
        const priceAddition=ING_RATE[type]
        const oldPrice=this.state.totalPrice;
        if(count>0)
        newPrice=oldPrice-priceAddition
        this.setState({totalPrice:newPrice,igrediets:updateingredient})
        this.updatePurchaseState(updateingredient)
    }
    render()
    {
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.igrediets}
                        purchaseCanceled={this.purchaseCancelHandler}
                        price={this.state.totalPrice.toFixed(2)}
                        purchaseContinue={this.purchaseContinueHandler}>
                    
                    </OrderSummary>
                </Modal>
                <Burger
                igrediets={this.state.igrediets}>

                </Burger>
                <BuildCotrols
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                purchaseable={this.state.purchaseable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}>
                </BuildCotrols>
            </Aux>
        )
    }
}
export default BurgerBuilder;