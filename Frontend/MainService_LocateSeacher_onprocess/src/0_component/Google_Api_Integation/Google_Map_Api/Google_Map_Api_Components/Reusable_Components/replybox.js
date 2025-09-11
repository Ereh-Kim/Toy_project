import React,{useRef, useState} from "react";

import CANCEL_REPLY_COMPONENT from "./Cancel_Reply.js";

export const REPLOY_BOX = (props) =>{

    const inputRef = useRef();
    const [ID, updateid] = useState({
        status: false,
        text: ''
    }) 

    return <React.Fragment>
    <div
                            style={{
                                width: '100%',
                                display:'flex',
                                alignItems:'start',
                                minHeight:'70px'
                            }}
                        >

                            <img
                            style={{
                                width: '50px',
                                height: '50px',
                                margin: '13px 0 0 0',
                                objectFit:'cover',
                                borderRadius: '30px'
                            }}

                            src={props.src}
                            ></img>

                            <textarea
                            id={'reply_text'}
                            ref={inputRef}
                            rows={1}
                            style={{
                                position:'relative',
                                width:'70%',
                                minHeight:'fit-content',
                                maxHeight: '200px',
                                margin: '8px 0 22px 11px',
                                padding: '5px 10px 0px 10px',
                                border: 'none',       
                                background: 'none',   
                                outline: 'none',
                                fontSize: '20px',
                                fontFamily: '큐트신민상',
                                overflowWrap: 'break-word',
                                letterSpacing: '3px',
                                textDecoration: 'underline',

                                textUnderlineOffset: '10px',
                                lineHeight: '40px',
                                overflowX: 'hidden',  
                                borderBottom: 'black solid 2.5px',
                                textDecorationColor: 'rgba(0, 0, 0, 0.5)',
                                zIndex: 5
                            }}
                            onChange={
                                (e)=>{
                                    if(e.target.value !== ''){
                                        updateid({
                                            status: true,
                                            text: inputRef.current.value
                                        })
                                        e.target.style.borderBottom = 'none'
                                    }
                                    else{
                                        updateid(prev=>({
                                            text: '',
                                            status: false
                                        }))
                                        e.target.style.borderBottom = 'black solid 2.5px'    
                                    }

                                    e.target.style.height='fit-content';
                                    e.target.style.height=e.target.scrollHeight + 'px'
                                }
                                }>
                            </textarea>

                        

                        </div>

                        {ID.status
                        ?<CANCEL_REPLY_COMPONENT
                        logic={()=>{
                            inputRef.current.value = ''
                            inputRef.current.style.borderBottom = 'black solid 2.5px'
                        }}
                        verified={props.user.status}
                        status={ID.status}
                        text={ID.text}
                        user={props.user}
                        origin={props.origin}
                        source={props.source}
                        ></CANCEL_REPLY_COMPONENT>
                        :''}

</React.Fragment>
}

export default REPLOY_BOX;