import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'


import Arrow from '../../../../../1_image_or_icon/Arrow_Button_UpAhead.png'
import ThumbUp from '../../../../../1_image_or_icon/thumbs-up-icon.png'
import Pen from '../../../../../1_image_or_icon/Pen_icon.jpg'
import EditIcon from '../../../../../1_image_or_icon/edit-list-icon.png'

export const Detail_Image_Reviews_Section = (props) => {

    const [FirstTouch, updateStart] = useState(0)
    const [LastTouch, updateLast] = useState(0)
    const [Distance, updateDistance] = useState(0)
    const [index, updateIndex] = useState(0)

    const photo_dispenser = (input) => {

        switch(typeof input){
            case('object'):
            // console.log(input[0].getUrl())
            return  <div>
                    
                    <Link to={`${Distance/index+1||1}`}>
                    <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent:'start',
                        width:'62vw',
                        overflow: 'scroll',
                        aspectRatio: '1',
                        border: 'black solid 3.5px',
                        borderRadius: '15px'
                    }}
                    
                    

                    onTouchStart={(e)=>{
                        const touches = e.changedTouches[0].pageX;
                        updateStart(touches)

                    }}

                    onTouchEnd={async (e)=>{
                        const touches = e.changedTouches[0].pageX
                        updateLast(touches)

                        const Arrow = FirstTouch - LastTouch
                        updateIndex(e.target.offsetWidth)
                        switch(typeof e.target.parentNode.childNodes.length){

                                case('number'):

                                const Length = e.target.parentNode.childNodes.length

                                if(Arrow>100){
                                updateDistance(Distance+e.target.offsetWidth)

                                e.target.parentNode.scrollTo({
                                    top:0,
                                    left:Distance+e.target.offsetWidth,
                                    behavior:'smooth'
                                })
                                
                                if(Distance>e.target.offsetWidth*(Length-2)){
                                    updateDistance(e.target.offsetWidth*(Length-1))
                                }
                                break;
                                return;}

                                if(Arrow<-100){
                                updateDistance(Distance-e.target.offsetWidth)

                                e.target.parentNode.scrollTo({
                                    top:0,
                                    left:Distance-e.target.offsetWidth,
                                    behavior:'smooth'
                                })

                                if(Distance<1){
                                    updateDistance(0)
                                }
                                break;
                                return;}
                                
                                if(-100<Arrow<100){
                                    
                                e.target.parentNode.scrollTo({
                                    top:0,
                                    left:Distance,
                                    behavior:'smooth'
                                    })}
                        
                                case('undefined'): 
                                break;
                                return;

                            }

                        }
                    }

                    >

                        {input.map((element)=>{
                        return <img
                        style={{
                            width:'62vw',
                            aspectRatio: '1',
                            objectFit: 'cover'
                        }}
                        src={element.getUrl()}
                        >
                        </img>
                        })}

                    </div>
                    </Link>

                    <div
                    style={{
                        width: 'inherit',
                        display:"flex",
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                    >
                    <span
                    style={{
                        padding: '0.5vh 2vw',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        marginTop: '2vh'
                    }}
                    >
                    {Distance/index+1||1}/{props.photos.length}
                    </span>

                    </div>

                    </div>
                    

            case('undefined'):
            return;
        }

    }

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
                    maskImage: 'linear-gradient(black, transparent)'
                }}
                >
                    {input.slice(0,49)}
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

    const review_dispenser = (input,index) => {
        
        switch(typeof input){
            case('object'):
        
            let container = []
            let start =0;
            for(let i=0; i<input.length; i++){
                switch(i%index){
                    case(0):
                    container.push(input.slice(start,start+index))
                    start = start+index
                    default:   
                }
            }

            return container.map((li)=>{
                    

                   return <div>
                   
                   {li.map((element)=>{
                    return <React.Fragment>
                    
                                <span
                                style={{
                                    position:'relative',
                                    left: '48.5vw',
                                    top: '4vh',
                                    
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
                        width: '50vw',
                        height: 'fit-content',
                        padding: '1vh 3vw',
                        border: 'black solid 3.5px',
                        borderRadius: '15px',
                        fontFamily: '큐트신민상',
                        letterSpacing: '1vw',
                        spaceBetween: '5px',
                        lineHeight: '3.5vh',
                        margin: '0vh 12vw 5vh 4vw'

                    }}
                    >

                        <div>
                    
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
                                    src={element.profile_photo_url}
                                    style={{
                                    width: '10vw'
                                    }}
                                    ></img>
                                    <span
                                    style={{
                                    paddingLeft: '10px'
                                    }}
                                    >{element.author_name}</span>


                            </div>

                            <div>{start_dispenser(element.rating)} 
                                ({element.rating})</div>

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

                        </div>

                        <br></br>

                        <div>{review_text_dispenser(element.text)}</div>

                        

                    </div>
                    
                    </React.Fragment>})} </div>
                })
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
                    display:'flex',
                    flexDirection:'row',
                    overflow: 'scroll',
                    width: '65vw'
                }}>
    {review_dispenser(props.reviews,2)}

        </div>

    </React.Fragment>

}

export default Detail_Image_Reviews_Section