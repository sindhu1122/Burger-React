import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIgrediet.css'
class BurgerIgrediet extends Component
{
    render(){
    let igrediet=null;
    switch(this.props.type)
    {
        case ('bread-bottom'):
            igrediet=<div className={classes.BreadBottom}></div>
            break;
        case('bread-top'):
            igrediet=<div className={classes.BreadTop}>
                <div className={classes.Seeds1}></div>
                <div className={classes.Seeds2}></div>
            </div>
            break;
        case('meat'):
            igrediet=<div className={classes.Meat}></div>
            break;
        case('bacon'):
            igrediet=<div className={classes.Bacon}></div>
            break;
        case('salad'):
            igrediet=<div className={classes.Salad}></div>
            break;
        case('cheese'):
            igrediet=<div className={classes.Cheese}></div>
            break;
            
        default:
            igrediet=null;


    }
    return igrediet;
}
}
BurgerIgrediet.PropTypes={
    type:PropTypes.string.isRequired
}
export default BurgerIgrediet;