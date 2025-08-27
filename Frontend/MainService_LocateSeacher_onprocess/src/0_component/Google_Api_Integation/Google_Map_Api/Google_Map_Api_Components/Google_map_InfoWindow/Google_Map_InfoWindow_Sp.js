import React, { useRef } from "react";

import { InfoWindow } from '@vis.gl/react-google-maps'
import { ActionCreater } from "../../../../../2_reducer/reducer";
import { useDispatch, useSelector } from "react-redux";

const Google_Map_InfoWindow_Sp= (props) => {

    const Pre_List = useSelector(state=> state.SpotStorage)
    const dispatchPin = useDispatch()

    return <React.Fragment>
                
                    {Pre_List[`${props.index}`]&&Pre_List[`${props.index}`].info_windo
                        ?<InfoWindow
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
                                <span
                                onClick={
                                    ()=>{
                                        const Renew_List = {...Pre_List,
                                            [`${props.index}`] : {
                                                spot_info: Pre_List[`${props.index}`].spot_info,
                                                info_windo: false
                                            }
                                                            }
                                        

                                        dispatchPin(ActionCreater(
                                            'UpdateList','',Renew_List
                                        ))
                                        }
                                }
                                >
                                    {props.spot_info}
                                </span>
                                

                    </InfoWindow>
                    :''}
                
    </React.Fragment>

}

export default Google_Map_InfoWindow_Sp