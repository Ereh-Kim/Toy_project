import React, {useRef, useState, useEffect} from "react"
import styled from "styled-components"
import { createPortal } from 'react-dom'

const Delete_popup_container_single = styled.div`
    position: relative;
    bottom: 250px;
    right: 10px;

    display: ${props => props.activate ? 'block' : 'none'};
    background-color: white;
    padding: 20px 30px;
    text-align: center;
    border: 2px solid black;
    width: 80%;
    `

const Delete_popup_container_multiple = styled.div`
    position: absolute;
    top: 200px;
    right: 30px;

    display: ${props => props.activate ? 'block' : 'none'};
    background-color: white;
    padding: 20px 30px;
    text-align: center;
    border: 2px solid black;
    width: 50%;
    `

const Delete_popup = (props) => {
    const selfRef = useRef(null)
    const [targetElement, setTargetElement] = useState(null)

    useEffect(()=>{
        if(!selfRef.current){
            return;
        }
        
            let previousSibling = null
        
            switch(props.situation){
                case ('single_review'):
                    previousSibling = selfRef.current.parentElement;
                    if(previousSibling && previousSibling.children[2]){
                        setTargetElement(previousSibling.children[2].children[props.index+3])
                    }
                    break;
                case ('multiple_reviews'):
                    previousSibling = selfRef.current.parentElement;
                    if(previousSibling && previousSibling.children){
                        setTargetElement(previousSibling)
                    }
                    break;
            }
        

    },[])

    let popupContent = null

    switch(props.situation){
        case ('single_review'):

    popupContent = (
        <Delete_popup_container_single
            activate={props.activate}
            ref={selfRef}
        >
            <div>
            <span>Are you sure to delete this review?</span>
            <br></br>
            <br></br>
            <div
            style={{
                width: '80%',
                display: 'flex',
                justifyContent: 'space-around',
                justifySelf: 'center'
            }}
            >
                <span
                onClick={()=>{
                        props.click_action()
                        alert('Your review has been deleted')
                        props.close_event()
                }}
                >Yes</span> / <span
                onClick={()=>{
                        props.close_event()
                }}

                >No</span>
            </div>
            </div>
        </Delete_popup_container_single>
    );

    break;

    case ('multiple_reviews'):

    popupContent = (
        <Delete_popup_container_multiple
            activate={props.activate}
            ref={selfRef}
        >
            <div>
            <span>Are you sure to delete this review?</span>
            <br></br>
            <br></br>
            <div
            style={{
                width: '80%',
                display: 'flex',
                justifyContent: 'space-around',
                justifySelf: 'center'
            }}
            >
                <span
                onClick={()=>{
                        props.click_action()
                        alert('Your review has been deleted')
                        props.close_event()
                }}
                >Yes</span> / <span
                onClick={()=>{
                        props.close_event()
                }}

                >No</span>
            </div>
            </div>
        </Delete_popup_container_multiple>
    )

    break;
    }

    return targetElement 
        ? createPortal(popupContent, targetElement)
        : popupContent;
}

export default Delete_popup