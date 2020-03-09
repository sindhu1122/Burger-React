import React from 'react';
import classes from './BuildCotrols.css'
import Buildcotrol from './BuildCotrol/BuildCotrol'
const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
]
const buildCotrols=(props)=>
(
    <div className={classes.BuildCotrols}>
        <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
         {controls.map(ctrl=>(
             <Buildcotrol 
              key={ctrl.label} 
              label={ctrl.label}
              added={()=>props.ingredientAdded(ctrl.type)}
              remove={()=>props.ingredientRemoved(ctrl.type)}/>
         ))}
            <button 
            className={classes.OrderButton}
            disabled={!props.purchaseable} onClick={props.ordered}> {props.isAuth?'CONFIRM ORDER':'SIGNUP TO ORDER'}</button>
    </div>
)
export default buildCotrols;