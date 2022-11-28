
import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
        const localHoneyUser = localStorage.getItem("honey_user")
        const honeyUserObject = JSON.parse(localHoneyUser) //staff is a property of honeyUserObject
        
        if (honeyUserObject.staff) {
            //if honey-User is a member if staff return employee return emplyee views
            return <EmployeeNav />
        }
        else {
            // return customer views
            return <CustomerNav />
        }
    
    }

