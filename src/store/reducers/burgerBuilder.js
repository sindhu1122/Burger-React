import * as actionTypes from '../actions/actionTypes'
const initialState= {
    igrediets:null,
    totalPrice:4,
    error:false
    
}
const ING_RATE={
    salad:0.5,
    cheese:0.4,
    meat:2.5,
    bacon:0.7
}
const reducer=(state =initialState,action)=>
{
    switch(action.type)
    {
        case actionTypes.ADD_INGREDIENT:
            return{

                ...state,
                igrediets:{
                    ...state.igrediets,
                    [action.igredietame]:state.igrediets[action.igredietame]+1
                },
                totalPrice:state.totalPrice+ING_RATE[action.igredietame]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{

                ...state,
                igrediets:{
                    ...state.igrediets,
                    [action.igredietame]:state.igrediets[action.igredietame]-1
                },
                totalPrice:state.totalPrice-ING_RATE[action.igredietame]
            }
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                igrediets:action.igrediets,
                error:false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error:true
            }
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                load:true
            }
        default:
            return state
    }
}
export default reducer;