import React, { useEffect, useState } from "react";

import {useDispatch, useSelector} from 'react-redux';
import { ActionCreater } from "../../../../2_reducer/reducer";

import { Map, AdvancedMarker, useMapsLibrary, useMap} from '@vis.gl/react-google-maps'

import NearbySearchResult_Marker from '../Google_Map_Api_Components/nearbySearch_Service_Components/nearbySearchResult_Marker'
import NearbySearch_Result_TabResult from '../Google_Map_Api_Components/nearbySearch_Service_Components/nearbySearchResult_TabResults'
import Fork_Icon from '../../../../1_image_or_icon/Fock_icon.jpg'
import Marker from "./Google_Map_Markers";

export const Google_Map = () => {

const Keyword = useSelector(state => state.urlToString)
const GoogleMap_Deafult_Option = useSelector(state => state.urlObject)
const dispatch = useDispatch()

let Map_Instance = useMap('Google_Map');
let Place_Library = useMapsLibrary('places');


const INITIAL_CAMERA = {
        defaultZoom : 15,
        defaultCenter : {lat: 0, lng: 0}
    }

const INITIAL_MARKER = {
        position : {lat: 0, lng: 0}
    }

const [cameraProps, setCameraProps] = useState(INITIAL_CAMERA);
const [markerProps, setMarkerProps] = useState(INITIAL_MARKER);

const [Google_Map_Search_Option, updateOption ] = useState({
    type: ['restaurant'],
    distance: GoogleMap_Deafult_Option.get('distance')||'500'
})
const [List_Around_spot, updateSpots] = useState([]);
const [Opening_Hours, updatePeriod ] = useState({});
const [PhoneNumbers, updaateNumbers]= useState([]);
const [StartSpot, updateStart] = useState();

    const UpdateMap = (latitude, longitude) => {

        setMarkerProps({
            position: {lat: latitude, lng: longitude}
        })

        setCameraProps({ 
            defaultZoom : 15,
            center: {lat: latitude, lng: longitude}
        })
    }

    const Location_Loaded_Success_CallBack = (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        UpdateMap(latitude,longitude)
    }

    const Current_Location_Loading = async () => {
            if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                
            Location_Loaded_Success_CallBack
    
            )}
    }

    const Load_Existed_Keyword = async () => {
        
        if (!Place_Library || !Map_Instance) return;
        const svc = new Place_Library.PlacesService(Map_Instance);      

        // svc.findPlaceFromQuery({
        //     query: `${Keyword}` ,fields :[
        //         'geometry.location','name', 'formatted_address','photos','types']
        // },  (result)=>{ 
        //     console.log(result)
        //     updateStart(result)
        //     const Existed_Keyword = result[0].geometry.location
        //     UpdateMap( Existed_Keyword.lat(), Existed_Keyword.lng() )

        //     svc.nearbySearch({

        //         location: {lat: Existed_Keyword.lat(), lng: Existed_Keyword.lng()},
        //         radius: Google_Map_Search_Option.distance,
        //         type: Google_Map_Search_Option.type[0],
        //         rankBy: 0

        //     },(result)=>{
        //         updateSpots(result)
        //         let TimeStamp = [];
        //         let PhoneStamp = [];
        //         result.map((spot)=>{

        //             svc.getDetails({
        //                 placeId: spot.place_id,
        //                 fields: ['opening_hours','formatted_phone_number', 'utc_offset_minutes']
        //             },(result)=>{
        //                 const opening_hours = result.opening_hours
        //                 const phone_numbers = result.formatted_phone_number
                
        //                 switch(typeof opening_hours){
        //                     case('undefined'):
        //                     TimeStamp.push(opening_hours)
        //                     updatePeriod(TimeStamp)
        //                     break;

        //                     case('object'):
        //                     TimeStamp.push(opening_hours)
        //                     updatePeriod(TimeStamp)
        //                     break;
        //                 }
                        
        //                 switch(typeof phone_numbers){
        //                     case('undefined'):
        //                     PhoneStamp.push(phone_numbers)
        //                     updaateNumbers(PhoneStamp)
        //                     break;

        //                     case('string'):
        //                     PhoneStamp.push(phone_numbers)
        //                     updaateNumbers(PhoneStamp)
        //                     break;
        //                 }
                        
        //             })
        //         })
        //     })

        // })

        


    }

    const StartSpot_Align = (input) => {
        switch(typeof input){
            
            case('undefined'):
            return;

            case('object'):
            return <React.Fragment>

            <div
            style={{
                width: 'inherit',
                // height: '30vh',
                border: 'black solid 3px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent:'space-around',
                alignItems: 'center',
                margin: '3vh 9vw',
                borderRadius: '10px',
                padding: '',
                position: 'relative',
                left: '2vw'
            }}
            >

            

            <div
            style={{
                textAlign: 'center',
                margin: '1vh 0vw',
                width: 'inherit',
                backgroundColor: 'white',
                padding: '1vh 16vw',
                lineHeight: '2.5vh',
                fontSize: '3vw',
                borderRadius: '10px',
                border: 'black solid 3px'
            }}
            >
                Location 
                <br></br>
                You Entered
            </div>

            

            {input[0].photos.map((element)=>{
                return <img
                style={{
                    width: '40vw',
                    aspectRatio: '1',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    border: 'solid white 3px'
                }}

                src={element.getUrl()}
                ></img>
            })}
            <div
            style={{
                backgroundColor: 'white',
                border: 'black solid 3px',
                borderRadius: '10px',
                margin: '1vh 0vw 0vh 0vw',
                fontSize: '3vw',
                padding: '0.5vh 2vw'
            }}
            >
            {input[0].name}
            </div>

            <div
            style={{
                backgroundColor: 'white',
                border: 'black solid 3px',
                borderRadius: '10px',
                margin: '1vh 0vw',
                fontSize: '3vw',
                padding: '0.5vh 2vw',
                // textAlign
            }}
            >
            {input[0].formatted_address.split(' ').map((element,index)=>{
                switch(index){
                    case(2):
                    return <React.Fragment>
                        <br></br>
                        <span> &nbsp; {element}</span> 
                    </React.Fragment>

                    default: return <span>
                    &nbsp; {element} 
                    </span>
                }
            })}
            </div>

            </div>

            </React.Fragment>
        }
    }

    useEffect(()=>{

        switch(Keyword){

            case(''):
            Current_Location_Loading()
            return;
            

            default:
            Load_Existed_Keyword()
            break;
            
        }

        switch(typeof GoogleMap_Deafult_Option.get('type')){
            
            case('string'):
            dispatch(ActionCreater('UpdateUrl','type',GoogleMap_Deafult_Option.get('type')))
            updateOption({
                ...Google_Map_Search_Option,
                type: GoogleMap_Deafult_Option.get('type').replaceAll(',',' ').split(' ')
                })
            break;

            case('object'):
            break;
        }

        // console.log(Opening_Hours)

    },[Place_Library, Map_Instance])

