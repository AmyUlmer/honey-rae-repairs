import { useEffect, useState } from "react"

    export const EmployeeForm = () => {
        // TODO: Provide initial state for profil
        //bc in form we will provide properties need on this w/ default values
        const [profile, updateProfile] = useState({
            specialty: "",
            rate: 0,
            userId: 0
        })

        const [feedback, setFeedback] = useState("")
            
        useEffect(() => {
            if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
                setTimeout(() => setFeedback(""), 3000);
            }
        }, [feedback])

        // copy userId from local storage
        const localHoneyUser = localStorage.getItem("honey_user")
        const honeyUserObject = JSON.parse(localHoneyUser)

        // TODO: Get employee profile info from API and update state
        useEffect(() => {
        //GET employee profile. get 1 object from employees database based on userId. do not have employeeId sotred in local storage. storing userId in user database
        // id property from honeyUserObject will get interpolated in fetch URL
            fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
            .then(response => response.json())
            .then((dataFromEmployeesArrayForCurrentUser) => {
                const employeeObject = dataFromEmployeesArrayForCurrentUser [0]
                updateProfile(employeeObject)
            })
        },[])
    
        const handleSaveButtonClick = (event) => {
            event.preventDefault()
    
            /*
                TODO: Perform the PUT fetch() call here to update the profile.
                Navigate user to home page when done. Update permament state once they click save profile. PUT means replace
                put the primary key of the object that we are replacing into interpolation string
            */
            return fetch(`http://localhost:8088/employees/${profile.id}`, {
                    method:"PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify (profile) 
                })
                    .then(response => response.json())
                    .then(() => {
                        setFeedback("Employee profile successfully saved")
                })
        }


        return (
            <>
            <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
            </div>
            </>
            <form className="profile">
                <h2 className="profile__title">New Service Ticket</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="specialty">Specialty:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={profile.specialty}
                            onChange={
                                (evt) => {
                                    // TODO: Update specialty property
                                    const copy = {...profile}
                                    copy.specialty = evt.target.value
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Hourly rate:</label>
                        <input type="number"
                            className="form-control"
                            value={profile.rate}
                            onChange={
                                (evt) => {
                                    // TODO: Update rate property
                                    const copy = {...profile}
                                    // want it to be a float (integer w/ decimal
                                    //so wrap in parseFLoat
                                    //specify how many decimal places you want to be on that decimal number
                                    copy.rate = parseFloat(evt.target.value, 2)
                                    updateProfile(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                // invoke handleSaveButtonClick function
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save Profile
                </button>
            </form>
        </>
    )
        
}



