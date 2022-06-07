import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const CommandInfo = ({command, description, icon}) => {
    const [selected, setSelected]= useState(false)
    return (
             
        <div className='contact-info-item' onClick={()=>setSelected(!selected)} >
            <FontAwesomeIcon className='contact-icon' icon={icon}/>
            {!selected?
            <h4 className='contact-name'>{command}</h4>
            :
            <p>{description}</p>}
          
        </div>

    )
}
