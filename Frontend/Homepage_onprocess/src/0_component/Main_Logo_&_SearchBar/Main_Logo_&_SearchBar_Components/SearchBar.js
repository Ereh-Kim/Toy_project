import React, { useRef, useState } from "react"

export const SearchBar = () => {

const SearchBar_Ref = useRef('')
const [Search_Keyword, updateKeyword] = useState('')

const Detech_Change_ForSearch = () => {
    updateKeyword(SearchBar_Ref.current.value)
    console.log(Search_Keyword)
}

    return(
        <React.Fragment>
            <form 
                style={{width: '100%'}}
                action='/search'
                method='GET'>

                <div id="SearchBar">
                
                    <input id="SearchBar_Input"
                    ref={SearchBar_Ref}
                    onChange={Detech_Change_ForSearch}
                    name="keyword"/>

                    <a href={'/search?keyword='+Search_Keyword}>
                    {/* ㄴ> 검색 알고리즘 과 검색 랜딩페이지도 구성예정 */}
                    <img src="\1_image_or_icon\reading_glass_icon.png" 
                    id="Reading_Glass_icon"/>
                    </a>

                </div>
            </form>

        </React.Fragment>

    )
}

export default SearchBar