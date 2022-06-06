import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const SendForm = ({value, icon, sender}) => {
    const [selected, setSelected]= useState(false)
    const [text, setText] = useState("")


    async function send(e){
        e.preventDefault()
        const response = await sender(value, text)
        if (response.success){
            setSelected(false)
            setText("")
        }
        
    }

    if (value != "") {
        return (
             
            <div className='contact-info-item' onClick={()=>setSelected(true)} >
                <FontAwesomeIcon className='contact-icon' icon={icon}/>
                {!selected?
                <h4 className='contact-name'>{value}</h4>
                :
                <form 
                  onSubmit={send}
                  className='contact-name'>
                  <input name="discord" type="text" className="send-input" value={text} onChange={(e)=>setText(e.target.value)} />
                </form> }
              
            </div>

        )
    } else {
        return <></>
    }
}
