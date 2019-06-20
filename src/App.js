import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgurBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  
  render() {
    return (
      <div>
        <Layout>
          {/* <BurgerBuilder />
          <Checkout /> */}
          <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          </Switch>
          {/* <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} /> */}
        </Layout>
      </div>
    );
  }
}

export default App;
