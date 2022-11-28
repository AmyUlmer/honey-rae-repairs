// this component makes a form that allows a customer to submit a new ticket
// add a button that will redirect to the form, where information can be edited, then as soon as form is submitted
// the information will be sent to API, we will redirect user right back to ticket list to see new ticket
// this component watches the browser URL and displays the correct component 



import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [ticket, update] = useState({
        //add property for each one of the form fields w/ default value
        description: "",
        emergency: false

    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const navigate = useNavigate() //use to direct user back to TicketList

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        // console.log("You clicked the Button")

        // TODO: Create the object to be saved to the API
        /*
        {
            "userId": 1,
            "description": "Pariatur nihil animi eos doloremque laborum fugiat consequuntur iusto. Et tempore a enim.",
            "emergency": true,
            "dateCompleted": "Fri Apr 29 2022 21:24:29 GMT-0500 (Central Daylight Time)"
        }
          */
        const ticketToSendToAPI = {
            userId: honeyUserObject.id, //can get it from local storage "honey_user" in application state in browser-
            description: ticket.description,  //comes from state variable
            emergency: ticket.emergency,
            dateComplete:""  
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/serviceTickets`, { //2nd argument to fetch is our options
            method: "POST",
            headers: {
                "Content-Type": "application/json" //wants to specify it's being passed to json
            },
            body: JSON.stringify(ticketToSendToAPI) //iformation client wants the API to save
        })
            .then(response => response.json())
            .then (() => { //after object has been saved in API,json server has responded, immediately direct user back to ticketList
                navigate("/tickets")
            })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (evt) => { // want any character into desc. field, we want to update our state- what update function is for
                                const copy = {...ticket} // create copy of existing state
                                copy.description = evt.target.value //modify state, whatever is currently in the input field.
                                update (copy) //update state
                            }  
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (evt) => { // want any character into desc. field, we want to update our state- what update function is for
                                const copy = {...ticket} // create copy of existing state
                                copy.emergency = evt.target.checked//modify state, it is a checkbox-- does not take 
                                update (copy) //update state
                            }  
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} //pass clickEvent to this function
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}