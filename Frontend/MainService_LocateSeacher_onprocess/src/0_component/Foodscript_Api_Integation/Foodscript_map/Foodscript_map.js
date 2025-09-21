import React, { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Current_position_marker from "./foodscript_component_collection/current_position_component";
import Log_my_visit_btn from "./foodscript_component_collection/log_my_visit_btn";
import Register_my_business_btn from "./foodscript_component_collection/register_my_business_btn";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    });

export const Foodscript_map = () => {

const [Point, updatePoint] = useState(null)

const Load_Only_UserPosition = async () => {
        
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        let lat = position.coords.latitude;
                        let lng = position.coords.longitude;
                            resolve({lat: lat, lng: lng});
                    },
                    (error) => reject(error)
                );
            } else {
                reject("Geolocation을 지원하지 않는 브라우저입니다.");
            }
        });
        
    }
    
    useEffect(()=>{
        
                const run = async () =>{
        
                    const data = await Load_Only_UserPosition();
                    updatePoint([data.lat, data.lng])
                    console.log(Point)
                }
        
                run();
        
            },[])

    if (!Point) return <div>위치 불러오는 중...</div>;

    return <React.Fragment>


                <MapContainer center={Point} zoom={16} style={{ 
                    width: "80%",
                    minHeight: '300px',
                    border: 'black solid 5px' }}>
                        
                        <TileLayer url="https://api.foodscript.co.kr/hot/{z}/{x}/{y}.png" 
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        
                        <Current_position_marker
                        position={Point}
                        />

            
                </MapContainer>

                <Log_my_visit_btn/>
                <Register_my_business_btn/>
                

    </React.Fragment>

}

export default Foodscript_map;