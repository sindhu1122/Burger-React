import React,{Component} from 'react'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import Cotactdata from '../Checkout/CotactData/CotactData'
//import * as actions from '../../store/actions/index'
class Checkout extends Component{
    
   
    checkoutCancelledHandler=()=>
    {
        this.props.history.goBack()
    }
    checkoutContinueHandler=()=>
    {
        this.props.history.replace('/checkout/contact-data');
    }
    render()
    {
        let summary=<Redirect to="/"/>
    
        if(this.props.igs){
            const purchaseRedirect=this.props.purchased?<Redirect to="/"/>:null
            summary=(
                <div>
                    {purchaseRedirect}
                <CheckoutSummary 
                igrediets={this.props.igs}
                checkoutcancelled={this.checkoutCancelledHandler}
                checkoutcontinued={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path+'/contact-data'} 
                component={Cotactdata}/>
                </div>
            )
        }
        return summary
    }
}
const mapStateToProps= state=>
{
    return{
    igs:state.burgerBuilder.igrediets,
    purchased:state.order.purchased
}
}


export default connect(mapStateToProps)( Checkout)