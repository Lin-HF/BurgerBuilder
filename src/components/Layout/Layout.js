import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toobar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }
    siderDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideFrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideFrawerToggleHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.siderDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


export default Layout;