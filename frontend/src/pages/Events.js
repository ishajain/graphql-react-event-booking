import React from 'react'
import './Events.css'
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop'
class Auth extends React.Component{
    state = {
        events: [],
        creating: false
    };

    onModalCancel = () => {
        this.setState({ creating: false });

    }

    onModalConfirm = () => {
    this.setState({ creating: false });

    }

    onCreateEventClick = () => {
        this.setState({ creating: true });

    }
   
    
    componentDidMount(){
        let requestBody = {
            query:` query{
                            events
                            {
                                title,
                                description,
                                price,
                                creator
                                {
                                     email
                                }
                            }
                        }
                 `
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
        .then(response => {
            this.setState({
                events: response.data.events
            })
        })
        .catch(error => console.log(error))
    }

    render(){

    return(
        <>
           {this.state.creating && <Backdrop ></Backdrop>}
           {this.state.creating && <Modal title="Add Event" canCancel canConfirm 
                                        onModalCancel={this.onModalCancel} 
                                        onModalConfirm={this.onModalConfirm}>
                                        <p>Model Content</p>
                                    </Modal>
           }
           <div className="events-control">
             <p>Share your own events!!</p>
             <button className="btn" onClick={this.onCreateEventClick}>Create Event</button>
           </div>
       </>
    )
}
}

export default Auth;