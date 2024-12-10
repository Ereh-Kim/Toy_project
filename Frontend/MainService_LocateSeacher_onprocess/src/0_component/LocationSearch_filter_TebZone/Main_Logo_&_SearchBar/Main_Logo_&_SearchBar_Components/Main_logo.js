import React from 'react'
import MainLogo from '../../../../1_image_or_icon/food_script_logo.png'

export const Main_Logo = () => {

    return <React.Fragment>

        <a href='/'>
            <img id='Main_Logo' src={MainLogo}></img>
        </a>

    </React.Fragment>    

}

export default Main_Logo