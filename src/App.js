import React, { Component } from 'react'
import Registration from './routes/registration' ;
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' ;
import fire from './config/Fire' ;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
  }
  

  componentDidMount(){
    this.authListener();
  }


  authListener(){
    fire.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({user})
      }else{
        this.setState({user: null})
      }
    })
  }

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

