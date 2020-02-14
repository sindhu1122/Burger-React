import React from 'react'
import classes from './BuildCotrol.css'
const buildCotrol=(props)=>
(
<div className={classes.BuildCotrol}>
    <div className={classes.Label}>{props.label}</div>
    <button className={classes.Less} onClick={props.remove}>Less</button>
    <button className={classes.More} onClick={props.added}>More</button>   
</div>

)
export default buildCotrol;