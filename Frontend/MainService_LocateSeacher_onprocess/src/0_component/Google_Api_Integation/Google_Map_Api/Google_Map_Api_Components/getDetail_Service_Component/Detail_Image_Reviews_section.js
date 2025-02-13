import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

import Arrow from '../../../../../1_image_or_icon/Arrow_Button_UpAhead.png'
import ThumbUp from '../../../../../1_image_or_icon/thumbs-up-icon.png'
import Pen from '../../../../../1_image_or_icon/Pen_icon.jpg'
import EditIcon from '../../../../../1_image_or_icon/edit-list-icon.png'

export const Detail_Image_Reviews_Section = (props) => {

    const [swipeState, setSwipeState] = useState({
        touchStart: 0,
        touchEnd: 0,
        currentIndex: 0,
        isDragging: false,
        dragOffset: 0
    });
    
    const [reviews, setReviews] = useState([])
    const [reviews_property_keys, setReviews_property_keys] = useState({
        
        origin:{
            username: 'user_name',
            rating: 'star_rating',
            text: 'user_post_text',
            profile_photo_url: 'profile_photo_url'
        },
        
        google: {
            username: 'author_name',
            rating: 'rating',
            text: 'text',
            profile_photo_url: 'profile_photo_url'
        }
    })
    
    const location = useLocation()
    const placecode = location.pathname.slice(17)

    useEffect(()=>{

        review_origin_loader(placecode).then(async (res)=>{
            let review_result = res.result
            review_result = Object.values(review_result)
            setReviews(review_result)
        })
        
    },[])


    const renderDotIndicators = (totalImages, currentIdx) => {
        return (
            <div
                style={{
                    width: 'inherit',
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '2vh'
                }}
            >
                {[...Array(4)].map((_, idx) => {
                    let dotColor = '#ffffff';
                    let borderColor = '#ffffff';
                    
                    if (totalImages <= 4) {
                        if (currentIdx === idx) {
                            dotColor = '#007bff';
                            borderColor = '#007bff';
                        }
                    } else {
                        if (currentIdx < 2) {
                            if (currentIdx === idx) {
                                dotColor = '#007bff';
                                borderColor = '#007bff';
                            }
                        } else if (currentIdx >= totalImages - 2) {
                            if (idx === 3 && currentIdx === totalImages - 1) {
                                dotColor = '#007bff';
                                borderColor = '#007bff';
                            } else if (idx === 2 && currentIdx === totalImages - 2) {
                                dotColor = '#007bff';
                                borderColor = '#007bff';
                            }
                        } else {
                            if (idx === 2) {
                                dotColor = '#007bff';
                                borderColor = '#007bff';
                            }
                        }
                    }

                    return (
                        <div
                            key={idx}
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: dotColor,
                                border: `1px solid ${borderColor}`,
                                transition: 'all 0.3s ease'
                            }}
                        />
                    );
                })}
            </div>
        );
    };

    const photo_dispenser = (input) => {
        switch(typeof input) {
            case('object'):
                return (
                    <div>
                        <Link to={`${swipeState.currentIndex + 1}`}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'start',
                                    width: '62vw',
                                    overflow: 'hidden',
                                    aspectRatio: '1',
                                    border: 'black solid 3.5px',
                                    borderRadius: '15px',
                                    position: 'relative'
                                }}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        transform: `translateX(calc(-${swipeState.currentIndex * 100}% + ${swipeState.dragOffset}px))`,
                                        transition: swipeState.isDragging ? 'none' : 'transform 0.3s ease-out',
                                        width: '100%'
                                    }}
                                >
                                    {input.map((element, idx) => (
                                        <img
                                            key={idx}
                                            style={{
                                                minWidth: '100%',
                                                aspectRatio: '1',
                                                objectFit: 'cover'
                                            }}
                                            src={element.getUrl()}
                                            alt={`Photo ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Link>
                        {renderDotIndicators(input.length, swipeState.currentIndex)}
                    </div>
                );
            case('undefined'):
                return null;
        }
    }

    const handleTouchStart = (e) => {
        setSwipeState(prev => ({
            ...prev,
            isDragging: true,
            touchStart: e.touches[0].clientX,
            dragOffset: 0
        }));
    };

    const handleTouchMove = (e) => {
        if (!swipeState.isDragging) return;
        
        const currentTouch = e.touches[0].clientX;
        const diff = currentTouch - swipeState.touchStart;
        setSwipeState(prev => ({
            ...prev,
            touchEnd: currentTouch,
            dragOffset: diff
        }));
    };

    const handleTouchEnd = () => {
        if (!swipeState.isDragging) return;

        const distance = swipeState.touchStart - swipeState.touchEnd;
        const minSwipeDistance = 50;

        if (Math.abs(distance) < minSwipeDistance) {
            setSwipeState(prev => ({
                ...prev,
                isDragging: false,
                dragOffset: 0
            }));
            return;
        }

        setSwipeState(prev => ({
            ...prev,
            isDragging: false,
            currentIndex: distance > 0 && prev.currentIndex < props.photos.length - 1 
                ? prev.currentIndex + 1 
                : distance < 0 && prev.currentIndex > 0 
                ? prev.currentIndex - 1 
                : prev.currentIndex,
            dragOffset: 0,
            touchStart: 0,
            touchEnd: 0
        }));
    };

    const start_dispenser = (input) => {
        let container = [];
        for(let i=0; i<input; i++){
            container.push("\u2B50")
        }
        return <span>
            {container.map((element)=>{
                return <span>{element}</span>
            })}
        </span>
        
    }

    const review_text_dispenser = (input) => {

        switch(typeof input){
            case('string'):

            switch(input.length>50){
                case(true):
                return <React.Fragment>
                
                <div
                style={{
                    maskImage: 'linear-gradient(black, transparent)',
                    height: 'fit-content',
                    maxHeight: '30vh',
                    overflow: 'scroll',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all'
                }}
                >
                    <span>
                    {input.slice(0,49)}
                    </span>
                </div>
                <div
                style={{
                    width:'45vw',
                    display:'flex',
                    justifyContent:'center',
                    padding: '0.5vh',
                    margin: '0 3vw'
                }}>
                    <img
                    src={Arrow}
                    style={{
                        width: '5vw'
                    }}
                    onClick={(e)=>{
                    const Blinder = e.target.parentNode.parentNode.childNodes[0]

                    switch(Blinder.style.maskImage){
                        case('linear-gradient(black, transparent)'):
                        Blinder.innerText = `${input.slice(0)}`
                        Blinder.style.maskImage = ''
                        e.target.style.transform = 'rotate(180deg)'
                        break;

                        case(''):
                        Blinder.innerText = `${input.slice(0,49)}`
                        Blinder.style.maskImage = 'linear-gradient(black, transparent)'
                        e.target.style.transform = 'rotate(0deg)'
                        break;
                    }

                    }}

                    ></img>
                </div>
                </React.Fragment>

                case(false):
                return <div
                style={{
                    width:'45vw',
                    margin: '0 3vw'
                }}
                >
                {input}
                </div>
            }
            
            case('undefined'):
            return;
        }
    }

    const review_origin_loader = async (input) => {
        let result = await fetch(`/usercreation/read_reviews/place/${input}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        result = await result.json()
        return result
    }

    const review_dispenser = (input,origin) => {

        let property_keys = reviews_property_keys[origin]

        switch(typeof input){
            case('object'):
                   return input.map((element)=>{

                    return <React.Fragment>

                    <div
                    style={{
                        display: 'grid',
                        width: '50vw',
                        height: 'fit-content',
                        padding: '1vh 3vw',
                        border: 'black solid 3.5px',
                        borderRadius: '15px',
                        fontFamily: '큐트신민상',
                        letterSpacing: '1vw',
                        spaceBetween: '5px',
                        lineHeight: '3.5vh'
                    }}
                    >
                                <span
                                    style={{
                                        justifySelf: 'end',
                                        padding: '0 2.5vw 0 0'
                                    }}
                                    >
                                    <img
                                    src={EditIcon}
                                    style={{
                                        width: '4vw'
                                    }}
                                    >
                                    </img>
                                    <span>Edit</span>
                                </span>

                            <div
                            style={{
                                padding: '1vh 2vw'
                            }}>

                                <div
                                style={{
                                    display:'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                    }}
                                >
                                    <img
                                    src={element[property_keys.profile_photo_url]}
                                    style={{
                                    width: '10vw'
                                    }}
                                    ></img>
                                    <span
                                    style={{
                                    paddingLeft: '10px'
                                    }}
                                    >{element[property_keys.username]}</span>


                            </div>

                            <div>{start_dispenser(element[property_keys.rating])} 
                                ({element[property_keys.rating]})</div>

                            </div>


                            <div
                            style={{
                                display:'flex',
                                flexDirection: 'row',
                                position:'relative',
                                left:'0.5vw',
                                top:'1vh',
                                fontSize: '3.5vw',
                                fontWeight: 'bold'
                            }}>
                            
                                <span
                                    style={{
                                        
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: 'white',
                                        width: 'fit-content',
                                        borderRadius: '10px',
                                        padding: '0 2vw'
                                    }}>
                                    <span>
                                    Share
                                    </span>
                                    
                                    
                                    <img
                                    src={ThumbUp}
                                    style={{
                                        width: '3.5vw',
                                        paddingLeft: '1.5vw'
                                    }}
                                    >
                                    </img>
                                </span>
                            
                                <span
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: 'white',
                                        width: 'fit-content',
                                        borderRadius: '10px',
                                        padding: '0 2vw',
                                        marginLeft: '2vw'
                                    }}>
                                    <span>
                                    Reply
                                    </span>
                                    
                                    
                                    <img
                                    src={Pen}
                                    style={{
                                        width: '5vw',
                                        paddingLeft: '1.5vw'
                                    }}
                                    >
                                    </img>
                                </span>
                                
                            </div>


                        <br></br>

                        <div>{review_text_dispenser(element[property_keys.text])}</div>

                        

                    </div>
                    
                    </React.Fragment>})
                
        }
        
    }

    const Review_Star_Conclusion = (input) => {
        switch(typeof input){
            case('object'):
            return input.length
        }
    }

    const Particular_ReviewStar_Conclusion = (input, target) => {
        let counter = 0;
        
        switch(typeof input){
            case('object'):
            input.forEach(element => {
                if(element.rating == target){
                    counter = counter + 1
                }
            });
        }

        return counter
    }

    return <React.Fragment>

        <div className="Default_Info_HighLighter">
                
                <span className="Default_Info_TextSection">
                    <span style={{
                        fontWeight:'bold'
                    }}>
                    &#8226; Photos
                    </span>
                    
                </span>
                <br></br>

            </div>

            <br></br>

    {photo_dispenser(props.photos)}
    
        <br></br>

        <div className="Default_Info_HighLighter">
            
            <span className="Default_Info_TextSection">
                <span style={{
                    fontWeight:'bold'
                }}>
                &#8226; Reviews ( {Review_Star_Conclusion(props.reviews)} )
                </span>
                <img
                src={Arrow}
                style={{
                    width:'5vw',
                    position:'relative',
                    left: '29vw',
                    top: '0.5vh'
                }}
                onClick={(e)=>{
                    
                    const Conclusion = e.target.parentNode.childNodes[2]

                    switch(Conclusion.style.display){
                        case('flex'):
                        Conclusion.style.display = 'none'
                        break;
                        
                        case('none'):
                        Conclusion.style.display = 'flex'
                        break;
                    }
                }}
                >
                
                </img>
                <div
                style={{
                    border:'solid 3px black',
                    margin: '1vh 3vw',
                    padding: '1vh 3vw',
                    borderRadius: '10px',
                    height: '25vh',
                    display: 'none',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems:'space-between',
                    fontWeight: 'bold'
                }}
                >
                <span>Written Reviews</span>
                <div>
                {"\u2B50"} (5) - {Particular_ReviewStar_Conclusion(props.reviews,5)}
                </div>
                <div>
                {"\u2B50"} (4) - {Particular_ReviewStar_Conclusion(props.reviews,4)}
                </div>
                <div>
                {"\u2B50"} (3) - {Particular_ReviewStar_Conclusion(props.reviews,3)}
                </div>
                <div>
                {"\u2B50"} (2) - {Particular_ReviewStar_Conclusion(props.reviews,2)}
                </div>
                <div>
                {"\u2B50"} (1) - {Particular_ReviewStar_Conclusion(props.reviews,1)}
                </div>

                </div>
                
            </span>
            

        </div>

        <br></br>

        <div
                style={{
                    display:'grid',
                    gridTemplateRows: '1fr 1fr',
                    gridAutoFlow: 'column',
                    columnGap: '15vw',
                    rowGap: '5vh',

                    padding: '5vh 0vw 5vh 0vw',
                    overflow: 'scroll',
                    width: '65vw'
                }}
        >
    {review_dispenser(props.reviews,'google')}
    {review_dispenser(reviews,'origin')}
        </div>

    </React.Fragment>

}

export default Detail_Image_Reviews_Section