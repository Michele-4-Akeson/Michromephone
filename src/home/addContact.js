import React, { useState } from 'react';
import * as BackendActions from '../Actions/BackendActions';
import "../styles/elements.css";
import "../styles/contacts.css";

const AddContact = (props) => {
    const [state, setState] = useState({
        name: "",
        phoneNumber: "",
        email:"",
        discord:""
    })

    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    async function addContact(e){
        e.preventDefault();

      
        // Call API function to add contact to Monogo DB
        const response = await BackendActions.addContactToProfile(props.token, state);

        if (response != null && response.success){
            //alert(state.contact + " at " + state.phoneNumber + " successfully added!")
            // Add contact to contactList state in Home.js
            props.setContactList([...props.contactList, {"name": state.name, "phoneNumber": state.phoneNumber, "email":state.email, "discord":state.discord}])
            // Switch back to contacts interface
            props.togglePage("contacts");
        } else {
            setMessage("unable to add contact")
        }

        

        
    }

    return (
        <div>
            <h1 className='heading_main'>Add New Contact</h1>
            <h3>{message}</h3>
            <form 
                onChange={handleChange}
                onSubmit={addContact}
                className='add-contact-form'>
                <label className='form-label'>Contact Name</label>
                    <input 
                        name="name" 
                        type="text" 
                        className="form-input"
                        value={state.name} 
                        required />
                <label className='form-label'>Contact Number</label>
                    <input 
                        name="phoneNumber" 
                        type="text" 
                        className="form-input"
                        value={state.phoneNumber} />
                <label className='form-label'>Contact Email</label>
                    <input 
                        name="email" 
                        type="text" 
                        className="form-input"
                        value={state.email} />
                 <label className='form-label'>Contact Discord</label>
                    <input 
                        name="discord" 
                        type="text" 
                        className="form-input"
                        value={state.discord} />
                <input type="submit" className="btn-primary save-contact" value="Save contact" />
            </form> 
        </div>
    )
} 
export default AddContact;