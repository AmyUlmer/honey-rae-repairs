import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Ticket } from "./Ticket"
import "./Tickets.css" 

//The React library provides you with a function named useState() to store the state in a component. The function returns an array. The array contains the intial state value at index 0 and a function that modifies the state at index 1.

//You deconstruct those values into two variables--const [ tickets, setTickets ] = useState([])
//After this line of code runs, you have two variables with the following values.
    //1.tickets has a value of an empty array.
    //2.setTickets has a value of a function.
//This is the initial change of state in a component.

export const TicketList = ({searchTermState}) => { //deconstruct object from TicketContainer. value of the key is the actual state from the parent
    const [tickets, setTickets] = useState([])
    const [employees, setEmployees] = useState([]) //state vairable to store in component state. state=employess fullName. to be used with fetch (`http://localhost:8088/employees?_expand=user`). Empty array that will be filled in after the fetch call response.
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
    useEffect( // this is the useEffect that ir running after initial state is set 
    //where you write code to go get all information from permanent state from API
        () => {
            // fetch (`http://localhost:8088/serviceTickets`)
            // change original fetch to get employeeTickets that are being worked on-- chp.16--each one of the serviceTickets is going to have employeeTickets property
            fetch (`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
                .then((response) => response.json())
                .then((ticketArray) => { //parameter to capture data after json processing is done
                    setTickets(ticketArray) //use setter function to pass it to what you want new value to be(ticketArray)
                })
            // console.log("Initial state of tickets", tickets) // View the initial state of tickets
        },[]) // When this array is empty, you are observing initial component state)

        //useEffect to get all of the employees fullName that are working 
        useEffect( 
        () => {
            fetch (`http://localhost:8088/employees?_expand=user`)
                .then((response) => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray) 
                })
        },[]) 


        
        
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
                    //use implicit return
                    // create a prop-ticketObject- who's value is current ticket
                    // {ticket} is the parameter for our call back function for map
                    //as this iterates it will create a brand new ticket component
                    //add another prop component-isStaff- to see if ticket holder is customer or not. vale ={honeyUserObject}- from TicketList
                    //pass entire emplyees array as a prop. Why? on inital getting info from the API, do logic in this component. 
                    (ticket) => <Ticket employees={employees} isStaff={honeyUserObject.staff} ticketObject={ticket} />
                )
            }
        </article>
    
    </>
    
}

