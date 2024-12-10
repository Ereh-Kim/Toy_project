import React from "react";

import { Pin } from "@vis.gl/react-google-maps";

export const Marker = (props) => {

    const MarkerIcon = document.createElement('img')
    MarkerIcon.src = props.src
    
    MarkerIcon.style.width = '10vw'
    MarkerIcon.style.borderRadius = '50px'
    MarkerIcon.style.transform = `rotate(45deg)`
    MarkerIcon.style.border = props.border
    MarkerIcon.style.position = `relative`
    MarkerIcon.style.top = '10px'

    return <React.Fragment>

    
    <Pin glyph={MarkerIcon} scale={0}></Pin>

    </React.Fragment>

}

export default Marker;