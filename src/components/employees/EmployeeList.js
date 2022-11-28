//responsibility of this function is to set up initial state,
//then fetch all of the employees from API
//pull them in
//JSX i will render them (name and email address) to new view

import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./EmployeeList.css"

export const EmployeeList =() => { 
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/users?isStaff=true`) //query string parameter, everythin after question mark are additional parameters in request to server
                .then((response) => response.json())
                .then((employeeArray) => { 
                    setEmployees(employeeArray)
                })
            },
            [] 
    )

    return <> 
        <article className="employees">
        {   // need 3 properties: id, fullname,email
            // 3 values come from employee parameter, individual object as we're iterating employees
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.id} 
                fullName={employee.fullName} 
                email={employee.email} /> )

        }
        </article>

    </>
} 

//line 24-36 parent component to employees. when ur iterating over data but need a component to render individual details can be helpful to plan for future growth or when it gets complicated