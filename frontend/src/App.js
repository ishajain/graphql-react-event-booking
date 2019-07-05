import React from 'react';
import { BrowserRouter,Route, Redirect, Switch} from 'react-router-dom'
import Auth from './pages/Auth'
import Bookings from './pages/Bookings'
import Events from './pages/Events'
import MainNavigation from './components/Navigation/MainNavigation'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <React.Fragment>
          <MainNavigation></MainNavigation>
          <main className="main-content">
          <Switch>
            <Redirect from="/" exact to="/auth"></Redirect>
            <Route path="/auth" component={Auth}></Route>
            <Route path="/events" component={Events}></Route>
            <Route path="/bookings" component={Bookings}></Route>
          </Switch>
          </main>
        </React.Fragment>
     </BrowserRouter>
  </div>
  );
}

export default App;
