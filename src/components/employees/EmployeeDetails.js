// this component should only be displayed when route matches Employee/employeeId

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    // hooks is called useParams
    const {employeeId} = useParams() // state we are getting from route
    const [employee, updateEmployee] = useState()

    useEffect(
        () => {
            fetch (`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`) 
            .then(response => response.json())
            .then((data) => { 
                const singleEmployee = data[0]
                updateEmployee(singleEmployee)
            })
        },
        [employeeId] //observe each time employeeId changes
    ) 
    
    return <section className="employee"> 
        <header>{employee?.user?.fullName}</header> 
        <div>Email: {employee?.user?.email}</div>
        <div>Specialty: {employee?.specialty}</div> 
        <div>Rate: {employee?.rate}</div>
        <footer>Currently working on {employee?.employeeTickets?.length} ticket(s)</footer>
    </section>
}