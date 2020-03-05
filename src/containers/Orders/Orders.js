import React from 'react'
import axios from '../../axios-order'
import Order from '../../components/Order/Order'
import { Component } from 'react';
import ErrorHadler from '../../hoc/Errorhadler/Errorhadler'
class Orders extends Component
{
    state={
        orders:[],
        load:true
    }
    componentDidMount()
    {
        axios.get('/orders.json').then(res=>{
            const fetchedOrders=[]
            for(let key in res.data)
            {
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            this.setState({load:false,orders:fetchedOrders})
        })
        .catch(err=>{
            this.setState({load:false})
        })
    }
    render()
    {
        return(
                <div>
                    {this.state.orders.map(order=>(
                        <Order 
                        key={order.id}
                        igrediets={order.igrediets}
                        price={+order.price}/>
                    ))}
                   
                </div>
        )
    }
}
export default ErrorHadler(Orders,axios);