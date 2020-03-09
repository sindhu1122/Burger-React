import React from 'react'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'
const sideDrawer =(props)=>
{
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}></Backdrop>
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
            <Logo></Logo>
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems
                isAuthenticated={props.isAuth}></NavigationItems>
            </nav>
        </div>
        </Aux>
    )
}
export default sideDrawer;