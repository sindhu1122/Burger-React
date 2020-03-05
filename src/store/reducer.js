import * as actionTypes from './action'
const initialState= {
    igrediets:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice:4
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
        default:
            return state
    }
}
export default reducer;