// to get access to <TicketSearch setterFunction={setSearchTerms} />, access key of setterFunction, which is on an object. Why? not passing function itself. React takes all of the props (in this case only 1) and brings them all together in a single object. key =setterFunction, value =setSearchTerms. 

//extract that property(setSearchTerms) thru object deconstruction. comes up as a parameter but all gathered together as single object. what is actually passed to this function is an object. but the name of the key not the value in {}.

//value of {setterFunction} variable in TicketSearch is now the setter function for the state variable in the parent in TicketsContainer.
//invoke the function with onChange


export const TicketSearch = ({setterFunction}) => {
    return (
        //put inside <div></div> so its separate from buttons
        <div> 
            <input
                onChange={
                    (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                        // change state in parent component
                    }
                }
            type = "text" placeholder = "Enter search terms" />
        </div>
    )
}

