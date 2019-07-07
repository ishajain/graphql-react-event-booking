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

  login =  (token,userId ,tokenExpiration) => {
    this.setState({
      userId : userId,
      token:token
    })
  }

  logout = () => {
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
            <AuthContext.Provider value = {{userId: this.state.userId, token: this.state.token, login:this.login, logOut:this.logout}}>
              <MainNavigation></MainNavigation>
              <main className="main-content">
              <Switch>
                <Redirect from="/" exact to="/auth"></Redirect>
                <Route path="/auth" component={Auth}></Route>
                <Route path="/events" component={Events}></Route>
                <Route path="/bookings" component={Bookings}></Route>
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
