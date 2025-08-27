import React, { useEffect ,useRef, useState } from "react";

import { AdvancedMarker } from "@vis.gl/react-google-maps";
import {useDispatch, useSelector} from 'react-redux';
import { ActionCreater } from "../../../../../2_reducer/reducer.js";

import Google_Map_Marker from '../Google_Map_Markers'
import Google_Map_InfoWindow_Sp from "../Google_map_InfoWindow/Google_Map_InfoWindow_Sp.js";
import Src from '../../../../../1_image_or_icon/Fock_icon_SearchNear.png'

export const NearbySearch_Result = (props) => {

    const SpotList = useSelector(state => state.SpotStorage)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!props.places) return;
    
        let Initial_List = {};
        Object.entries(props.places).forEach(([spot, info], index) => {
          Initial_List = {
            ...Initial_List,
            [index]: {
              spot_info: info.displayName.text,
              info_windo: false,
            },
          };
        });
    
        dispatch(ActionCreater("InitailizeSpots", "none", Initial_List));
      }, [props.places, dispatch]);

    const Emiting_Places_Pins = (Places) => {

        return Places.map((place, index)=>{

            return <div>
            
            <AdvancedMarker
            key={index}
            position={{ lat:place.location.latitude
                       ,lng:place.location.longitude}}
            onClick={()=>{
                console.log(index)
                if(SpotList[`${index}`]&&SpotList[`${index}`].spot_info){
                const Renew_List = {...SpotList,
                    [`${index}`] : {
                        spot_info: SpotList[`${index}`].spot_info,
                        info_windo: true
                    }}

                dispatch(ActionCreater(
                    'UpdateList','',Renew_List
                ))
                    console.log(`i am clicked ${index}`)
                }
            }}
            >
            
                <Google_Map_Marker src={Src} width={'10vw'}
                />
            </AdvancedMarker>
                
                <Google_Map_InfoWindow_Sp
                    Latlng={{ lat:place.location.latitude
                            ,lng:place.location.longitude}}
                    spot_info={SpotList[`${index}`]
                                ?SpotList[`${index}`].spot_info
                                :''}
                    index={`${index}`}
                    />
                
                
            </div>
        })
    }

    return <React.Fragment>

    {Emiting_Places_Pins(props.places)}

    </React.Fragment>

}

export default NearbySearch_Result;