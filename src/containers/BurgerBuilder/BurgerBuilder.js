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
import * as actionTypes from '../../store/action'

class BurgerBuilder extends Component
{
    
    state={
        
       
        purchasing:false,
        load:false,
        error:false
    }
    componentDidMount(){
        console.log(this.props)
        // axios.get('https://react-my-burger-5d54d.firebaseio.com/igrediets.json')
        // .then(response=>{
        //     this.setState({igrediets:response.data})
        // } )
        // .catch(error=>{
        //     this.setState({error:true})
        // })
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
    //     //alert("YaaY!")
    // //     this.setState({load:true})
    // //     const order=
    // //     {
    // //         igrediets:this.state.igrediets,
    // //         price:this.state.totalPrice,
    // //         customer:{
    // //             name:'Mohitha',
    // //             address:
    // //             {
    // //                 street:'x strret',
    // //                 zipcode:'517503',
    // //                 country:'India'
    // //             },
    // //             email:'moh@gmail.com'
    // //         },
    // //         ==ethod:'fastest'
    // //     }
    // //     axios.post('/orders.json',order)
    // //     .then(response=>{
    // //         this.setState({load:false,purchasing:false})
    // //     })
    // //     .catch(error=>{
    // //         this.setState({load:false,purchasing:false})
    // //     });
    // const queryParams=[];
    // for(let i in this.state.igrediets)
    // {
    //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.igrediets[i]))
    // }
    // queryParams.push('price='+this.state.totalPrice)
    // const queryStrig=queryParams.join('&')
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
    // addIngredientHandler=(type)=>
    // {
    //     const count=this.state.igrediets[type];
    //     const updatecount=count+1
    //     const updateingredient={
    //         ...this.state.igrediets
    //     }
    //     updateingredient[type]=updatecount;
    //     const priceAddition=ING_RATE[type]
    //     const oldPrice=this.state.totalPrice;
    //     const newPrice=oldPrice+priceAddition
    //     this.setState({totalPrice:newPrice,igrediets:updateingredient})
    //     this.updatePurchaseState(updateingredient)

    // }
    // removeIngredientHandler=(type)=>
    // {
    //     const count=this.state.igrediets[type];
    //     let updatecount=0
    //     let newPrice=this.state.totalPrice
    //     if(count>0){
    //         updatecount=count-1}
    //     const updateingredient={
    //         ...this.state.igrediets
    //     }
    //     updateingredient[type]=updatecount;
    //     const priceAddition=ING_RATE[type]
    //     const oldPrice=this.state.totalPrice;
    //     if(count>0)
    //     newPrice=oldPrice-priceAddition
    //     this.setState({totalPrice:newPrice,igrediets:updateingredient})
    //     this.updatePurchaseState(updateingredient)
    // }
    render()
    {
        let orderSummary=null
        
    
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Loader />
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
    if(this.state.load)
        {
            orderSummary=<Loader/>
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
        igs:state.igrediets,
        price:state.totalPrice
    }
}
const mapDispatchToProps= dispatch=>
{
    return{
        oIgredietadded:(igame)=>dispatch({type:actionTypes.ADD_INGREDIENT,igredietame:igame}),
        oIgredietremoved:(igame)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,igredietame:igame})
    }
}
export default connect(mapStateToProps,mapDispatchToProps )(Errorhadler(BurgerBuilder,axios));