import React from "react";

import { Link } from 'react-router-dom'

import Business_icon from '../../1_image_or_icon/cooking-chef-cap-icon.png'
import Reviewer_icon from '../../1_image_or_icon/pen2.png'
import Tabicon from '../../1_image_or_icon/food_script_tabicon.png'
import Arrow from '../../1_image_or_icon/Arrow_Button_UpAhead.png'

export const Registration_Default_Page = () => {

    return <React.Fragment>
    
    <div
    style={{
    width:'inherit',
    height:'inherit',
    
    display:'flex',
    flexDirection:'row',

    justifyContent:'center',
    alignItems: 'center'
    }}
    >

    <a
    href="../"
    >
    <img
    src={Arrow}
    style={{
        width: '10vw',

        position: 'absolute',
        top: '3vh',
        left: '6vw',

        transform: 'rotate(270deg)'
    }}
    ></img>
    </a>

        <div
        style={{
        display:'flex',
        flexDirection:'row'
        }}
        >

            <Link to='/business'>
                <div
                className="Registration_btn"
                >
                    <img
                    src= {Business_icon}
                    style={{
                    width: '15vw'
                    }}
                    ></img>
                    <span>
                    Create Account <br></br> For Business
                    </span>
                </div>
            </Link>



            <Link to='/reviewer'>
                <div
                className="Registration_btn"
                >
                    <img
                    src= {Reviewer_icon}
                    style={{
                    width: '13vw'
                    }}
                    ></img>
                    <span>
                    Create Account <br></br> For Review
                    </span>
                </div>
            </Link>


        </div>

        <img
        src={Tabicon}
        style={{
            position: 'absolute',

            width:'20vw',
            bottom:'3.5vh'
        }}
        >
        </img>


    </div>

    </React.Fragment>

}

export default Registration_Default_Page;