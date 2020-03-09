import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';
const initialState= {
    igrediets:null,
    totalPrice:4,
    error:false,
    building:false
    
}
const ING_RATE={
    salad:0.5,
    cheese:0.4,
    meat:2.5,
    bacon:0.7
}
const addIgrediet = ( state, action ) => {
    const updatedIngredient = { [action.igredietame]: state.igrediets[action.igredietame] + 1 }
    const updatedIngredients = updateObject( state.igrediets, updatedIngredient );
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + ING_RATE[action.igredietame],
        building:true
    }
    return updateObject( state, updatedState );
};

const removeIgrediet = (state, action) => {
    const updatedIng = { [action.igredietame]: state.igrediets[action.igredietame] - 1 }
    const updatedIngs = updateObject( state.igrediets, updatedIng );
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - ING_RATE[action.igredietame],
        building:true
    }
    return updateObject( state, updatedSt );
};

const setIgrediets = (state, action) => {
    return updateObject( state, {
        igrediets:action.igrediets,
                error:false,
                totalPrice:4,
                building:false
    } );
};
const fetchIngredientsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT: return addIgrediet( state, action );
        case actionTypes.REMOVE_INGREDIENT: return removeIgrediet(state, action);
        case actionTypes.SET_INGREDIENTS: return setIgrediets(state, action);    
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default reducer;