import React, { useEffect } from "react";

export const CANCEL_REPLY_COMPONENT = (props) => {

    return <React.Fragment>
    {props.status
    ?<div
                            style={{
                                alignSelf:'end',
                                position: 'relative',
                                top: '-15px',
                                height: 'fit-content',
                                zIndex:'1'
                            }}

                            onClick={async ()=>{
                                switch(props.verified){
                                    case('verified'):
                                        const USERDATA = props.user.userinfo

                                        await fetch('/usercreation/post_reply',{
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                user_id: USERDATA.id,
                                                user_comment: props.text,
                                                parent_post_id: props.origin,
                                                source: props.source
                                            })
                                        })
                                        
                                        alert('You posted your new reply')
                                        props.logic()
                                    break;
                                        
                                    case('unverified'):
                                        alert('You need to login to post a comment.')


                                }

                                
                                // console.log(props)
                            }}

                            >

                                <span
                                style={{
                                    fontWeight: 'bold',
                                    padding:'3px 10px',
                                    border:'black 3px solid',
                                    borderRadius: '30px',
                                    backgroundColor: '#FF8000'
                                }}
                                >
                                    submit
                                </span>

    </div>
    :''                     
    }
                            
                            
    </React.Fragment>



}

export default CANCEL_REPLY_COMPONENT;