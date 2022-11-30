//copied code from NavBar

import { CustomerForm } from "./CustomerForm"
import { EmployeeForm } from "./EmployeeForm"

export const Profile = () => {
        const localHoneyUser = localStorage.getItem("honey_user")
        const honeyUserObject = JSON.parse(localHoneyUser) //staff is a property of honeyUserObject
        
        if (honeyUserObject.staff) {
            
            return <EmployeeForm/>
        }
        else {
            
            return <CustomerForm/>
        }
    
    }
