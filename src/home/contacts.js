import React, { useEffect, useState } from 'react';

const Contacts = (props) => {
    return (
        <div className='contacts-list'>
            <ul>
                {props.contactList?.map((person, index) => {
                    return (
                        <li 
                            key={index}
                            className="contacts-list-item">
                            <p className='contact-name'>{person.contact}</p>
                            <p className='contact-number'>{person.phoneNumber}</p>
                        </li>)
                })}
            </ul>
        </div>
    )
}
export default Contacts;