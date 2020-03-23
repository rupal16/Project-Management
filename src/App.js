import React from 'react';
import Userregis from './routes/user-registration/user-reg' ;
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom' ;
function App() {
  return (
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
}
export default App;
