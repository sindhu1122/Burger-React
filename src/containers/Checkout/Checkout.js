import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import Cotactdata from '../Checkout/CotactData/CotactData'
class Checkout extends Component{
    state={
        igrediets:null,
        price:0
    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const igrediets = {};
        let price =0
        for (let param of query.entries()) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                igrediets[param[0]] = +param[1];
            }
        }
        this.setState( { igrediets: igrediets, totalPrice: price } );
    }

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
                igrediets={this.state.igrediets}
                checkoutcancelled={this.checkoutCancelledHandler}
                checkoutcontinued={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path+'/contact-data'} 
                render={()=>(<Cotactdata igrediets={this.state.igrediets}
                price={this.state.totalPrice}{...this.props}/>)}/>
            </div>
        )
    }
}
export default Checkout