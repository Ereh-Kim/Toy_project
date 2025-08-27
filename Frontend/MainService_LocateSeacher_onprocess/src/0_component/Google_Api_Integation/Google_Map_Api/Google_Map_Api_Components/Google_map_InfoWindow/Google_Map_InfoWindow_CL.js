import React from "react";

import { InfoWindow } from '@vis.gl/react-google-maps'

const Google_Map_InfoWindow_CL = (props) => {

    return <React.Fragment>
                
                    {props.client_state
                    ?<div
                    onClick={props.client_toggler}
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
                        disableAutoPan= {true}
                    >
                                <span>
                                    {props.client_info}
                                </span>
                                

                    </InfoWindow>
                    </div>
                    :''}
                    

    </React.Fragment>

}

export default Google_Map_InfoWindow_CL