import React from 'react';

import {Link} from 'react-router-dom'

import GoogleIcon from '../../1_image_or_icon/google_icon.png'
import FoodscriptIcon from '../../1_image_or_icon/food_script_tabicon.png'
import FoodscriptTopIcon from '../../1_image_or_icon/food_script_logo.png'
import Arrow from '../../1_image_or_icon/Arrow_Button_DownAhead.png'

// import ACCOUNT_MAKER_LINK from '../Personalized_Data_Page/Mini_LoginLogout_Btn/AccountMaker_Link';

export const Register_Page_integrator = () => {

    return <React.Fragment>

        <div
        className='Login_Page_Container'>

            <a
            href='../login'
            style={{
                position: 'absolute',
                right: '85vw',
                top: '3vh',
                transform: 'rotate(90deg)'
            }}>
            
            <img
            src={Arrow}
            />
            </a>

            <img
            src={FoodscriptTopIcon}
            style={{
                position: 'absolute',
                top: '25vh',
                width: '60vw'
            }}/>

            <div
            id='Login_Box'>
                
                <Link to='/fieldpage'>
                <div
                className='LoginBtn'
                style={{
                    backgroundColor:'#fcae26'
                }}
                >

                    
                        <span>
                        Sign up
                        <br></br> 
                        with Food Script
                        </span>
                        
                        <img
                            style={{
                                width: '7.5vw'
                            }}
                            src={FoodscriptIcon}/>
                </div>
                </Link>
                
                
                <a href='/login/google'>
                <div
                className='LoginBtn'
                style={{
                    backgroundColor:'white'
                }}
                >
                    <span>
                    Sign up
                    <br></br> 
                    with Google
                    </span>

                    <img 
                        style={{
                            width: '6.5vw'
                        }}
                        src={GoogleIcon}/>
                </div>
                </a>

                {/* <div
                className='LoginBtn'>
                    <ACCOUNT_MAKER_LINK/>
                </div> */}

            </div>
            
            <img
            src={FoodscriptIcon}
            style={{
                position: 'absolute',
                bottom: '10vh',
                width: '40vw'
            }}
            >
            </img>

        </div>

        

        

        


    </React.Fragment>


}

export default Register_Page_integrator