import React from 'react';
import { BrowserRouter,Route, Redirect, Switch} from 'react-router-dom'
import Auth from './pages/Auth'
import Bookings from './pages/Bookings'
import Events from './pages/Events'
import MainNavigation from './components/Navigation/MainNavigation'
import AuthContext from './context/auth-context'
import './App.css'

class App extends React.Component {
  
  state= {
    userId:null,
    token:null
    
  };

  logIn =  (token,userId ,tokenExpiration) => {
    this.setState({
      userId : userId,
      token:token
    })
  }

  logOut = () => {
    this.setState({
      userId : null,
      token:null
    })
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <AuthContext.Provider value = {{userId: this.state.userId, token: this.state.token, logIn:this.logIn, logOut:this.logOut}}>
              <MainNavigation></MainNavigation>
              <main className="main-content">
              <Switch>
              {this.state.token && <Redirect from="/" to="/events" exact />}
                {this.state.token && (
                  <Redirect from="/auth" to="/events" exact />
                )}
                {!this.state.token && (
                  <Route path="/auth" component={Auth} />
                )}
                <Route path="/events" component={Events} />
                {this.state.token && (
                  <Route path="/bookings" component={Bookings} />
                )}
                {!this.state.token && <Redirect to="/auth" exact />}

              </Switch>
              </main>
            </AuthContext.Provider>
          </React.Fragment>
       </BrowserRouter>
    </div>
    );
  }
 
}

export default App;
