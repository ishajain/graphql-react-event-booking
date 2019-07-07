import React from 'react'
import './Auth.css'
class Auth extends React.Component{
    constructor(props) {
        super(props);
        this.emailElement = React.createRef();
        this.passwordElement = React.createRef()
      }

 state = {
     isLogin : false
 }
switchLogin =  () => {
    console.log(this.state.isLogin);
  this.setState(prevState => ( {isLogin : !prevState.isLogin}))
   
}
submitForm =(event) => {
    event.preventDefault()
    const email = this.emailElement.current.value
    const password = this.passwordElement.current.value
    if(email.trim().length === 0 || password.trim().length === 0) return ;
    
    
    
    let requestBody = {
        
        query : `query{
                    login(email:"${email.trim()}", password:"${password.trim()}"){
                    userId, token, tokenExpiration
                }
          }
        
        `
    }
    if(!this.state.isLogin){
        requestBody = {
        
            query : `mutation {
                        createUser(userInput:{email:"${email.trim()}", password:"${password.trim()}"})
                        { _id, email}
            }`
        }
    }

    fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers : {
            "Content-Type" : "application/json"
        }
    })
    .then( res =>
        {
            if (res.status !== 200 && res.status !== 201) throw new Error("Failed")
            return res.json()
        }
    )
    .then(res => console.log(res))
    .catch(error => console.log(error))

}
render(){
    return(
            <form className="auth-form" onSubmit={this.submitForm}>
                <div className="form-control">
                    <label htmlFor="email" >Email:</label>
                    <input type="email" id="email" ref={this.emailElement}></input>
                </div>
                <div className="form-control">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" ref={this.passwordElement}></input>
                </div>
                <div className="form-actions">
                    <button type="button" onClick={this.switchLogin}>{this.state.isLogin ? "SignUp" : "Login"}</button>
                    <button type="submit">Submit</button>
                </div>
            </form>    
)
}
}

export default Auth;