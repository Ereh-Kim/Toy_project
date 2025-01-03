import React from 'react';

import {Link} from 'react-router-dom'

import GoogleIcon from '../../1_image_or_icon/google_icon.png'
import FoodscriptIcon from '../../1_image_or_icon/food_script_tabicon.png'
import FoodscriptTopIcon from '../../1_image_or_icon/food_script_logo.png'
import Arrow from '../../1_image_or_icon/Arrow_Button_DownAhead.png'

export const Login_Page_integrator = () => {

    return <React.Fragment>

        <div
        id='Login_Page_Container'>

            <a
            href='/homepage'
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
                top: '29vh',
                width: '60vw'
            }}/>

            <div
            id='Login_Box'>
                
                <Link to='/foodscript-login'>
                <div
                className='LoginBtn'
                style={{
                    backgroundColor:'#fcae26'
                }}
                >

                    
                        Login with Food Script
                        <img 
                            style={{
                                width: '7.5vw'
                            }}
                            src={FoodscriptIcon}/>
                </div>
                </Link>
                
                
                <Link to='/login/google-login'>
                <div
                className='LoginBtn'
                style={{
                    backgroundColor:'white'
                }}
                >
                    Login with Google
                    <img 
                        style={{
                            width: '6.5vw'
                        }}
                        src={GoogleIcon}/>
                </div>
                </Link>

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

export default Login_Page_integrator