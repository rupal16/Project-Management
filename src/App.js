import React, { Component } from 'react'
import Userregis from './routes/user-registration/user-reg' ;
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' ;
// function App() {
//   return (
//     //
// }
// export default App;



class App extends Component {
  render() {
    return (
      <div>
       <React.Fragment>
   <Router>
    <div className="App">
         <Switch>
         <Route path="/userregistration" component={Userregis} />
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

