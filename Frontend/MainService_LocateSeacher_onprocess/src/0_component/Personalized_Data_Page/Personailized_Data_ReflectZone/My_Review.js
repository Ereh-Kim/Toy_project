import React, { useEffect, useRef, useState } from "react";
import { Form, useParams } from 'react-router-dom'

import DateCalculator from "./DateCalculator.js";
import OnOffToggler from '../../../1_image_or_icon/OnOff_Toggler_icon.png'
import Add_Icon from "../../../1_image_or_icon/OnOff_Toggler_icon.png"

const Single_ReviewData = (props) => {

    const params = useParams()

    const containerRef = useRef(null)
    const PICTURE_URL = useRef(null)
    const CheckBox = useRef(null)
    const Close_Btn = useRef(null)
    const Checked_Or_Not = useRef(null)
    const TEXTDATA = useRef(null)

    const [STARRATE, updateSTAR] = useState()
    const [Btn_status, updateBtn] = useState({
        display: 'none',
        position: 'none',
        checked: false,
    })
    const [FontSize, updateFONTSIZE] = useState({})
    const [WIDTH, updateWIDTH] = useState({fliped: false})
    const [HEIGHT, updateHEIGHT] = useState({height: 0})

    const [Single_Review, updateREVIEW] = useState({
        placename: undefined,
        picture_url_array: [],
        created_at: undefined
    })

    const [PATCHDATA, updatePATCH] = useState({
        target: undefined,
        patchdata: {
            user_post_pictures: []
        }
    })

    useEffect(()=>{

        if(params.reviewid && props.id.userinfo.id && props.id.status==='verified'){
            Load_Single_Review(params.reviewid, props.id.userinfo.id)
        }

        const divElement = containerRef.current
        const picture_HEIGHT = PICTURE_URL.current

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
                updateHEIGHT((pre)=>({
                    height : Number(picture_HEIGHT.offsetHeight+20)
                }))
            }
        })
    
        if(divElement){
            resizeObserver.observe(divElement)
            resizeObserver.observe(picture_HEIGHT)
        }

        return()=>{
            resizeObserver.disconnect()
        }

    },[props, PATCHDATA.patched])

    const Load_Single_Review = async (reviewid, userid) => {
        await fetch(`/usercreation/read_review/${reviewid}/${userid}`).then( async (res)=>{
            const Single_Review = await res.json()
            updateREVIEW(Single_Review.result)
            updateSTAR(Single_Review.result.star_rating)
            updatePATCH({
                ...PATCHDATA,
                patchdata:Single_Review.result
            })
        })
    }

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
                defaultValue={STARRATE}
                onChange={(e)=>{
                    
                    updatePATCH((pre)=>({
                        ...pre,
                        patchdata:{
                            ...pre.patchdata,
                            star_rating: e.target.value
                        }
                    }))
                    updateSTAR(e.target.value)
                    
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
            height: 'fit-content',
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
            {Single_Review.placename}
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
            defaultValue={Single_Review.user_post_text}
            ref={TEXTDATA}
            >
            </textarea>

            <div
            style={{
                justifySelf:'center',
                fontSize: FontSize.title
            }}
            >
            작성자: {params.userid}
            </div>
            

            <div
            style={{
                fontSize: FontSize.title
            }}
            >Created At</div>

            <div
            style={{
                width: '80%',
                textAlign: 'center'
            }
            }>
                {Single_Review.created_at !== undefined
                ? `${Single_Review.created_at.slice(0,10).replaceAll('-','.')}`
                : ''}
                
            </div>

            <div
            style={{
                height: PATCHDATA.target === undefined ? '0px' : `${HEIGHT.height}px`,
                display:'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                alignItems: 'center'
            }}
            >
                <img
                ref={PICTURE_URL}
                style={{
                    width: '80%',
                    aspectRatio: '1',
                    objectFit: 'cover',
                    display: 'none',
                    borderRadius: '15px',
                    padding: '5px',
                    border: 'white solid 2px',
                    margin: '10px 15px 30px 15px'
                }}
                >
                </img>

                <div
                style={{  
                    display: Btn_status.display,
                    position: Btn_status.position,
                    bottom: '150px'
                }}
                >

                    <input
                    type="file"
                    multiple
                    accept="image/*"
                    id="Add_picture"
                    style={{
                        display:"none"
                    }}
                    onChange={async (event)=>{

                        const Add_file = event.target.files
                        const FILEREADER_URL = new FileReader()
                        const FILEREADER_BINARY = new FileReader()

                        let Added_URL_Array = [...Single_Review.picture_url_array]
                        let Added_BINARY_Array = PATCHDATA.patchdata.user_post_pictures === undefined 
                        ? [...Single_Review.user_post_pictures]
                        : [...PATCHDATA.patchdata.user_post_pictures]

                        let index=0;

                            async function handleURL() { 
                            
                                for (const element of Array.from(Add_file)) {

                                    const fileDataUrl = await new Promise((resolve, reject) => {
                                        FILEREADER_URL.onload = (e) => resolve(e.target.result);
                                        FILEREADER_URL.readAsDataURL(element);
                                    });
                                    Added_URL_Array.splice(PATCHDATA.target+index+1, 0, fileDataUrl)
                                    index++
                                }
                            
                                updateREVIEW({
                                    ...Single_Review,
                                    picture_url_array: Added_URL_Array
                                });
                                PICTURE_URL.current.src = Added_URL_Array[PATCHDATA.target]
                                index =0;
                            }

                            async function handelBINARY() {
                                for (const element of Array.from(Add_file)) {

                                    const fileDataBNINARY = await new Promise((resolve, reject) => {
                                        FILEREADER_BINARY.onload = (e) => resolve(e.target.result);
                                        FILEREADER_BINARY.readAsArrayBuffer(element);
                                    });
                                    Added_BINARY_Array.splice(PATCHDATA.target+index+1, 0, fileDataBNINARY)
                                    index++
                                }

                                updatePATCH({
                                    target: PATCHDATA.target,
                                    patchdata: {
                                        ...PATCHDATA.patchdata,
                                        user_post_pictures: Added_BINARY_Array
                                    }
                                })
                                index = 0;
                            }

                            

                        await handleURL();
                        await handelBINARY();
                    }}
                    >
                    </input>
                
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '4px',
                            borderRadius: '15px',
                            border: 'black solid 3px',
                            marginBottom: '15px'
                        }}
                    >
                        <label
                        htmlFor="Add_picture"
                        >
                            <img  
                            src={Add_Icon}
                            style={{
                                width: '20px',
                                transform: 'rotate(45deg)'
                            }}
                            >
                            </img>

                            <span
                            style={{
                                fontSize: '15px',
                                fontWeight: 'bold',
                                padding: '10px 10px',
                                
                                position: 'relative',
                                bottom: '4.5px',
                            }}
                            >
                                Add
                            </span>
                        </label>
                    </div>

                    <div
                        
                        style={{
                            backgroundColor: 'white',
                            padding: '4px',
                            borderRadius: '15px',
                            border: 'black solid 3px'
                        }}
                    
                        onClick={()=>{
                            let PRESERVED = [...Single_Review.picture_url_array]
                            let PRESERVED_BINARY = [...PATCHDATA.patchdata.user_post_pictures]
                            PRESERVED = PRESERVED.filter((_, indes) => indes !== PATCHDATA.target)
                            PRESERVED_BINARY = PRESERVED_BINARY.filter((_, indes) => indes !== PATCHDATA.target)

                            updatePATCH((pre)=>({
                                target: PATCHDATA.target,
                                patchdata:{
                                    ...PATCHDATA.patchdata,
                                    user_post_pictures: PRESERVED_BINARY
                                }
                            }))
            
                            updateREVIEW({
                                ...Single_Review,
                                picture_url_array: PRESERVED
                            })

                            if(PATCHDATA.target>=0 && PATCHDATA.target !== PRESERVED.length){
                                PICTURE_URL.current.src = Single_Review.picture_url_array[PATCHDATA.target+1]
                                console.log(PATCHDATA.target, PRESERVED.length)
                            }
                            if( PRESERVED.length>0 && PATCHDATA.target === PRESERVED.length){
                                console.log(PATCHDATA.target)
                                PICTURE_URL.current.src = Single_Review.picture_url_array[PATCHDATA.target-1]
                                updatePATCH({
                                    target: PATCHDATA.target-1,
                                    patchdata:{
                                        ...PATCHDATA.patchdata,
                                        user_post_pictures: PRESERVED_BINARY
                                    }
                                })
                            }
                            if( PRESERVED.length === 0){
                                
                                PICTURE_URL.current.style.display = 'none'
                                updateBtn({
                                    position: 'relative',
                                    display: 'none',
                                    checked: true
                                })
                                Close_Btn.current.style.display = 'none'
                                CheckBox.current.style.display = 'none'
                            }
                        }}
                    >
                        <img  
                        src={OnOffToggler}
                        style={{
                            width: '20px'
                        }}
                        >
                        </img>

                        <span
                        style={{
                            fontSize: '15px',
                            fontWeight: 'bold',
                            padding: '10px 10px',
                            
                            position: 'relative',
                            bottom: '4.5px',
                        }}
                        >
                            Delete
                        </span>
                    </div>
                
                </div>
            </div>

            <div
            style={{
                display: 'none'
            }}
            ref={CheckBox}
            onChange= {(e)=>{
                if(e.target.checked === true){
                    updateBtn({
                        position: 'relative',
                        display: 'none',
                        checked: true
                    })
                }
                else{
                    updateBtn({
                        position: 'relative',
                        display: 'block',
                        checked: false
                    })
                }

            }}
            >
                <input
                type='checkbox'
                id='View_Clear_checkbox'
                ref={Checked_Or_Not}
                >
                </input>

                <label
                for="View_Clear_checkbox"
                >
                View Clear
                </label>
            </div>

            <div
                style={{
                    display: 'none',

                    width: '80%',
                    textAlign: 'center',

                    backgroundColor: 'white',
                    padding: '10px',
                    borderRadius: '15px',
                    border: 'black solid 3px'
                }}
                ref={Close_Btn}
                onClick={
                    (e)=>{
                        updateBtn({
                            position: 'none',
                            display: 'none',
                            checked: false
                        })
                        const PICTURE_SUBNAIL = PICTURE_URL.current
                        const CheckBox_Status = CheckBox.current

                        PICTURE_SUBNAIL.style.display = 'none'
                        CheckBox_Status.style.display = 'none'
                        Close_Btn.current.style.display = 'none'

                    }
                }
            >
                <span
                style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    letterSpacing: '3.5px'
                }}>
                    close
                </span>
            </div>

            <div
            style={{
                width: '90%',
                display: Single_Review.picture_url_array.length === 0 ? 'none' : 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                rowGap: '1vw',
                border: 'white solid 3px',
                justifyItems: 'center',
                padding: '10px 5px'
            }}
            >
                { Single_Review.picture_url_array.length !== 0 
                ? Single_Review.picture_url_array.map((url, index)=>{
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
                            console.log(index)

                            let UpdateFormData = new FormData


                            updatePATCH({
                                ...PATCHDATA,
                                target: index
                            })

                            const PICTURE_ELEMENT = PICTURE_URL.current
                            PICTURE_ELEMENT.style.display= 'block'
                            PICTURE_ELEMENT.src= url

                            const CheckBox_Status = CheckBox.current
                            CheckBox_Status.style.display = 'block'

                            const Check_Sign = Checked_Or_Not.current
                            const Close_Btn_Status = Close_Btn.current
                            Close_Btn_Status.style.display = 'block'

                            if(Check_Sign.checked === true){
                                updateBtn({
                                    position: 'none',
                                    display: 'none',
                                    checked: false
                                })
                            }
                            else{
                                updateBtn({
                                    position: 'relative',
                                    display: 'block',
                                    checked: true
                                })
                            }
                        }
                    }
                    
                    >
                    </img>
                })
                : ''
                }

                <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    width: '10vw',
                    aspectRatio: '1/1',
                    border:'black solid 3px',
                    borderRadius: '10px',
                    backgroundColor: 'white'
                }}
                >
                    <label
                    htmlFor="Add_picture"
                    >
                        <img
                        src={Add_Icon}
                        style={{
                            width: '6.5vw',
                            transform: 'rotate(45deg)'
                        }}
                        >
                        </img>
                    </label>

                </div>

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
            onClick={ async ()=>{
                console.log(PATCHDATA)

                let PATCH_FORMDATA = new FormData()

                PATCHDATA.patchdata.user_post_pictures.forEach((element, index)=>{
                    if(element.data === undefined){
                        console.log('new data')
                        const NEW_DATA = new Uint8Array(element)
                        const NEW_BLOB = new Blob([NEW_DATA], { type: 'image/jpeg' })
                        const NEW_file = new File([NEW_BLOB], `Added_img_${params.reviewid}_${index}.jpg`)
                        PATCH_FORMDATA.append('patch_pictures', NEW_file)
                    }
                    else{
                        console.log('pre data')
                        const PRE_DATA = new Uint8Array(element.data)
                        const PRE_BLOB = new Blob([PRE_DATA], { type: 'image/jpeg' })
                        const PRE_file = new File([PRE_BLOB], `PRE_EXSISTED_img_${params.reviewid}_${index}.jpg`, {type: 'image/jpeg'})
                        PATCH_FORMDATA.append('patch_pictures', PRE_file)
                    }

                })
                
                PATCH_FORMDATA.append(`review_id`, params.reviewid)
                PATCH_FORMDATA.append(`user_id`, props.id.userinfo.id)
                PATCH_FORMDATA.append(`patch_star_rating`, STARRATE)
                PATCH_FORMDATA.append('patch_text', TEXTDATA.current.value)
                
                await fetch(`/usercreation/review/${params.reviewid}`,{
                    method: 'PATCH',
                    body: PATCH_FORMDATA
                })
                
            }}
            >
                Save
            </div>
            

        </div>
        

    </React.Fragment>



}

export default Single_ReviewData