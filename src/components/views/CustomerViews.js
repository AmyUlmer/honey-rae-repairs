import { Outlet, Route, Routes } from "react-router-dom"
import { TicketForm } from "../tickets/TicketForm"
import { TicketList } from "../tickets/TicketList"

// known as a higher order component
//do NOT want TicketContainer
export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                {/* <Route path="tickets" element={ <TicketContainer/> } /> */}
                <Route path="tickets" element={ <TicketList/> } />

                <Route path="ticket/create" element={ <TicketForm /> } />
            </Route>
        </Routes>
    )
}