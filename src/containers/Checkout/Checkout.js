import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import Cotactdata from '../Checkout/CotactData/CotactData'
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
        return(
            <div>
                <CheckoutSummary 
                igrediets={this.props.igs}
                checkoutcancelled={this.checkoutCancelledHandler}
                checkoutcontinued={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path+'/contact-data'} 
                component={Cotactdata}/>
            </div>
        )
    }
}
const mapStateToProps= state=>
{
    return{
    igs:state.igrediets
}
}
export default connect(mapStateToProps)( Checkout)