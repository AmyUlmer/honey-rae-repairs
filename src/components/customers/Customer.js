import { Link } from "react-router-dom"

// {} are the props that need to be sent from customer list to customer when rendering it
export const Customer =({id, fullName, address, phoneNumber}) => {
    return  <section className="customer"> 
        <div> 
            <Link to= {`/customers/${id}`}>Name: {fullName}</Link>
        </div>
        <div>Address: {address}</div>
        <div>Phone Number: {phoneNumber}</div>
    </section>
            
}