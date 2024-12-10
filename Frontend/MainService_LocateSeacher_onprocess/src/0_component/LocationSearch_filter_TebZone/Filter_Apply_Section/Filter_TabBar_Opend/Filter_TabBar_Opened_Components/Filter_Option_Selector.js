import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { ActionCreater } from "../../../../../2_reducer/reducer";

export const Filter_Option_Selector = (props) => {

    let counter= 0;

    const NowUrl = useSelector(state => state.urlObject)
    const dispatch = useDispatch()

    const Showing_popup = () => {

        const Keyword_Cotainer = document.getElementById('Keyword_popup_Closed')
        Keyword_Cotainer.id = 'Keyword_popup'

        const Keyword_option_Text = document.getElementById('Keyword_popup_option')
        Keyword_option_Text.textContent = `${props.option}`
    
    }

    const DisplayKeyword = (state,option) => {

        const Input = state.get(option)

        switch(typeof Input){
                case('object'):
                return;

                case('string'):
                const wrapper = Input.replaceAll(',', ` `).split(' ')

                return wrapper.map((li)=>{
                    
                    switch(counter+li.length>=20){

                        case(true):

                        counter = li.length;

                    return <React.Fragment>
                    <br></br>
                    <span
                    className="Added_Keywords"
                    onClick={
                        (tab)=>{
                            dispatch(
                                ActionCreater(
                                    'EliminateKeyword',
                                    props.option,
                                    tab.target.textContent))
                        }

                    }
                    >{li}</span></React.Fragment>

                        case(false):

                        counter = counter + li.length

                        return <span
                    className="Added_Keywords"
                    onClick={
                        (tab)=>{
                            dispatch(
                                ActionCreater(
                                    'EliminateKeyword',
                                    props.option,
                                    tab.target.textContent))
                        }

                    }
                    >{li}</span>
                    
                
                
                }
            
                })
            }
    }

    return <React.Fragment>

        <div className="OptionSelector">

            <span className="OptionRepresented">{props.option}</span>
            <br></br>
            <p className={`Added_Keyword_Container`}>
            {DisplayKeyword(NowUrl,props.option)}
            </p>
            <div className="OptionSelector_Button" onClick={()=>{

                        Showing_popup()

            }}>+</div>

        </div>

    </React.Fragment>

}

export default Filter_Option_Selector