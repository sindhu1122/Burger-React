import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import Classes from './CheckoutSummary.css'
const checkoutsummary=(props)=>
{
    return(
        <div className={Classes.CheckoutSummary}>
            <h1>Nice combnation Enjoy!!</h1>
            <div style={{width:'100%',margin:
        'auto'}}>
            <Burger igrediets={props.igrediets}/>
            </div>
            <Button btnType="Danger"
            clicked={props.checkoutcancelled}
            >CANCEL</Button>
            <Button btnType="Success"
            clicked={props.checkoutcontinued}
            >CONTINUE</Button>
        </div>
    )
}
export default checkoutsummary