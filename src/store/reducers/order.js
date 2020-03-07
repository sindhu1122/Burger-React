import * as actionTypes from '../actions/actionTypes'
const initialState= {
    orders:[],
    load:false,
    purchased:false
}
const reducer=(state=initialState ,action)=>{
    switch(action.type)
    {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const ewOrder={
                ...action.orderData,
                id:action.orderId
            }
            return{
                ...state,
                load:false,
                purchased:true,
                orders:state.orders.concat(ewOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                load:false
            }
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased:false
            }
        default:
            return state
    }
}
export default reducer