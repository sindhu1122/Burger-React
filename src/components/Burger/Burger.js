import React from 'react'
import classes from './Burger.css'
import BurgerIgrediet from './BurgerIgrediet/BurgerIgrediet'
const burger=(props)=>
{
    console.log(props)
    let trasformigrediet=Object.keys(props.igrediets)
    .map(igKey=>{
        return [...Array(props.igrediets[igKey])].map(( _ ,i)=>{
            return <BurgerIgrediet key={igKey+i} type={igKey}/>
        })
    })
    .reduce((arr,el)=>
    {
        return arr.concat(el)
    },[]);
    if(trasformigrediet.length === 0)
    {
        trasformigrediet = <p>Please start making your yummy burger!</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIgrediet type="bread-top"></BurgerIgrediet>
            {trasformigrediet}
            <BurgerIgrediet type="bread-bottom"></BurgerIgrediet>
        </div>
    )
}
export default burger;