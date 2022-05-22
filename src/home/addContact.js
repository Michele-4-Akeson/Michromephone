import React, { useState } from 'react';
import * as BackendActions from '../APIs/BackendAPI';

const AddContact = (props) => {
    const [state, setState] = useState({
        username: "",
        password: "",
        contact: "",
        phoneNumber: "",
    })

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    async function addContact(e){
        e.preventDefault();

        // Add contact to contactList state in App.js
        props.setContactList([...props.contactList, {"_id": "1234", "contact": "Mike Smith", "phoneNumber": "911"}])

        // Call API function to add contact to Monogo DB
        // const response = await BackendActions.addContactToProfile(state.username, 
        //                                                             state.password, 
        //                                                             state.contact, 
        //                                                             state.phoneNumber);

        // Switch back to contacts interface
        props.setAddContactVisible(false);
    }

    return (
        <div>
            <h1>Add New Contact</h1>
            <form 
                onChange={handleChange}
                onSubmit={addContact}>
                <label>username</label>
                    <input name="username" type="text" value={state.username} required placeholder='Add username...'/><br />
                <label>password</label>
                    <input name="password" type="password" value={state.password} required placeholder='Add password...'/><br />
                <label>contact name</label>
                    <input name="contact" type="text" value={state.contact} required placeholder='Add contact...'/><br />
                <label>contact number</label>
                    <input name="phoneNumber" type="text" value={state.phoneNumber} required placeholder='Add phone number...'/><br />
                <input type="submit" value="Save contact" />
            </form> 
        </div>
    )
} 
export default AddContact;