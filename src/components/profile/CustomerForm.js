import { useEffect, useState } from "react"

export const CustomerForm = (event) => {
    const [feedback, setFeedback] = useState("")
    const [profile, setProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: 0
    })

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

const localHoneyUser = localStorage.getItem("honey_user")
const honeyUserObject = JSON.parse(localHoneyUser)

//Get current customer profile info from API and update state
useEffect(() => {
    fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
    .then(response => response.json())
    .then((dataFromCustomersArrayForCurrentUser) => {
        const customerObject = dataFromCustomersArrayForCurrentUser[0]
        setProfile(customerObject)
    })
}, [])

const handleSaveButtonClick = (event) => {
    event.preventDefault()

    //PUT to update profile, display submitted message when done
    return fetch(`http://localhost:8088/customers/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
    .then(response => response.json())
    .then(() => {
        setFeedback("Profile updated successfully")
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
        <h2 className="profile__title">Update Customer Profile</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="specialty">Address:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={profile.address}
                    onChange={
                        (evt) => {
                            // TODO: Update specialty property
                            const copy = {...profile}
                            copy.address = evt.target.value
                            setProfile(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Phone Number:</label>
                <input type="text"
                    className="form-control"
                    value={profile.phoneNumber}
                    onChange={
                        (evt) => {
                            // TODO: Update rate property
                            const copy = {...profile}
                            copy.phoneNumber = evt.target.value
                            setProfile(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Profile
        </button>
    </form>
    </>
)
}