import React, {useRef, useState, useEffect} from "react"
import styled from "styled-components"
import { createPortal } from 'react-dom'

const Delete_popup_container = styled.div`
    position: relative;
    display: ${props => props.activate ? 'block' : 'none'};
    background-color: white;
    bottom: 250px;
    right: 10px;
    padding: 20px 30px;
    text-align: center;
    border: 2px solid black;
    width: 80%;
    `

const Delete_popup = (props) => {
    const selfRef = useRef(null)
    const [targetElement, setTargetElement] = useState(null)

    useEffect(()=>{
        if(!selfRef.current){
            console.log("selfRef is undefined")
            return;
        }
        
        const previousSibling = selfRef.current.parentElement;
        if(previousSibling && previousSibling.children[props.index]){
            setTargetElement(previousSibling.children[props.index]);
        }
    },[])

    const popupContent = (
        <Delete_popup_container
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
        </Delete_popup_container>
    );

    return targetElement 
        ? createPortal(popupContent, targetElement)
        : popupContent;
}

export default Delete_popup