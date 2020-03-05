import React,{ Component } from "react";
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger' 
import BuildCotrols from '../../components/Burger/BuildCotrols/BuildCotrols'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Loader from '../../components/UI/loader/loader'
import Errorhadler from '../../hoc/Errorhadler/Errorhadler'
const ING_RATE={
    salad:0.5,
    cheese:0.4,
    meat:2.5,
    bacon:0.7
}
class BurgerBuilder extends Component
{
    
    state={
        igrediets:null,
        totalPrice:4,
        purchaseable:false,
        purchasing:false,
        load:false,
        error:false
    }
    componentDidMount(){
        console.log(this.props)
        axios.get('https://react-my-burger-5d54d.firebaseio.com/igrediets.json')
        .then(response=>{
            this.setState({igrediets:response.data})
        } )
        .catch(error=>{
            this.setState({error:true})
        })
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
        //alert("YaaY!")
    //     this.setState({load:true})
    //     const order=
    //     {
    //         igrediets:this.state.igrediets,
    //         price:this.state.totalPrice,
    //         customer:{
    //             name:'Mohitha',
    //             address:
    //             {
    //                 street:'x strret',
    //                 zipcode:'517503',
    //                 country:'India'
    //             },
    //             email:'moh@gmail.com'
    //         },
    //         deliveryMethod:'fastest'
    //     }
    //     axios.post('/orders.json',order)
    //     .then(response=>{
    //         this.setState({load:false,purchasing:false})
    //     })
    //     .catch(error=>{
    //         this.setState({load:false,purchasing:false})
    //     });
    const queryParams=[];
    for(let i in this.state.igrediets)
    {
        queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.igrediets[i]))
    }
    queryParams.push('price='+this.state.totalPrice)
    const queryStrig=queryParams.join('&')
    this.props.history.push({
        pathname:'/checkout',
        search:'?'+queryStrig
    })
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
        let orderSummary=null
        
    
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Loader />
    if(this.state.igrediets)
    {
        burger=(
            <Aux>
        <Burger
        igrediets={this.state.igrediets}>
    
        </Burger>
        <BuildCotrols
        ingredientAdded={this.addIngredientHandler}
        ingredientRemoved={this.removeIngredientHandler}
        purchaseable={this.state.purchaseable}
        ordered={this.purchaseHandler}
        price={this.state.totalPrice}/>

        </Aux>
        )
        orderSummary=<OrderSummary 
        ingredients={this.state.igrediets}
        purchaseCanceled={this.purchaseCancelHandler}
        price={this.state.totalPrice.toFixed(2)}
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
export default Errorhadler(BurgerBuilder,axios);