import React from 'react';
import classes from '../styles/Layout.module.css';
import Nav from './Nav';
const Layout = ({children}) => {
    return (
        <div>
            <Nav/>
            <div className={classes.main}>
                <div className={classes.container}>
                   {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
