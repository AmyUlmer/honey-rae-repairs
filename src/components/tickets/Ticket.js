//In this section, you need to make sure that a ticket can only be edited by a customer, and you will be making a new Ticket component that will get 2 props sent to it from the parent TicketList component.

import { Link } from "react-router-dom"

// need to decontruct ticketObject and isStaff prop
// ticketObject & isStaff is the variale being used in the scope of this component
// decontruct employees prop in this component
export const Ticket = ({ ticketObject, isStaff, employees}) => {

    //get currently assigned employee if ticketObject.employeeTickets.length is greater than 0
    let assignedEmployee = null //after lodic(below) is done, the value of this variable will either be null or it is going to be an object
    // >0 means employee is assigned 
    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        //this is where we pass the condition, does primary key on the employee match the employeeId on one of these relationship objects 
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)

    }

    return <section className="ticket" key={`ticket--${ticketObject.id}`} >
        {/* link component will be put inside ternary bc isStaff is true/false, only if person is not staff will they be able to click the link */}
    <header>
        {
            isStaff
                ? `Ticket ${ticketObject.id}`
                : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
        }
    </header>
    <section>{ticketObject.description}</section>
    <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
    {/* footer: if this ticket is currently being worked on by an employee */}
    {/* use power of Json server to get additional information. Use embed feature to pull in employee tickets. */}
    {/* length of employeeTickets property, which is now on serticket itself (serviceTickets?_embed=employeeTickets)- length of ticket = 0, if no emplyee is working on tic */}
    {/* use fetch call-that was changed in TicketList to conditionally render info below: */}
    <footer>
        {
            //if its 0-falsey value
            // if not 0- truthy value 
            ticketObject.employeeTickets.length
            //only if the assigned employee is NOT null..meaning, we found in a full employee object that the ticket was being worked on 
            ? `Currently being worked on ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
            : <button>Claim</button>
        }
    </footer>
</section>
}