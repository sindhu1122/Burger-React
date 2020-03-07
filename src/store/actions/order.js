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
export const purchaseStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}
export const purchase=(orderData)=>
{
    return dispatch =>{
        dispatch(purchaseStart())
        axios.post( '/orders.json', orderData )
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