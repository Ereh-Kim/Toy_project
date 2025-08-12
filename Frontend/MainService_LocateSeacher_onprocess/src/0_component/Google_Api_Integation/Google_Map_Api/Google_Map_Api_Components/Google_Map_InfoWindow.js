import React, { useState } from "react";

import { InfoWindow } from '@vis.gl/react-google-maps'

const Google_Map_InfoWindow = (props) => {

    const [State, updateState ] = useState(false)

    return <React.Fragment>

            
                <div
                onClick={(e)=>{
                    e.target.style.display = 'none'
                }}
                >

                    <InfoWindow
                        position={props.Latlng}
                        style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden'
                        }}          
                        headerDisabled= {true}
                        
                    >
                                <span>
                                    {props.InfoText}
                                </span>
                                

                    </InfoWindow>
        
                    </div>

    </React.Fragment>

}

export default Google_Map_InfoWindow