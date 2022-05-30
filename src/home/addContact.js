import React, { useState } from 'react';
import * as BackendActions from '../Actions/BackendActions';
import "../styles/elements.css";
import "../styles/contacts.css";

const AddContact = (props) => {
    const [state, setState] = useState({
        contact: "",
        phoneNumber: "",
    })

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    async function addContact(e){
        e.preventDefault();

        // Add contact to contactList state in Home.js
        props.setContactList([...props.contactList, {"contact": state.contact, "phoneNumber": state.phoneNumber}])

        // Call API function to add contact to Monogo DB
        await BackendActions.addContactToProfile(props.token, state.contact, state.phoneNumber);

        alert(state.contact + " at " + state.phoneNumber + " successfully added!")

        // Switch back to contacts interface
        props.setAddContactVisible(false);
    }

    return (
        <div>
            <h1 className='heading_main'>Add New Contact</h1>
            <form 
                onChange={handleChange}
                onSubmit={addContact}
                className='add-contact-form'>
                <label className='form-label'>Contact Name</label>
                    <input 
                        name="contact" 
                        type="text" 
                        className="form-input"
                        value={state.contact} 
                        required />
                <label className='form-label'>Contact Number</label>
                    <input 
                        name="phoneNumber" 
                        type="text" 
                        className="form-input"
                        value={state.phoneNumber} 
                        required />
                <input type="submit" className="btn-primary save-contact" value="Save contact" />
            </form> 
        </div>
    )
} 
export default AddContact;