import React from 'react';
import { BrowserRouter,Route, Redirect, Switch} from 'react-router-dom'
import Auth from './components/Auth'
import Bookings from './components/Bookings'
import Events from './components/Events'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <h1>Welcome to the React Application!</h1>
      <Switch>
        <Redirect from="/" exact to="/auth"></Redirect>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/events" component={Events}></Route>
        <Route path="/bookings" component={Bookings}></Route>
      </Switch>
      
      </BrowserRouter>
     
    </div>
  );
}

export default App;
