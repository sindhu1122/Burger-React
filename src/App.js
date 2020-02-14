import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import BuilderBuilder from './containers/BurgerBuilder/BurgerBuilder'
class App extends Component {
  render()
  {
      
    return (
      <div>
        <Layout>
          <BuilderBuilder>
            
          </BuilderBuilder>
        </Layout>
      </div>
    );
  }
}
export default App;
