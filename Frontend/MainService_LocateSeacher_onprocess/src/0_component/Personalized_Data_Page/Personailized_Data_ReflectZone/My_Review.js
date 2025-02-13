import React, { useEffect, useRef, useState } from "react";

import DateCalculator from "./DateCalculator";
import OnOffToggler from '../../../1_image_or_icon/OnOff_Toggler_icon.png'

const Single_ReviewData = ({target, edit}) => {

    const containerRef = useRef(null)
    const STARRATE = useRef(null)
    const PICTURE_URL = useRef(null)

    const [FontSize, updateFONTSIZE] = useState({})
    const [WIDTH, updateWIDTH] = useState({fliped: false})
    

    console.log('log')

    useEffect(()=>{

        const divElement = containerRef.current
        const star_ratingElement = STARRATE.current

        const resizeObserver = new ResizeObserver(()=>{
            if(divElement){
                updateFONTSIZE({
                    title : `${divElement.offsetWidth*0.1}px`,
                    content : `${divElement.offsetWidth*0.065}px`
                })
                updateWIDTH({
                    textbox : `${divElement.offsetWidth*0.18}vw`,
                    fliped : true
                })
            }
        })
    
        if(divElement){
            resizeObserver.observe(divElement)
        }

        // if(target.star_rating && star_ratingElement){
        //     console.log(star_ratingElement)
        // }

        return()=>{
            resizeObserver.disconnect()
        }



    },[])

    const Star_Reputation = () => {
        return <div
            style={{
                marginTop: '1vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
            }}
        >
            <select
                name="star_rating"
                required
                ref={STARRATE}
                onChange={(e)=>{
                    
                }}
                style={{
                    width: '90%',
                    padding: '1vh 2vw',
                    borderRadius: '8px',
                    border: 'black solid 2px',
                    borderBottom: 'black solid 4px',
                    backgroundColor: '#ff9933',
                    fontFamily: '큐트신민상',
                    textAlign: 'center'
                }}
            >
                <option value="5">⭐⭐⭐⭐⭐ (5점)</option>
                <option value="4">⭐⭐⭐⭐ (4점)</option>
                <option value="3">⭐⭐⭐ (3점)</option>
                <option value="2">⭐⭐ (2점)</option>
                <option value="1">⭐ (1점)</option>
            </select>
        </div>
    }
    
    return <React.Fragment>

        <div
        style={{
            width:'100%',
            height: '100%',
            marginLeft: '30px',
            display:'grid',
            gridAutoFlow: 'row',
            rowGap: '10px',
            alignItems: 'center',
            justifyItems: 'center',
            padding: '50px 10px',
            fontFamily: '큐트신민상',

            border: 'black solid 2.5px',
            borderRadius: '30px'
        }}
        ref={containerRef}
        >
            <div
            style={{
                justifySelf:'center',
                fontSize: FontSize.title
            }}
            >
            {/* {target.placename} */}
            </div>

            <textarea
            style={{
                width: WIDTH.textbox,
                height: '24vh',
                letterSpacing: '3.5px',
                wordSpacing: '1px',
                lineHeight: '3.5vh',
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word',
                justifySelf: 'center',
                fontSize: FontSize.content,
                backgroundColor: 'white',
                padding: '10px 10px',
                borderRadius: '20px'
            }}
            // defaultValue={target.user_post_text}
            >
            </textarea>

            <div
            style={{
                justifySelf:'center',
                fontSize: FontSize.title
            }}
            >
            작성자: 
            {/* {target.user.name} */}
            </div>
            

            <div
            style={{
                fontSize: FontSize.title
            }}
            >Created At</div>

            {/* <DateCalculator
            date={target.created_at}
            /> */}
            
            <img
                src={OnOffToggler}
                style={{
                    position: 'relative',
                    left: '75px',
                    top: '50px'
                }}
            onClick={()=>{
                
            }}    
            >
            
            
            </img>
            <img
            ref={PICTURE_URL}
            style={{
                width: '80%',
                aspectRatio: '1',
                objectFit: 'cover',
                display: 'none',
                borderRadius: '15px',
                padding: '5px',
                border: 'white solid 2px'
            }}
            >
            </img>

            <div
            style={{
                width: '90%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                rowGap: '1vw',
                border: 'white solid 3px',
                justifyItems: 'center',
                padding: '10px 5px'
            }}
            >
                {/* {target.picture_url_array.map((url, index)=>{
                    return <img
                    src={url}
                    key={index}
                    style={{
                        width: '10vw',
                        aspectRatio: '1/1',
                        objectFit: 'cover',
                        border:'white solid 3px',
                        borderRadius: '10px',
                    }}
                    onClick={
                        ()=>{
                            const PICTURE_ELEMENT = PICTURE_URL.current
                            console.log(PICTURE_ELEMENT)

                            PICTURE_ELEMENT.style.display= 'block'
                            PICTURE_ELEMENT.src= url
                        }
                    }
                    
                    >
                    </img>
                })} */}

            </div>

            <Star_Reputation/>                

            <div
            style={{
                fontSize: FontSize.title,
                width: '90%',
                padding: '10px 0px',
                textAlign: 'center',
                border: 'black solid 3px',
                borderRadius: '15px'
            }}
            >
                Save
            </div>
            

        </div>

    </React.Fragment>



}

export default Single_ReviewData