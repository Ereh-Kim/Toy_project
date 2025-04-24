import React, { useEffect, useState } from "react";

import {useDispatch, useSelector} from 'react-redux';
import { ActionCreater } from "../../../../2_reducer/reducer";

import { Map, AdvancedMarker, useMapsLibrary, useMap} from '@vis.gl/react-google-maps'
import NEARBYSEARCH_NORESULT from "./nearbySearch_Service_Components/nearbySearchResult_NoResult";
import NEARBYSEARCHRESULT_MARKER from '../Google_Map_Api_Components/nearbySearch_Service_Components/nearbySearchResult_Marker'
import NEARBYSEARCH_RESULT_TABRESULT from '../Google_Map_Api_Components/nearbySearch_Service_Components/nearbySearchResult_TabResults'
import FORK_ICON from '../../../../1_image_or_icon/Fock_icon.jpg'
import USERSUB_ICON from '../../../../1_image_or_icon/user_sub_icon_map.jpg'
import MARKER from "./Google_Map_Markers";

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
const [CLIENT_markerProps, setCLIENT_MarkerProps] = useState(INITIAL_CAMERA)

const [Google_Map_Search_Option, updateOption ] = useState({
    type: ['restaurant'],
    distance: GoogleMap_Deafult_Option.get('distance')||500
})
const [List_Around_spot, updateSpots] = useState([]);
const [Opening_Hours, updatePeriod ] = useState({});
const [PhoneNumbers, updaateNumbers]= useState([]);
const [StartSpot, updateStart] = useState();

    const UpdateMap = (latitude, longitude, situation) => {

        switch(situation){
            case('client_location'):
                setCLIENT_MarkerProps({
                    position: {lat: latitude, lng: longitude}
                })

                setCameraProps({ 
                    defaultZoom : 15,
                    center: {lat: latitude, lng: longitude}
                })
            break;

            case('target_location'):
                setMarkerProps({
                    position: {lat: latitude, lng: longitude}
                })

                setCameraProps({ 
                    defaultZoom : 15,
                    center: {lat: latitude, lng: longitude}
                })
            break;
        }
    }

    const Load_Only_UserPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                
            (position)=>{
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;                  
                setCLIENT_MarkerProps({
                    position: {lat: latitude, lng: longitude}
                })    
            }

            )}
    }

    const Location_Loaded_Success_CallBack = (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        UpdateMap(latitude,longitude, 'client_location')
    }

    const Current_Location_Loading = async () => {
            if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                
            Location_Loaded_Success_CallBack
    
            )}
    }

    const Current_Address_Loading = () => {
        
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        let lat = position.coords.latitude;
                        let lng = position.coords.longitude;
    
                        let response = await fetch(`/google_map_api/fetch_address/${lat}/${lng}`, {
                            method: 'GET'
                        });
    
                        let result = await response.json();
                        resolve(result);
                    },
                    (error) => reject(error),
                    {
                        enableHighAccuracy: true,
                        maximumAge: 0
                    }
                );
            } else {
                reject("Geolocation을 지원하지 않는 브라우저입니다.");
            }
        });
    };
    
    

    const Load_Existed_Keyword = async () => {
        
        if (!Place_Library || !Map_Instance) return;
        const svc = new Place_Library.PlacesService(Map_Instance);      

        let TEXTINPUT;
        TEXTINPUT = Keyword

                // start_spot fetch --- 1

                let fetch_data = await fetch(`/google_map_api/fetch_start_spot_ver_new/${TEXTINPUT}`,{
                    method: 'GET'
                })
                let fetch_data_result = await fetch_data.json()
                console.log(fetch_data)
                let spot_data = fetch_data_result.places[0]

        // // start_spot img fetch --- 2

                let fetch_data_img_result = undefined;
                if(spot_data.photos !== undefined){
                    fetch_data_img_result = spot_data.photos[0].googleMapsUri
                }
                
                spot_data = {...spot_data, photos: fetch_data_img_result}
                const spot_data_lat = spot_data.location.latitude
                const spot_data_lng = spot_data.location.longitude

        updateStart(spot_data)
        UpdateMap( spot_data_lat, spot_data_lng, 'target_location' )
        Load_Only_UserPosition()

        // NearByResult fetch --- 3

                const type_input = encodeURIComponent(JSON.stringify(Google_Map_Search_Option.type))
                const lat_input = JSON.stringify(spot_data_lat).replaceAll('.','_')
                const lng_input = JSON.stringify(spot_data_lng).replaceAll('.','_')

                let nearbyresult = await fetch(`/google_map_api/fetch_nearbyresult/${type_input}/${lat_input}/${lng_input}/${Google_Map_Search_Option.distance}`,{
                    method: 'GET',
                    })
        
        let nearbyresult_result = await nearbyresult.json()
        nearbyresult_result = JSON.stringify(nearbyresult_result.places)   

        // NearByResult img fetch ---3.1

                let nearbyresult_img = await fetch(`/google_map_api/fetch_nearbyresult_img`,{
                    method: `POST`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: nearbyresult_result
                })

        let nearbyresult_img_result = await nearbyresult_img.json()

        const data_result = nearbyresult_img_result.data
        updateSpots(data_result)

        // phonenumber_timestamp align
                
                let TimeStamp = [];
                let PhoneStamp = [];
                    
                for(let t=0; t<data_result.length; t++){

                let opening_hours = data_result[t].regularOpeningHours
                let phone_numbers = data_result[t].nationalPhoneNumber
            
                TimeStamp.push(opening_hours)
                PhoneStamp.push(phone_numbers)

                }
        
        updaateNumbers(PhoneStamp)
        updatePeriod(TimeStamp)

    }

    const Load_From_Current_Location = async (input) => {
        
        
        if (!Place_Library || !Map_Instance) return;
        const svc = new Place_Library.PlacesService(Map_Instance);      

        let TEXTINPUT;
        TEXTINPUT = input

        // start_spot fetch --- 1

                let fetch_data = await fetch(`/google_map_api/fetch_start_spot_ver_new/${TEXTINPUT}`,{
                    method: 'GET'
                })
                let fetch_data_result = await fetch_data.json()
                let spot_data = fetch_data_result.places[0]

        // // start_spot img fetch --- 2

                let fetch_data_img_result = undefined;
                if(spot_data.photos !== undefined){
                    fetch_data_img_result = spot_data.photos[0].googleMapsUri
                }
                
                spot_data = {...spot_data, photos: fetch_data_img_result}
                const spot_data_lat = spot_data.location.latitude
                const spot_data_lng = spot_data.location.longitude

        updateStart(spot_data)
        UpdateMap( spot_data_lat, spot_data_lng, 'target_location' )
        Load_Only_UserPosition()

                console.log(spot_data, spot_data_lat, spot_data_lng)

        // // NearByResult fetch --- 3

                const type_input = encodeURIComponent(JSON.stringify(Google_Map_Search_Option.type))
                const lat_input = JSON.stringify(spot_data_lat).replaceAll('.','_')
                const lng_input = JSON.stringify(spot_data_lng).replaceAll('.','_')

                let nearbyresult = await fetch(`/google_map_api/fetch_nearbyresult/${type_input}/${lat_input}/${lng_input}/${Google_Map_Search_Option.distance}`,{
                    method: 'GET',
                    })
        
        let nearbyresult_result = await nearbyresult.json() 
        nearbyresult_result = JSON.stringify(nearbyresult_result.places)   
       
        // // NearByResult img fetch ---3.1

                let nearbyresult_img = await fetch(`/google_map_api/fetch_nearbyresult_img`,{
                    method: `POST`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: nearbyresult_result
                })

        let nearbyresult_img_result = await nearbyresult_img.json()

        const data_result = nearbyresult_img_result.data
        updateSpots(data_result)

        // // phonenumber_timestamp align
                
                let TimeStamp = [];
                let PhoneStamp = [];
                    
                for(let t=0; t<data_result.length; t++){

                let opening_hours = data_result[t].regularOpeningHours
                let phone_numbers = data_result[t].nationalPhoneNumber
            
                TimeStamp.push(opening_hours)
                PhoneStamp.push(phone_numbers)

                }
        
        updaateNumbers(PhoneStamp)
        updatePeriod(TimeStamp)
                return spot_data
    }

    const StartSpot_Align = (input) => {
        let Included_Anchor = ''

        if(typeof input !== 'undefined'){
            input.types.forEach((element)=>{
                if(element === 'restaurant'){
                    Included_Anchor = `/search/location/places/${input.place_id}`
                }
                console.log(Included_Anchor)
            })
        }
        
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

            
                <a
                href={Included_Anchor}
                target="_blank"
                style={{
                    display: 'grid'
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
                
            
                    <img
                        style={{
                            width: '40vw',
                            aspectRatio: '1',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            border: 'solid white 3px',
                            justifySelf: 'center'
                        }}

                        src={input.photos}
                        alt="none"
                    ></img>
                    

                </a>
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
            {input.displayName
            ?input.displayName.text
            :input.name
            }
            </div>

            <div
            style={{
                backgroundColor: 'white',
                border: 'black solid 3px',
                borderRadius: '10px',
                margin: '1vh 0vw',
                fontSize: '3vw',
                padding: '0.5vh 2vw',
            }}
            >
            {input.formatted_address
            ?input.formatted_address.split(' ').map((element,index)=>{
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
            })
            :input.formattedAddress
            }
            </div>

            </div>

            </React.Fragment>

            default:
            break;
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

            default:
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
                        onZoomChanged={()=>{
                        const New_Default = {}
                        setCameraProps({defaultZoom:15,defaultCenter:{...New_Default}})    
                    }}

                    >
                
                        <AdvancedMarker
                        {...markerProps}>
                            <MARKER src={FORK_ICON} border={`solid black 3px`} width={'6vw'}/>
                        </AdvancedMarker>

                        <AdvancedMarker
                        {...CLIENT_markerProps}>
                            <MARKER src={USERSUB_ICON} border={`solid black 3px`} width={'6vw'}/>
                        </AdvancedMarker>

                        <NEARBYSEARCHRESULT_MARKER places={List_Around_spot}/>

                </Map>

                <input type="button"
                value={`${"\u{1F52D}"} Find From My Location ${"\u{1F52D}"}`}
                style={{
                    width: '53.5vw',
                    marginLeft: '11vw',
                    marginTop: '1vh',
                    padding: '1vh 0',
                    borderRadius: '15px',
                    fontFamily: '큐트신민상', 
                    fontSize: '12px',
                    letterSpacing: '0.5vw',
                    fontWeight: 'bold',
                    border: 'black solid 2px',
                    backgroundColor: '#FDFD96',
                }}
                onClick={
                 async ()=>{
                    let current_address = await Current_Address_Loading()
                    // console.log(current_address)

                    let result = await Load_From_Current_Location(current_address)
                    console.log(result)
                    
                 }   
                }
                >
                </input>

                <input type="button"
                value={'Back-To-Searched-Spot'}
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

                        if(markerProps.position.lat === INITIAL_MARKER.position.lat
                            && markerProps.position.lng === INITIAL_MARKER.position.lng
                        ){
                            alert(' Any Spot yet Searched ')
                            return;
                        }

                        setCameraProps({
                            zoom: 15,
                            center: {
                                lat: markerProps.position.lat,
                                lng: markerProps.position.lng}})
                    }
                }
                >
                </input>

                <input type="button"
                value={'Back-To-Current-Position'}
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
                            zoom: 15,
                            center: {
                                lat: CLIENT_markerProps.position.lat,
                                lng: CLIENT_markerProps.position.lng}})
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

                        <NEARBYSEARCH_RESULT_TABRESULT 
                            places={List_Around_spot}
                            timestamp={Opening_Hours}
                            phonestamp={PhoneNumbers}/>

                        {/* <NEARBYSEARCH_NORESULT
                            places={List_Around_spot}/> */}

</React.Fragment>

}

export default Google_Map