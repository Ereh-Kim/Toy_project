import React from 'react'

import logo from '../../../1_image_or_icon/food_script_logo.png'

export const Main_Logo = (props) => {
    
    return(
        <React.Fragment>
            <a href="/homepage">
            <img src={logo}
            id='Main_Logo' />
            </a>
        </React.Fragment>
    )
}

export default Main_Logo