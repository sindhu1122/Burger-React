import * as actionTypes from './actionTypes'
import axios from '../../axios-order'
export const purchaseSuccess=(id,orderData)=>
{
    return{
            type:actionTypes.PURCHASE_BURGER_SUCCESS,
            orderId:id,
            orderData:orderData
    }
}
export const purchaseFail=(error)=>
{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
        
    }
}
export const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger=(orderData,token)=>
{
    return dispatch =>{
        dispatch(purchaseBurgerStart())
        axios.post( '/orders.json?auth='+token, orderData )
            .then( response => {
                dispatch(purchaseSuccess(response.data.name,orderData))
                
            } )
            .catch( error => {
                dispatch(purchaseFail(error))
                
            } );
    }
}
export const purchaseInit=()=>
{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}
export const fetchOrderSuccess=(orders)=>
{
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}
export const fetchOrdersFail=(orders)=>
{
    return{
        type:actionTypes.FETCH_ORDERS_FAIL,
        orders:orders
    }
}
export const fetchOrderStart=()=>
{
    return{
        type:actionTypes.FETCH_ORDERS_INIT
    }
}
export const fetchOrders=(token,userId)=>
{
    return dispatch=>{
        dispatch(fetchOrderStart())
        const queryparams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'
        axios.get('/orders.json?auth='+queryparams).then(res=>{
            const fetchedOrders=[]
            for(let key in res.data)
            {
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            dispatch(fetchOrderSuccess(fetchedOrders))
           
        })
        .catch(error=>{
            dispatch(fetchOrdersFail(error))
    })
}
}