return <React.Fragment>


                <Map id='Google_Map'
                     mapId='a6ea1c40e5d4c5a'
                
                    style={ 
                        { width:'inherit',
                        height:'20vh',
                        backgroundColor:'white',
                        margin: '3vh 6vw 0 10vw',
                        border: 'black solid 5px'
                        }}
                    
                    {...cameraProps}
                        onDragstart={()=>{
                        const New_Default = {}
                        setCameraProps({defaultZoom:15,defaultCenter:{...New_Default}})
                    }}

                    >
                
                        <AdvancedMarker
                        {...markerProps}>
                            <Marker src={Fork_Icon} border={`solid black 3.5px`}/>
                        </AdvancedMarker>

                        <NearbySearchResult_Marker places={List_Around_spot}/>

                </Map>

                <input type="button"
                value={'Back-To-Spot'}
                style={{
                    width: '53.5vw',
                    marginLeft: '11vw',
                    marginTop: '1vh',
                    padding: '1vh 0',
                    borderRadius: '15px',
                    fontFamily: '큐트신민상',
                    letterSpacing: '0.5vw',
                    fontWeight: 'bold',
                    border: 'black solid 2px'
                }}
                onClick={
                    ()=>{
                        setCameraProps({
                            defaultZoom: 15,
                            center: {
                                lat: markerProps.position.lat,
                                lng: markerProps.position.lng}})
                    }
                }
                >
                </input>

            {StartSpot_Align(StartSpot)}                

                <div id='Google_Map_Option_Selector'
                style={{
                    display:'flex',
                    flexDirection: 'column',
                    padding: '1.5vh 7vw 0 11vw',
                    height: 'fit-content',
                    justifyContent: `space-around`
                }}
                >

                    <span style={{
                            fontSize: '3.75vw',
                            textAlign: 'center',
                            fontFamily: '큐트신민상',
                            lineHeight: '3vh'
                        }}>* Searching *
                        <br></br>
                        <span
                            style={{
                                wordSpacing: '1vw'
                            }}>
                        [&nbsp;
                            {Google_Map_Search_Option.type.map((element)=>{
                            return <React.Fragment>
                            
                                <span
                                style={{
                                    backgroundColor: 'white',
                                    padding: '0.5vh 1vw'
                                }}
                                onClick={(tab)=>{
                                    const Eliminate_Target = tab.target.textContent.toLowerCase()
                                    const Index = Google_Map_Search_Option.type.indexOf(`${Eliminate_Target}`)
                                    Google_Map_Search_Option.type.splice(Index, 1)
                                    updateOption({...Google_Map_Search_Option})
                                    dispatch(ActionCreater('UpdateUrl','type',Google_Map_Search_Option.type))
                                }}
                                >
                                {`${element.toUpperCase()}`}</span>
                                &nbsp; 
                                </React.Fragment>
                        })}&nbsp;]
                        </span>
                        
                        
                        <br></br>
                        in {Google_Map_Search_Option.distance}m boundery*</span>

                    <input id='placeSearch_Distance_RangeSelector' type='range' list='rangechart'
                        step='100' min='100' max='1000' 
                        name="distance" defaultValue={Google_Map_Search_Option.distance}
                        onChange={()=>{

                            const Distance_Value = document.getElementById('placeSearch_Distance_RangeSelector').value

                            updateOption({...Google_Map_Search_Option,
                                distance:Distance_Value
                            })
                            dispatch(ActionCreater('UpdateUrl','distance', Distance_Value))
                            }}
                    ></input>

                            <datalist id='rangechart'>
                                <option value="0" disabled hidden></option>
                                <option value="100"></option>
                                <option value="200"></option>
                                <option value="300"></option>
                                <option value="400"></option>
                                <option value="500" ></option>
                                <option value="600"></option>
                                <option value="700"></option>
                                <option value="800"></option>
                                <option value="900"></option>
                                <option value="1000"></option>
                            </datalist>

                    <select id='placeSearch_Type_RangeSelector' name="types" onChange={()=>{

                                const Type_Value = document.getElementById('placeSearch_Type_RangeSelector').value

                                const Type_Options = []
                                Google_Map_Search_Option.type.forEach(element => {
                                    Type_Options.push(element)
                                });

                                switch(Type_Options.includes(Type_Value)){

                                    case(true):
                                    return;

                                    case(false):
                                    Type_Options.push(Type_Value)
                                    updateOption({...Google_Map_Search_Option,
                                        type: Type_Options
                                    })
                                    dispatch(ActionCreater('UpdateUrl','type',Type_Options))
                                    return;

                                }
                                
                            }} defaultValue={Google_Map_Search_Option.type}
                            style={{
                                margin: '1vh 4vw',
                                textAlign: 'center',
                                padding: '0.5vh 0',
                                borderRadius: '15px',
                                fontFamily: '큐트신민상',
                                letterSpacing: '1.5px',
                                border: `black solid 2px`,
                            }}>
                        <option selected value="restaurant" >Select an Option</option>
                        <option value="restaurant" >RESTAURANT</option>
                        <option value="cafe">CAFE</option>
                        <option value="bar">BAR</option>
                    </select>

                </div>

                        <NearbySearch_Result_TabResult 
                            places={List_Around_spot}
                            timestamp={Opening_Hours}
                            phonestamp={PhoneNumbers}/>

</React.Fragment>

}

export default Google_Map