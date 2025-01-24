import React, { useEffect } from "react";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ActionCreater } from "../../../../../2_reducer/reducer";

export const Keyword_popup = () => {

    const ref = useRef()
    let Keyword_Cotainer = []

    const Url_Current = useSelector(state => state.urlObject)

    let dispatch = useDispatch()

    const Appending_Keyword = (Keyword_Current_Option, Keyword_Input) => {

        let Keyword = Url_Current.get(Keyword_Current_Option)
        
        switch(typeof Keyword){

            case('string'): Inspectiong_Keyword(Keyword_Input, Keyword_Cotainer, Keyword_Current_Option, Keyword)
            return;


            case('object'):
            console.log('object')
                Keyword_Cotainer = []
                Keyword_Cotainer.push(Keyword_Input)
                dispatch(ActionCreater('UpdateUrl',`${Keyword_Current_Option}`,Keyword_Cotainer))
                alert(`${Keyword_Input} got updated at ${Keyword_Current_Option}`)
                

                return;
            }
        }

        const Inspectiong_Keyword = (Keyword, Keyword_Cotainer, Keyword_Current_Option, Keyword_exsisted) => {

            Keyword_Cotainer = []
            
            Keyword_exsisted.replaceAll(',', ` `).split(' ').forEach(element => {
                Keyword_Cotainer.push(element)
            });


            switch(Keyword_Cotainer.includes(Keyword)){
                
                    case(true):
                        alert(`${Keyword} is already updated at ${Keyword_Current_Option}`)
                        return;   

                    case(false):
                        Keyword_Cotainer.push(Keyword)
                        alert(`${Keyword} got updated at ${Keyword_Current_Option}`)
                        dispatch(ActionCreater('UpdateUrl',`${Keyword_Current_Option}`,Keyword_Cotainer))
                        

                        return;
            }

        }

        const Close_popup = () => {

            const Keyword_style = document.getElementById('Keyword_popup') 
            Keyword_style.id = 'Keyword_popup_Closed'

        }

        const Keyword_Event_Integrated = () => {

            const Keyword_Matched = document.getElementById('Keyword_popup_option')

            Appending_Keyword(Keyword_Matched.textContent, ref.current.value)

            const Keyword_Input = document.getElementById('Keyword_popup_input')
            Keyword_Input.value = ''

            Close_popup()     


        }
        

    return <div id='Keyword_popup_Closed'>
    <div id='Keyword_popup_option'>Keyword Matched To </div> 
    <span style={{
        position:'fixed',
        right: '22vw',
        top: '19vh',
        background: 'black',
        borderRadius: '20px',
        color: 'white',
        padding: `0.3vh 1.3vw`
    }}
        onClick={Close_popup}
    
    >X</span>
    
    <div>Keyword to Add</div>

    <input ref={ref} id="Keyword_popup_input" 
        onKeyUp={()=>{
            if(window.event.keyCode ===13 ){
                Keyword_Event_Integrated()
                
            }
        }}
    ></input>
    <br></br>
    
    <button id="Keyword_popup_button" onClick={
        ()=>{

            Keyword_Event_Integrated()

        }
    }>Add</button>
    </div>

}

export default Keyword_popup