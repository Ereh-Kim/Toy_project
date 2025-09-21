import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TIMESTAMP from "./Timestamp";

export const Reply_List = (props) =>{

    const [REPLY_LIST, updateREPLIES] = useState({})
    const [REPLYER_LIST, updatePROFILES] = useState({})

    useEffect(()=>{

        const run = async()=>{
            
            let reply_result = await fetch(`/usercreation/read_reply/${props.origin}/${props.source}`)
            const data = await reply_result.json()
            updateREPLIES(data)

            if(data.result !== undefined && data.result.length !== 0){
            data.result.map(async (element)=>{
                let profile = await fetch(`/usercreation/read_replyer/profile_picture/${element.user_id}`)
                profile = await profile.json()

                console.log(profile.url, profile.name)

                updatePROFILES(prev=>({
                    ...prev,
                    [`${element.user_id}`]: {
                        url: profile.url,
                        name: profile.name
                        }
                }))
            })}
            else{

            }
            
        }
        run();

    },[])

    return <React.Fragment>


        {typeof REPLY_LIST.result == 'undefined'
        ?''
        :<div
                                style={{
                                    width: '70%',
                                    height: '250px',
                                    backgroundColor: 'white',
                                    justifyItems:'center',
                                    padding: '10px 15px',
                                    borderRadius: '15px',
                                    overflow: 'scroll',
                                    border: 'dashed 3px black',
                                    justifySelf: 'center'
                                }}
                            >
                                
                                <div
                                style={{
                                    fontSize: '25px',
                                    padding: '10px 0 20px 0'

                                }}
                                >
                                    REPLIES
                                </div>

    <div
    style={{
        display: 'grid',
        rowGap: '30px',
    }}
    >

        {REPLY_LIST.result.map((element)=>{
            return <React.Fragment>
                    
                <div
                style={{
                    height: 'fit-content',
                    justifyItems: 'start',
                    border: 'black solid 3px',
                    padding: '15px 10px',
                    borderRadius: '10px',
                }}
                >
                    <div
                    style={{
                        display: 'flex',
                        width:'fit-content'
                    }}
                    >
                        <img
                        src={REPLYER_LIST[`${element.user_id}`]
                            ?REPLYER_LIST[`${element.user_id}`].url
                            :''}
                        style={{
                            width:'40px',
                            height: '40px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            border: 'black solid 3px'
                        }}

                        ></img>

                            <div
                            style={{
                                lineHeight: '25px',
                                position: 'relative',
                                left: '10px',
                                top: '2px'
                            }}
                            >   
                                <span
                                style={{
                                    fontSize:'18px'
                                }}
                                >
                                {REPLYER_LIST[`${element.user_id}`]
                                ?REPLYER_LIST[`${element.user_id}`].name
                                :''}
                                </span>

                                <br></br>

                                <div
                                style={{
                                    position:'relative',
                                    right: '10px',
                                    // whiteSpace: 'nowrap',      
                                    // wordBreak: 'keep-all',     
                                    // overflowWrap: 'normal'
                                }}
                                >
                                <TIMESTAMP
                                timestamp = {element.created_at}
                                />
                                </div>

                            </div>

                    </div>

                            <div
                            style={{
                                borderBottom:'solid black 3px',
                                borderRight:'solid black 3px',
                                borderTop: 'solid black 1px',
                                borderLeft: 'solid black 1px',

                                width: '85%',
                                margin: '12.5px 0 0 0',
                                padding: '10px',
                                borderRadius: '15px',

                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-all',
                            }}
                            >
                                <div>
                                {element.user_comment}
                                </div>

                            </div>
                </div>
            </React.Fragment>

        })}

    </div>

                            </div>}
    </React.Fragment>
}

export default Reply_List;