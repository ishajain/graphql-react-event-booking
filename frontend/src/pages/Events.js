import React from 'react'
import './Events.css'
import Modal from '../components/Modal/Modal'
import Backdrop from '../components/Backdrop/Backdrop'
import AuthContext from "../context/auth-context"
import EventsList from '../components/Events/EventsList'
import Spinner from '../components/Spinner/Spinner'
class Auth extends React.Component{
    state = {
        events: [],
        creating: false,
        isLoading : false
    };
    static contextType = AuthContext
    constructor(props){
        super(props)
        this.titleElement = React.createRef();
        this.descriptionElement = React.createRef();
        this.priceElement = React.createRef();
        this.dateElement = React.createRef();
    }

    onModalCancel = () => {
        this.setState({ creating: false });

    }

    onModalConfirm = () => {
    this.setState({ creating: false });
    const title = this.titleElement.current.value
    const description = this.descriptionElement.current.value
    const price = +this.priceElement.current.value
    const date = this.dateElement.current.value
    if(title.trim().length === 0 || description.trim().length === 0 || price <= 0 || date.trim().length === 0) return;
    const event  = {title,description,price,date}
    console.log(event)

    const  requestBody = {
        
            query : `mutation{
                        createEvent(eventInput:{
                        title:"${event.title}",
                        description:"${event.description}",
                        price: ${event.price},
                        date:"${event.date}"
                }){_id,title,description,price,creator { _id,email}}
              }`
        }
    

    fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${this.context.token}`
        }
    })
    .then( res =>
        {
            if (res.status !== 200 && res.status !== 201) throw new Error("Failed")
            return res.json()
        }
    )
    .then(response => {
        console.log(response.data)
    })
    .catch(error => console.log(error))
    }

    onCreateEventClick = () => {
        this.setState({ creating: true });

    }
   
    
    fetchEvents(){
        this.setState({ isLoading : true})
        const requestBody = {
            query:` query{
                            events
                            {
                                _id,
                                title,
                                description,
                                price,
                                date
                                creator
                                {   _id,
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
            console.log(response.data.events)
           this.setState({events: response.data.events, isLoading : false})

        })
        .catch(error => console.log(error))
    }

    componentDidMount() {
        this.fetchEvents()
    }

    render(){

    return(
        <>
           {this.state.creating && <Backdrop ></Backdrop>}
           {this.state.creating && <Modal title="Add Event" canCancel canConfirm 
                                        onModalCancel={this.onModalCancel} 
                                        onModalConfirm={this.onModalConfirm}>
                                       <form className="form-control">
                                           <div>
                                               <label htmlFor="title">Title</label>
                                               <input type="text" id="title" ref={this.titleElement}></input>
                                           </div>
                                           <div>
                                               <label htmlFor="price">Price</label>
                                               <input type="number" id="price" ref={this.priceElement}></input>
                                           </div>
                                           <div>
                                               <label htmlFor="date">Date</label>
                                               <input type="date" id="date" ref={this.dateElement}></input>
                                           </div>
                                           <div>
                                               <label htmlFor="description">Description</label>
                                               <textarea id="description" ref={this.descriptionElement}></textarea>
                                           </div>
                                       </form>
                                    </Modal>
           }
           {this.context.token && <div className="events-control">
             <p>Share your own events!!</p>
             <button className="btn" onClick={this.onCreateEventClick}>Create Event</button>
           </div>
           }
           { this.state.events.length > 0 && !this.state.isLoading ?
                <EventsList events={this.state.events} userId={this.context.userId}/> : <Spinner />
           }
           
       </>
    )
}
}

export default Auth;