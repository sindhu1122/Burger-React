import React from 'react'
import {connect} from 'react-redux'
import axios from '../../axios-order'
import Order from '../../components/Order/Order'
import { Component } from 'react';
import Loader from '../../components/UI/loader/loader'
import ErrorHadler from '../../hoc/Errorhadler/Errorhadler'
import * as actions from '../../store/actions/index'
class Orders extends Component
{
    state={
        orders:[],
        load:true
    }
    componentDidMount()
    {
        this.props.onFetchOrders(this.props.token,this.props.userId)
    }
    render()
    {
        let orders=<Loader/>
        if(this.props.load)
        {
            orders=this.props.orders.map(order=>(
                <Order 
                key={order.id}
                igrediets={order.igrediets}
                price={+order.price}/>
            ))
        }
        return(
                <div>
                    {orders}
                   
                </div>
        )
    }
}
const mapStateToProps=state=>
{
    return{
        orders:state.order.orders,
        load:state.order.load,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onFetchOrders:(token,userId)=>dispatch(actions.fetchOrders(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)( ErrorHadler(Orders,axios));