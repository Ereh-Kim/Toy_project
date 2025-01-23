import React, { useEffect, useState } from "react";

import Homepage_Btn from './Homepage_Btn.js'
import DateCalculator from "./DateCalculator.js";

import { Buffer } from "buffer";

import ArrowBtn from '../../../../src/1_image_or_icon/Arrow_Button_DownAhead.png'

export const My_Reviews = (props) => {

    const [element ,updateREVIEWS] = useState([])
    const [USERNAME ,updateUSERNAME] = useState({name: ''})

    useEffect(()=>{

        let USER;
        let STATUS;
        
        if(props.id){
            USER = props.id.userinfo
            STATUS = props.id.status
        }

        switch(STATUS){
            case('unverified'):
            return;

            case('verified'):
            Load_Review(USER.id,USER.name)
            return;

            default:
            return;
        }

    },[props])

    const TextDispenser = (props) => {

        let TextContent = props.element.user_post_text
        
        return <React.Fragment>
        
            <div
            style={{
                backgroundColor: 'white',
                borderRadius: '10px',

                width: '80%',
                height: '5vh',

                overflow: 'hidden',
                padding: '1vh 2.5vw 4vh 2.5vw',

                justifySelf: 'center',
                
                letterSpacing: '1.5px',
                wordSpacing: '1px',
                lineHeight: '3.5vh',
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                maskImage: 'linear-gradient(black, transparent)'
            }}
            >
                {TextContent}
            </div>
                <img
                src={ArrowBtn}
                style={{
                    position: 'relative',

                    width: '5vw',
                    bottom: '4vh',

                    justifySelf: 'center'
                }}
                onClick={(e)=>{
                    switch(e.target.previousElementSibling.style.maskImage){
                        case(''):
                        e.target.previousElementSibling.style.maskImage = 'linear-gradient(black, transparent)';
                        e.target.previousElementSibling.style.height = '5vh'
                        break;

                        case('linear-gradient(black, transparent)'):
                        e.target.previousElementSibling.style.maskImage = ''
                        e.target.previousElementSibling.style.height = 'inherit'
                        break;
                    }
                }}
                ></img>

            </React.Fragment>
        
        
    }

    const Review_Container = () => {

        

        return <React.Fragment>

            <div
            style={{
                width:'95%',

                display: 'grid',
                gridTemplateColumns: '(repeat 1, 1fr)',
                rowGap: '2vh',
                

                padding: '2vh 0vw'
            }}
            >

            {element.map((element, index)=>{

                const PICTURES_BINARY_ARRAY = element.user_post_pictures
                let PICTURES_ARRAY = [];

                PICTURES_BINARY_ARRAY.forEach((element, index)=>{
                    const DATA = Buffer.from(element)
                    let encoded_imagesrc = DATA.toString('base64')
                    encoded_imagesrc = `data:image/jpg;base64,${encoded_imagesrc}`;

                    PICTURES_ARRAY = [...PICTURES_ARRAY, encoded_imagesrc]
                })

                return <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '(repeat 1, 1fr)',
                    rowGap: '1vh',

                    border:'black solid 3px',
                    borderRadius: '28px',

                    padding: '1.5vh 3vw 3vh 3vw'
                }}
                >
                
                <div
                    style={{
                        justifySelf:'center'
                    }}
                >
                    {element.placename}
                </div>

                <TextDispenser
                element={element}
                />

                <div
                style={{
                    position:'relative',
                    bottom: '15px',
                    justifySelf: 'center'
                }}
                >
                    {`작성자: ${USERNAME.name}`}
                </div>

                <div
                style={{
                    fontSize:'15px',
                    justifySelf: 'center',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    padding: '0.25vh 2vw'
                }}
                >
                    Created
                </div>

                <div
                style={{
                    justifySelf: 'center',
                    borderBottom: 'white solid 5px'
                }}
                >
                    <DateCalculator
                    date={element.created_at}
                    />
                </div>

                <div
                style={{
                    
                    width:'80%',

                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    justifyItems: 'center',
                    justifySelf: 'center',
                    alignItems: 'center',
                    border: 'black solid 3px',
                    borderRadius:'15px',

                    padding: '1.5vh 2vw',
                    columnGap: '2vw',
                    rowGap: '1.5vh'
                }}
                >
                    {PICTURES_ARRAY.map((element, index)=>{

                        return <img
                        src={`${element}`}
                        style={{
                            width: '80%',
                            aspectRatio: '1',
                            border:'white solid 3px',
                            borderRadius: '10px'
                        }}>
                        </img>
                    })}
                </div>

                </div>

            })}

            </div>

        </React.Fragment>

    }

    const Load_Review = async (user_id, username) => {
        await fetch(`/usercreation/read_reviews/${user_id}`).then( async (result)=>{
            const review_data = await result.json()
            updateREVIEWS(review_data.result)
            updateUSERNAME({name: username})
        })
    }

    if(props.id){
        
        switch(props.id.status){
        case('verified'):
        return <React.Fragment>

        <div
        className="Personalize_Data_Page_Container"
        >

            <Homepage_Btn/>

            <div
            className="Personalized_Data_Container_Aligner"
            >

                <span
                className="Personalized_Data_Page_TextTitle"
                >
                My Reviews
                </span>
                <br></br>

            
                <Review_Container/>
                

            </div>

        </div>

    </React.Fragment>

    case('unverified'):
    return <React.Fragment>

            <div
            className="Personalize_Data_Page_Container"
            >

                <Homepage_Btn/>

                <div
                className="Personalized_Data_Container_Aligner"
                >

                    <span
                    className="Personalized_Data_Page_TextTitle"
                    >
                    My Reviews
                    </span>
                    <br></br>

                    <span
                    className="Personalized_Data_Page_TextTitle"
                    >
                    This Page
                    <br></br>
                    is Preparing
                    </span>                    

                </div>

            </div>

        </React.Fragment>


    }


    }
}

export default My_Reviews