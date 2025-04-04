import React, { useEffect, useState } from "react";

export const NEARBYSEARCH_NORESULT = (props) => {

    const [NoResult_Component, updateComponent] = useState();

    useEffect(()=>{

        if(props.places.length === 0){
            console.log('no nearby result')
            updateComponent(<React.Fragment>

                <div
                style={{
                    position: 'relative',
                    bottom: '90px',
                    width: '110%',
                    justifyItems: 'center'
                }}
                >
                    
                    <div
                    style={{
                        width: '80%',
                        height: '10vh',
                        borderRadius: '15px',
                        backgroundColor: 'white',
                        border: 'black dashed 5px',
                        textAlign: 'center',
                        alignContent: 'center',
                        fontFamily: '큐트신민상',
                        fontWeight: 'bold'
                    }}
                    >
                 
                    <span
                    style={{
                        position: 'absolute',
                        left: '50px',
                        top: '28px',
                        fontSize: '35px'
                    }}
                    >!</span>
                 
                        <span
                        style={{
                            fontSize:'22px',
                            letterSpacing: '5px',
                            lineHeight: '30px'
                        }}
                        >
                        No Such
                        <br></br>
                         Places Found
                        </span>

                        <span
                    style={{
                        position: 'absolute',
                        right: '52px',
                        bottom: '35px',
                        fontSize: '35px'
                    }}
                    >!</span>

                    </div>

                </div>

            </React.Fragment>)               
        }

    },[])

    return NoResult_Component;

}

export default NEARBYSEARCH_NORESULT