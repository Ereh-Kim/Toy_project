import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';

import Homepage_Btn from './Homepage_Btn.js'
import DateCalculator from "./DateCalculator.js";
import Delete_popup from "./Delete_popup.js";

import Editbtn from '../../../../src/1_image_or_icon/pen2.png'
import ArrowBtn from '../../../../src/1_image_or_icon/Arrow_Button_DownAhead.png'
import Trashcanbtn from '../../../../src/1_image_or_icon/recycle-bin-icon.png'
import './CustomCheckbox.css';

export const My_Reviews = (props) => {

    const containerRef = useRef(null)

    const location = useLocation()    
    const queryParams = new URLSearchParams(location.search)

    const [ELEMENT ,updateREVIEWS] = useState([])
    const [USERNAME ,updateUSERNAME] = useState({name: ''})
    const [CHECKBOX, updateCHECKBOX] = useState([])
    
    const [Delete_popup_Activate, setDelete_popup_state] = useState(false)
    const [Delete_review, setDelete_review] = useState({})
    
    useEffect(()=>{

        let USER;
        let STATUS;
        
        if(props.id){
            USER = props.id.userinfo
            STATUS = props.id.status
        }

        switch(STATUS){
            case('unverified'):
            break;

            case('verified'):
            Load_Review(USER.id,USER.name)
            break;

            default:
            break;
        }
        const Container = containerRef.current
        if(!Container) return;

    },[])

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
                maskImage: 'linear-gradient(black, transparent)',
                transition: 'all 0.3s ease-in-out'
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
                justifySelf: 'center',
                transform: 'rotate(0deg)',
                transition: 'transform 0.3s ease-in-out'
            }}
            onClick={(e)=>{
                const textDiv = e.target.previousElementSibling;
                switch(textDiv.style.maskImage){
                    case(''):
                    textDiv.style.maskImage = 'linear-gradient(black, transparent)';
                    textDiv.style.height = '5vh';
                    e.target.style.transform = 'rotate(0deg)';
                    break;

                    case('linear-gradient(black, transparent)'):
                    textDiv.style.maskImage = '';
                    textDiv.style.height = `${textDiv.scrollHeight}px`;
                    e.target.style.transform = 'rotate(180deg)';
                    break;
                }
            }}
            ></img>
        </React.Fragment>
    }

    const SelectAll_Handler = (props) => {
        return <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 30px)',
            columnGap: '1vw',
            justifySelf: 'start',
            alignItems: 'center',
        }}
        >

        <input
        type="checkbox"
        className="custom-checkbox"
        style={{
            justifySelf: 'start',
        }}
        checked={CHECKBOX.length === ELEMENT.length && CHECKBOX.length !== 0}
        onChange={(e)=>{
            if(e.target.checked){
                updateCHECKBOX(ELEMENT.map(element => element.id))
                setDelete_review({
                    situation: 'multiple_reviews',
                    checked: true
                })
            } else {
                updateCHECKBOX([])
            }

        }}
        ></input>

        <span
        style={{
            justifySelf: 'start',
            whiteSpace: 'nowrap',
            fontSize: '20px',
        }}
        >
            Select All
        </span>

        </div>
    }

    const start_dispenser = (input) => {
        let container = [];
        for(let i=0; i<input; i++){
            container.push("\u2B50")
        }
        return <span
        style={{
            width: '80%',
            display: 'flex',
            justifyContent: 'space-around',
            border: 'white solid 2px',
            borderRadius: '15px',
            padding: '0.4vh 2vw 1vh 2vw',
            }}
        >
            {container.map((element)=>{
                return <span>{element}</span>
            })}
        </span>
        
    }

    const Checkbox_Handler = (props) => {
        switch(CHECKBOX.length){
            case(0):
            break;

            default:
                return <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '0vh 2.5vw',
                        }}
                        >
                        <span
                            style={{
                                fontWeight: 'bold',
                            }}
                        >
                        <span>
                            Selected {String.fromCharCode(0x0020)}
                        </span>
                        <span
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '15px',
                            padding: '0.25vh 2vw'
                        }}
                        >
                        {CHECKBOX.length} Reviews
                        </span>
                        </span>

                        {String.fromCharCode(0x0020)}

                        <div
                        style={{
                            justifySelf: 'start',
                            backgroundColor: 'white',
                            borderRadius: '7px',
                            padding: '0.5vh 2.5vw',
                            margin: '1vh 0vw 0vh 0vw',
                            textAlign: 'center'
                            
                        }}
                        onClick={
                            async (e)=>{
                                setDelete_popup_state(true)
                                setDelete_review({
                                    situation: 'multiple_reviews',
                                    checked: true
                                })
                        }}

                        >
                            <span>
                                Delete All Selected
                            </span>
                            
                            <img
                            src={Trashcanbtn}
                            style={{
                                position:'relative',
                                left:'5.5px',

                                width: '15px',
                                height: '15px'
                            }}
                            >
                            </img>
                        </div>
                    
                    </div>
                    

        }
    }



    const Review_Container = (props) => {
        const ELEMENT = props.ELEMENT

        return <React.Fragment>
            <div
            style={{
                width:'95%',
                display: 'grid',
                gridTemplateColumns: '(repeat 1, 1fr)',
                rowGap: '2vh',
                padding: '0.5vh 0vw 2vh 0vw'
            }}
            >

                <div
                style={{
                    border: 'black solid 3px',
                    borderRadius: '15px',
                    padding: '1vh 2vw',
                    width: '90%'
                }}
                >
                    <SelectAll_Handler
                    />
                </div>

                <Checkbox_Handler
                CHECKBOX={CHECKBOX}
                />

                <span
                    style={{
                        justifySelf: 'center',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        padding: '0.5vh 2.5vw',
                        borderRadius: '15px',
                        border: 'black solid 3px'
                    }}
                    >
                    * Total {ELEMENT.length} Reviews *
                    </span>

                {ELEMENT.map((element, index)=>{

                    return <div>
                    <div
                    
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '(repeat 1, 1fr)',
                        rowGap: '1vh',
                        border:'black solid 3px',
                        borderRadius: '28px',
                        padding: '1.5vh 3vw 3vh 3vw'
                    }}
                    >

                    <input
                    className="custom-checkbox"
                    type="checkbox"
                    key={index}
                    checked={CHECKBOX.includes(element.id)}
                    onChange={(e)=>{
                        if(e.target.checked){
                            const EXISTED = [...CHECKBOX]
                            setDelete_review({
                                checked: true
                            })

                            if(!EXISTED.includes(element.id)){
                                updateCHECKBOX([...EXISTED, element.id])
                                
                            }
                        } else {
                                const RENEW = CHECKBOX.filter(id => id !== element.id)
                                updateCHECKBOX(RENEW)
                            
                                if(RENEW.length === 0){
                                    setDelete_review({
                                        checked: false
                                    })
                                }
                            }
                    
                        
                    
                    }}
                  ></input>

                    <a
                    href={`/search/location/places/${element.placecode}`}
                    target="_blank"
                    >
                    <div
                        style={{
                            justifySelf:'center',
                            textAlign:'center',
                            backgroundColor: 'white',
                            height: 'fit-content',
                            alignContent: 'center',
                            width: '90%',
                            borderRadius: '15px',
                            padding: '1vh 0',
                            lineHeight: '30px'
                        }}
                    >
                        {element.placename}
                        <br></br>
                        
                        <span
                        style={{
                            fontSize: '13px'
                        }}
                        >
                        ( Link Here )
                        </span>

                    </div>
                    </a>

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
                        width: '70%',
                        justifySelf: 'center',
                        borderBottom: 'white solid 5px',
                        textAlign: 'center'
                    }}
                    >
                        <DateCalculator
                        date={element.created_at}
                        />
                    </div>

                    <img
                    src=''
                    style={{
                        display:'none',
                        width: '80%',
                        aspectRatio: '1/1',
                        objectFit: 'cover',
                        justifySelf: 'center',
                        border: 'white solid 3px',
                        borderRadius: '10px'
                    }}
                    alt="let"
                    onClick={(e)=>{
                        e.target.style.display = 'none'
                    }}
                    >
                    </img>

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
                        
                        {element.picture_url_array.map((element, index)=>{

                            return <img
                            src={`${element}`}
                            style={{
                                width: '80%',
                                aspectRatio: '1',
                                border:'white solid 3px',
                                borderRadius: '10px'
                            }}
                            
                            onClick={(e)=>{
                                const Target = e.target.parentNode.previousElementSibling
                                Target.style.display = 'block'
                                Target.src = e.target.src
                            }}
                            >
                            </img>
                        })}
                    </div>
                    <div
                    style={{
                        justifySelf: 'center',
                        display: 'grid',
                        gridTemplateRows: 'repeat(2, 1fr)',
                        justifyItems: 'center',
                        alignItems: 'center',
                        border: 'white solid 2px',
                        borderRadius: '15px',
                        padding: '0.5vh 2vw 1.5vh 2vw',
                        marginBottom: '2.5vh',
                        width: '80%',
                        textAlign: 'center'
                    }}
                    >
                        <span>Star Reputation</span>
                        {start_dispenser(element.star_rating)}
                    
                    </div>
                        
                        <div
                        style={{
                            width: '90%',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            columnGap: '1vw',
                            justifySelf: 'center',
                            borderRadius: '5px',                        
                            margin: '1.5vh 0vw 0vh 0vw',
                            }}>
                                
                                <Link
                                to={`review/${element.id}?${queryParams}`}
                                target="_blank"
                                >
                                <div
                                style={{
                                    justifySelf: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: '7px',
                                    padding: '0.5vh 2.5vw'  
                                }}
                                >
                                    <span>
                                        Edit
                                    </span>
                                    
                                    <img
                                    src={Editbtn}
                                    style={{
                                        position:'relative',
                                        left:'5.5px',

                                        width: '15px',
                                        height: '15px'
                                    }}>
                                    </img>
                                </div>
                                </Link>

                                <div
                                style={{
                                    justifySelf: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: '7px',
                                    padding: '0.5vh 2.5vw'  
                                }}
                                onClick={
                                    async (e)=>{
                                    setDelete_popup_state(true)
                                    setDelete_review({
                                        id: element.id,
                                        index: index,
                                        situation: 'single_review'
                                    })
                                    updateCHECKBOX([element.id])                                    
                                }}

                                >
                                    <span>
                                        Delete
                                    </span>
                                    
                                    <img
                                    src={Trashcanbtn}
                                    style={{
                                        position:'relative',
                                        left:'5.5px',

                                        width: '15px',
                                        height: '15px'
                                    }}
                                    >
                                    </img>
                                </div>

                        </div>
                    </div>
                    </div>
                })}
            </div>

            <Delete_popup
            activate={Delete_popup_Activate}
            index={Delete_review.index}
            situation={Delete_review.situation}
            checked={Delete_review.checked}
            click_action={async ()=>{
                await fetch('/usercreation/delete_post',{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: [...CHECKBOX]})
                })
                let RENEWED_ALIGN = ELEMENT
                RENEWED_ALIGN = RENEWED_ALIGN.filter(element => !CHECKBOX.includes(element.id))
                
                updateREVIEWS([...RENEWED_ALIGN])
            }}
            close_event={()=>{
                setDelete_popup_state(false)
                updateCHECKBOX([])
            }}
            />
        </React.Fragment>
    }

    const Load_Review = async (user_id, username) => {
        await fetch(`/usercreation/read_reviews/user/${user_id}`
            ).then( async (result)=>{
            const review_data = await result.json()
            console.log(review_data)
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


                <Review_Container
                edit={props.edit}
                ELEMENT={ELEMENT}
                username={props.id.userinfo}
                />
                

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