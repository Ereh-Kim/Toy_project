import React from "react";

import { InfoWindow } from '@vis.gl/react-google-maps'

const Google_Map_InfoWindow_TA = (props) => {

    return <React.Fragment>
                
                    {props.target_state
                    ?<div
                    onClick={props.target_toggler}
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
                                    {props.target_info}
                                </span>
                                

                    </InfoWindow>
                    </div>
                    :''}
                    

    </React.Fragment>

}

export default Google_Map_InfoWindow_TA