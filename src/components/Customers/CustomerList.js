//responsibility of this function is to set up initial state,
//then fetch all of the employees from API
//pull them in
//JSX i will render them (name,address, phone #) to new view

// Create a CustomerList module that contains a component function that fetches all customers and iterates the array in the JSX to display the name of each customer by passing each object to the Customer component as a prop.

import { useEffect, useState } from "react"
import { Customer } from "./Customer"


export const CustomerList =() => { 
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/customers?_expand=user`) //query string parameter, everythin after question mark are additional parameters in request to server
                .then((response) => response.json())
                .then((customerArray) => { 
                    setCustomers(customerArray)
                })
            },
            [] 
    )

    return <> 
        <article className="customers">
        {   // need 4 properties: id, fullname,email
            // 4 values come from customer parameter, individual object as we're iterating customers
            customers.map(customer => <Customer key={`customer--${customer.id}`}
                id={customer.id} 
                fullName={customer.user.fullName} 
                address={customer.address}
                phoneNumber={customer.phoneNumber} /> )

        }
        </article>

    </>
} 