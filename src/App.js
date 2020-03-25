import React, { Component } from 'react'
import Registration from './routes/registration' ;
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' ;

class App extends Component {
  render() {
    return (
      <div>
       <React.Fragment>
   <Router>
    <div className="App">
         <Switch>
         <Route path="/user-registration" component={Registration} />
         </Switch>
     </div>
     </Router>
      </React.Fragment> 
   );
        
      </div>
    )
  }
}

export default App

