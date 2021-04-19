import React, { Fragment, Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState(
            {
                showSideDrawer: false
            }
        );
    }

    showSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: true,
        });
    }

    render() {
        return (
            <Fragment>
                <Toolbar openSideDrawer={this.showSideDrawerHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
};

export default Layout;