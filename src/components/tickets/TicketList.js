import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Tickets.css" 

//The React library provides you with a function named useState() to store the state in a component. The function returns an array. The array contains the intial state value at index 0 and a function that modifies the state at index 1.

//You deconstruct those values into two variables--const [ tickets, setTickets ] = useState([])
//After this line of code runs, you have two variables with the following values.
    //1.tickets has a value of an empty array.
    //2.setTickets has a value of a function.
//This is the initial change of state in a component.

export const TicketList = ({searchTermState}) => { //deconstruct object from TicketContainer. value of the key is the actual state from the parent
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    //track if Emergenvy Only button is being use
    //by default you don't want to show only emergency tickets- set false
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate() //add use navigate hook for customer button. need for nav to happen.

    const localHoneyUser = localStorage.getItem("honey_user")
    //gets localHoneyUser object from localStorage. Honey-user is whoever is logged in.
    //information if we should show all tickets or only tickets for current user.
    const honeyUserObject = JSON.parse(localHoneyUser) 
    //convert that string to an object so we can use it in our code.

    //React provides you with another function named useEffect() to observe state. It allows you to observe state and run some instructions when state changes.
    //initial state is an empty array
    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedTickets)
        },
        [searchTermState]//observe state from the parent
    ) 

        
        // observe when state is changed for when emergency is changed. observe and run code when that state change
        // handing both possible state changes for this boolean state variable
        useEffect(
            () => {
                if (emergency) {
                    const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                    setFiltered(emergencyTickets)
                }
                else {
                    setFiltered(tickets)
                }
            },
            [emergency] 
            
        )

    //setTickets is a function to change the state.Want to change it to the entire array of serviceTickets from API. 
    useEffect(
        () => {
            fetch (`http://localhost:8088/serviceTickets`)
                .then((response) => response.json())
                .then((ticketArray) => { //parameter to capture data after json processing is done
                    setTickets(ticketArray) //use setter function to pass it to what you want new value to be(ticketArray)
                })
            // console.log("Initial state of tickets", tickets) // View the initial state of tickets
        },[]) // When this array is empty, you are observing initial component state)

    // if ticket state changes, should I show all tickets? or just a customers tickets? So, need to observe tickets state.
    //login as a customer. get tickets to only show that log-in.    
    useEffect(
        () => {
            if (honeyUserObject.staff){
                //for employees
                setFiltered(tickets)
            }
            else {
                //for customers
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )    

    useEffect(
        () => {
            if (openOnly) {
            const openTicketArray = tickets.filter(ticket => { 
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
            })
            setFiltered(openTicketArray)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly] )

    return <>
        {/*button only appears is staff key on userObject is true.only employees can see it. use ternary statement*/}
        {
            honeyUserObject.staff
                ? <>
                    <button onClick={() => setEmergency(true)}>Emergency Only</button>
                    <button onClick={() => setEmergency(false)}>Show All</button>
                </>
                //show button for customer.Add a button to the top of your ticket list that will change the browser URL in order to show the ticket form. Make sure this button only displays when a customer is logged in.
                // route them to new route in browser
                : <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => updateOpenOnly(true)}>Open Ticket</button>
                    <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>
        }

        <h2>List of Tickets</h2>
        <article className="tickets">
            {
                // tickets.map( change to filtered tickets, so not to show all of the tickets
                filteredTickets.map(
                    (ticket) => {
                        return <section key={ticket.id} className="ticket" >
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? "!" : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
    
    </>
    
}

