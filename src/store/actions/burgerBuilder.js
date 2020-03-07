import * as actionTypes from './actionTypes'
import axios from '../../axios-order'
export const addIgrediet=(ame)=>
{
    return{
        type:actionTypes.ADD_INGREDIENT,
        igredietame:ame
    }
}
export const removeIgrediet=(ame)=>
{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        igredietame:ame
    }
}
export const setIgrediets=(igrediets)=>
{
    return{
        type:actionTypes.SET_INGREDIENTS,
        igrediets:igrediets
    }
}
export const fetchIgredietsfailed=()=>
{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const iitIgrediets=()=>
{
    return dispatch=>{
        axios.get('https://react-my-burger-5d54d.firebaseio.com/igrediets.json')
        .then(response=>{
            dispatch(setIgrediets(response.data))
        } )
        .catch(error=>{
            dispatch(fetchIgredietsfailed())
        })

    }
}