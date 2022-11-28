/*The final step is to render the <TicketList> component. You do that with a <Route> component. Open your <ApplicationViews> component and replace its contents with the following code.*/

import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews"


export const ApplicationViews = () => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser) //staff is a property of honeyUserObject
    
    if (honeyUserObject.staff) {
        //if honey-User is a member if staff return employee return emplyee views
        return <EmployeeViews />
    }
    else {
        // return customer views
        return <CustomerViews />
    }

}

// use higher order compnents in ApplicationViews to customize the routes we are going to support depending on user type