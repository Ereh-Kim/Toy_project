import React from 'react'

import FoodscriptTopIcon from '../../../1_image_or_icon/food_script_logo.png'
import FoodscriptIcon from '../../../1_image_or_icon/food_script_tabicon.png'
import Arrow from '../../../1_image_or_icon/Arrow_Button_DownAhead.png'
import { Link } from 'react-router-dom'

export const foodscript_login_page = () => {

    return <React.Fragment>

        <div
        className='Login_Page_Container'
        >

            <Link to='../'
            style={{
                position: 'absolute',
                right: '85vw',
                top: '3vh',
                transform: 'rotate(90deg)'
            }}
            >
            <img
            src={Arrow}
            />
            </Link>

            <img
            src={FoodscriptTopIcon}
            style={{
                position: 'absolute',
                top: '26vh',
                width: '60vw'
            }}/>            

            <div
            id='Login_Box'
            >
                <form
                action='/login'
                method='POST'
                >

                <input
                name='email'
                type='email'
                className='Login_input'
                placeholder='email'
                >
                </input>

                <input
                name='password'
                type='password'
                className='Login_input'
                placeholder='password'
                >
                </input>

                <input
                type='submit'
                value={'submit'}
                className='Login_input'
                style={{
                    padding: '1vh 21vw'
                }}
                
                >
                </input>

                </form>

                <span
                style={{
                    // whiteSpace: 'nowrap'
                    textAlign: 'center',
                    padding: '1.5vh 0vw'
                }}
                >
                    If you need registeration, Click 
                    
                    &nbsp;
                    <a
                    href='/registration'>
                    Here
                    </a>
                    &nbsp;

                     ..!
                </span>

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

export default foodscript_login_page