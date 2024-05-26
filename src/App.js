import React from 'react'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Tasks from './components/Tasks';
import Nav from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/tasks">
            <Nav /> {/* Include Nav component in the Tasks Route */}
            <Tasks />
          </Route>
          <Route path="/" exact component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;