// parent component will contain both the input field and the list of tickets
// this module will use props.- How to share a state between 2 components. 
// Props are how parent components send values to child components. (like passing arguments to functions)
// contain the state-- searching for tickets
//this is parent. this component will maintain the state
// TicketList & TicketSearch will get acces this state via props

import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"

export const TicketContainer = () => { //parent component
    const [searchTerms, setSearchTerms] = useState("") //parent contains [state of searchTerms, function to change the state of search terms ]
    // pass reference to the setSearchTerms function to TicketSearch

    // have a component that returns 2 child components
    return <> 
        <TicketSearch setterFunction={setSearchTerms} />
        {/* TicketList needs to know what are the searchTerms, so it can do the filtering and display only ticket that match those terms */}
        <TicketList searchTermState={searchTerms}/>
    </>
}