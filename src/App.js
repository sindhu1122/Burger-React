import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import BuilderBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import {Route, Switch} from 'react-router-dom'
import Orders from './containers/Orders/Orders'
class App extends Component {
  render()
  {
      
    return (
      <div>
        <Layout>
          {/* <BuilderBuilder>
            
          </BuilderBuilder>cotactdata
          <Checkout/> */}
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/" exact component={BuilderBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}
export default App;
