import React, { useState } from 'react';
import * as BackendActions from '../APIs/BackendAPI';

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
            <h1>Add New Contact</h1>
            <form 
                onChange={handleChange}
                onSubmit={addContact}>
                <label>Contact Name</label>
                    <input name="contact" type="text" value={state.contact} required placeholder='Add contact...'/><br />
                <label>Contact Number</label>
                    <input name="phoneNumber" type="text" value={state.phoneNumber} required placeholder='Add phone number...'/><br />
                <input type="submit" value="Save contact" />
            </form> 
        </div>
    )
} 
export default AddContact;