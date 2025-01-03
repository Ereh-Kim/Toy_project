import React from "react";

import { Link } from "react-router-dom";

import HomeIcon from '../../../1_image_or_icon/house-icon.png'

export const Homepage_Btn = () => {

    return <React.Fragment>

        <Link to='../../../?TabNevBar=closed'>
        
            <img
            src={HomeIcon}
            style={{
                position:'relative',
                left: '6vw',

                backgroundColor: 'white',
                padding: '1vh 1vw',
                borderRadius: '10px'

            }}
            >
            </img>
        
        </Link>

    </React.Fragment>

}

export default Homepage_Btn