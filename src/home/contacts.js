import React, { useEffect, useState } from 'react';

const Contacts = (props) => {
    return (
        <div>
            <h1>My Contacts</h1>
            <ul>
                {props.contactList?.map((person, index) => {
                    return (
                        <li key={index}>
                            <p>{person.contact}</p>
                            <p>{person.phoneNumber}</p>
                        </li>)
                })}
            </ul>
        </div>
    )
}
export default Contacts;