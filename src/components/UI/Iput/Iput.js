import React from 'react'
import classes from './Iput.css'
const iput = (props) => {
    let iputEle = null;
    switch (props.elementType) {
        case ('input'):
            iputEle = <input className={classes.IputEle}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}/>
            break
        case ('select'):
            iputEle =
                <select className={classes.IputEle}
                    value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            break
        default:
            iputEle = <input className={classes.IputEle}
                {...props.elementConfig}
                value={props.value} />
    }
    return (
        <div className={classes.Iput}>
            <label className={classes.Lael}>{props.label}</label>
            {iputEle}

        </div>
    )
};
export default iput;