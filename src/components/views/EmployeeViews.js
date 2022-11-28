import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { EmployeeList } from "../employees/EmployeeList"
import { TicketContainer } from "../tickets/TicketsContainer"
import { CustomerDetails } from "../Customers/CustomerDetails"
import { CustomerList } from "../Customers/CustomerList"

// known as a higher order component
//DO want TicketContainer
// Do NOT want to see TicketForm, employees do not enter-in tickets
export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketContainer/> } />
                <Route path="employees" element={ <EmployeeList/> } />
                <Route path="employees/:employeeId" element={ <EmployeeDetails/> } />
                <Route path="customers" element={ <CustomerList/> } />
                <Route path="customers/:customerId" element={ <CustomerDetails/> } />
                
                {/* create detalied view for each employee&: want to see rate & speciality when you click on employee info in browser  */}
                {/* whenever route matches employee/some # will capture that and stor it in emplyeeId variable */}

                {/* <Route path="ticket/create" element={ <TicketForm /> delete} /> */} 
            </Route>
        </Routes>
    )
}