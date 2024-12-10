import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { ActionCreater } from "../../../../2_reducer/reducer";

import GlassIcon from '../../../../1_image_or_icon/reading_glass_icon.png'

export const SearchBar = () => {

    const SearchBar_Ref = useRef('')

    const Url = useSelector(state => state.urlObject)
    const dispatch = useDispatch()

    return <React.Fragment>

        <form
            id='SearchBar_Container'
            action="/search"
            method='GET'>

            <div id='SearchBar'>

                <input
                    id="SearchBar_Input"
                    ref={SearchBar_Ref}
                    name='keyword'
                    // defaultValue={Url.urlToString}
                    type="text"
                    onChange={
                            
                            ()=>{
                                dispatch(ActionCreater('UpdateUrl','keyword',`${SearchBar_Ref.current.value}`))
                            }
                                
                            }
                            
                    onKeyUp={
                        
                            ()=>{
                                if(window.event.keyCode === 13){
                                    document.location.href = `/search?${Url.toString()}&FilterTabBar=opened`
                                }
                    }}>
                </input>

                <a
                id = 'Search_Keyword_&_Options' 
                href={`/search?${Url.toString()}&FilterTabBar=opened`}>
                <img id="Reading_Glass_icon" src={GlassIcon}>
                </img>
                </a>

            </div>


        </form>

    </React.Fragment>

}

export default SearchBar;