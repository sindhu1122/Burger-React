import React from 'react'
import classes from './Order.css'
const order=(props)=>{
    const igrediets=[];
    for(let igredietame in props.igrediets)
    {
        igrediets.push(
            {
                name:igredietame,
                amout:props.igrediets[igredietame]
            }
        )
    }
    const igredietOutput=igrediets.map(ig=>{
        return <span
        style={{textTransform:'capitalize',
                display:'inline-block',
                margin:'0 8px',
                border:'1 px solid #ccc',
                padding:'5px'
}}
         key={ig.name}>{ig.name} ({ig.amout})</span>
    })
    return(
    <div className={classes.Order}>
        <p>Ingredients:{igredietOutput}</p>
<p>Price:<strong>Rs.{Number.parseFloat( props.price).toFixed(2)}</strong></p>
    </div>
    )
}
export default order;