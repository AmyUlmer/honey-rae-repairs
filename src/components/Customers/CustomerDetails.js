
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    // hooks is called useParams
    const {employeeId} = useParams() // state we are getting from route
    const [employee, updateCustomer] = useState()

    useEffect(
        () => {
            fetch (`http://localhost:8088/customers?_expand=user&userId=${customerId}`) 
            .then(response => response.json())
            .then((data) => { 
                const singleCustomer = data[0]
                updateCustomer(singleCustomer)
            })
        },
        [customerId] //observe each time employeeId changes
    ) 
    
    return <section className="customer"> 
        <header>{customer?.user?.fullName}</header> 
        <div>Email: {customer?.user?.email}</div>
        <div>Address: {customer.address}</div> 
        <div>phoneNumber: {customer.phoneNumber}</div>
        <footer>Currently have {customer?.customerTickets?.length} tickets</footer>
    </section>
}