import React, { useEffect, useState } from "react";

import { useMap, useMapsLibrary, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

import Fork_Icon from '../../../../../1_image_or_icon/Fock_icon.jpg'
import Marker from '../Google_Map_Markers'
import { useParams } from "react-router-dom";

import Pocket_Icon_Bar from '../../../../../1_image_or_icon/Pocket_icon_Bar.png'
import Pocket_Icon_Restaurant from '../../../../../1_image_or_icon/Pocket_icon_Restaurant.png'
import Pocket_Icon_Cafe from '../../../../../1_image_or_icon/Pocket_icon_Cafe.png'

import Detail_Image_Reviews_Section from "./Detail_Image_Reviews_section";
import Detail_Video_section from "./Detail_Video_section";
import Detail_Journey_section from "./Detail_Journey_section";

import Three_Option_integrator from './Three_Option_Tabbox/Three_Option_integrated_box'

export const Default_Info = () => {

    let Map_Instance =useMap('Google_Map')
    let Place_Library = useMapsLibrary('places')
        
    let params = useParams()

    const INITIAL_CAMERA = {
        defaultZoom : 15,
        defaultCenter : {lat: 0, lng: 0}
    }

    const INITIAL_MARKER = {
        position : {lat: 0, lng: 0}
    } 

    
    const Place_Pocket_Icon_Inspector = (input) => {
        switch(typeof input.types){
            case('object'):
            switch(input.types[0]){
                case('cafe'):
                return Pocket_Icon_Cafe
            
                case('restaurant'):
                return Pocket_Icon_Restaurant
                
                case('bar'):
                return Pocket_Icon_Bar
            }
            case('undefined'):
            return
        }
    }


    const Formatted_address_Aligner = (input) => {
        switch(typeof input.formatted_address){
            case('undefined'):
            return;

            case('string'): return <span>
                {input.formatted_address.split(' ').map((element,index)=>{                    

                    switch(index%2){

                        case(1):
                            switch(index){
                                case(input.formatted_address.split(' ').length-1): 
                                return <span> &#32;{element}</span>

                                default: return <React.Fragment>
                                <span>&#32;{element}</span>
                                <br></br>
                                </React.Fragment>
                            }

                        default: return <span> &#32;{element}</span>

                    }
                    
                    
                
                })}</span>
        }
    }

    const Place_Name_Aligner = (input) => {
        switch(typeof input.name){
            case('string'):
                return input.name.split(' ').map((element)=>{
                        return <React.Fragment>
                        <span>{element}</span>
                        </React.Fragment>
                     })
             case('undefined'):
             return;
        }
    }

    const GetDetail = async (input) => {
        
        let result = await fetch(`http://localhost:8080/google_map_api/fetch_getDetail/${input}`)
        const result_data = await result.json()
        console.log(result_data)

        // updateInfo(result_data.data)


    }

    const [cameraProps, setCameraProps] = useState(INITIAL_CAMERA);
    const [markerProps, setMarkerProps] = useState(INITIAL_MARKER);
    const [PlaceInfo, updateInfo] = useState({})

    useEffect(()=>{
        if (!Place_Library || !Map_Instance) return;
        var svc = new Place_Library.PlacesService(Map_Instance); 
        
        // GetDetail(params.placeid)

        svc.getDetails({
            fields: ['name','formatted_address','formatted_phone_number','types'
                ,'photos', 'geometry','reviews'
            ],
            placeId: params.placeid,
        },(result)=>{
            
            updateInfo(result)
            setCameraProps({
                defaultZoom : 15,
                center : {lat: result.geometry.location.lat()
                        , lng: result.geometry.location.lng()}})
            setMarkerProps({
                position : {lat: result.geometry.location.lat()
                        , lng: result.geometry.location.lng()}
            })
        })
        
    },[Place_Library,Map_Instance])

    return <React.Fragment>

    <div id='place_detail_container'>
        
            <div style={{
                fontFamily:'큐트신민상',
                fontSize:'5vw',
                display:'flex',
                flexDirection:'row',
                border: 'solid black 3px',
                borderRight: 'black solid 7px',
                borderBottom: 'black solid 7px',
                borderRadius: '15px',

            }}>
                 <img 
                 src={Place_Pocket_Icon_Inspector(PlaceInfo)}
                 style={{
                    maxWidth:'10vw',
                    maxHeight:'5vh',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '1vh 2vw',
                    borderRight: 'black solid 7px',
                    borderBottom: 'black solid 7px'
                 }}
                 ></img>
                 
                 <div
                 style={{
                    minHeight: '8vh',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '1vh 0 1vh 3vw',
                    fontWeight: 'bold',
                    letterSpacing: '1.5px',
                    lineHeight: '3vh'
                 }}
                 >
                 {Place_Name_Aligner(PlaceInfo)}
                 </div>
            </div>
            <br></br>
        
        <div className="Default_Info_HighLighter">

            <span className="Default_Info_TextSection">
                <span style={{
                    fontWeight:'bold'
                }}>
                 &#8226; ADDRESS. 
                 </span>
                    <span
                    style={{
                        lineHeight:'2.5vh',
                        textAlign: 'left',
                        display: "grid",
                        position: 'relative',
                        left: '21.5vw',
                        bottom: '2.2vh',
                        fontSize: '3.5vw'
                    }}
                    >
                    {Formatted_address_Aligner(PlaceInfo)}
                    </span>
            </span>
        </div>
        
            <br></br>

        <div className="Default_Info_HighLighter">
        
            <span className="Default_Info_TextSection">
                <span style={{
                    fontWeight:'bold'
                }}>
                &#8226; TEL. 
                </span>
                 {PlaceInfo.formatted_phone_number}
            </span>
            <br></br>

        </div>

        <Map
        id='Google_Map'
        mapId='a6ea1c40e5d4c5a'
        style={{
            height: '40vh',
            width: '62vw',
            margin: '5vh 0vw',
            border: 'black solid 4px',
            borderRadius: '10px'
        }}
        {...cameraProps}>
        
        

            <AdvancedMarker
            {...markerProps}>
                <Marker src={Fork_Icon} border={`solid black 3.5px`}/>
            </AdvancedMarker>

        </Map>

        <Detail_Image_Reviews_Section
        photos={PlaceInfo.photos} 
        reviews={PlaceInfo.reviews}
        placeid={params.placeid}
        />

        <Detail_Video_section/>
        <br></br>
        <Detail_Journey_section/>
        <br></br>

        <Three_Option_integrator/>
        <br></br>

    </div>

    
    </React.Fragment>

}

export default Default_Info