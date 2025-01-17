import React, {useState, useRef, useEffect} from "react";
import {useLocation} from 'react-router-dom'

const Review_Post_Box = (props) =>{

    const [text, setText] = useState('');
    const [pictures, setPictures] = useState([]);
    const [pictures_input, setInput] = useState([])
    const textareaRef = useRef(null);
    
    useEffect(()=>{
        if (textareaRef.current) {
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
          }
    },[text])

    const location = useLocation();

    const handleChange = (e) => {
        setText(e.target.value); 
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let ID = await fetch('/login_check',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })

        let ID_data = await ID.json()

        switch(ID_data.status){

        case('verified'):
            const formData = new FormData(e.target)
            const placecode = location.pathname.slice(17)
            console.log(pictures_input.length)

            formData.delete('post_pictures')
            pictures_input.forEach((file)=>{
                formData.append('post_pictures',file)
            })
            
            formData.append('id',ID_data.userinfo.id)
            formData.append('placecode', placecode)
            
            const POST_ACTION = await fetch('/usercreation/post_review',{
                method:`POST`,
                body: formData
            })

            props.PostEvent()
            alert(`Your new review got posted`)
            break;

        case('unverified'):
            alert(`You need to login or join foodscript user before you write down`)
            break;

        case(undefined):
            alert(`You need to login before you write down`)
            break;

        default:
            break;

        }
    }

        const Picture_Status = (props) => {

            if(props.input.length === 0){ 
                return <label
                style={{
                    width:'95%',
                    height:'15vh',
    
                    display:'grid',
                    justifyContent: 'center',
                    alignItems:"center",
    
                    border: 'black solid 2px',
                    borderBottom: 'black solid 5px',
                    borderRadius: '15px',
    
                    textAlign: 'center',
    
                    background: '#f5ee90',
                    fontFamily: '큐트신민상'
                }}
                htmlFor="post_pictures"
                >
    
                    <span>
                        Click Here
                        <br></br>
    
                        <br></br>
                        To Add Picture
                    </span>
    
                </label>
    
    
             }

            else{
            return <React.Fragment>

            <div
            style={{
                width:'95%',
                height:'fit-content',
                borderRadius: '23px',
                margin: '3vh 0vw 0vh 0vw',

            }}
            >

                <div
                style={{

                    display:'grid',
                    gridAutoFlow:'column',
                    alignItems:'center',
                    gap: '12vw',
                    width: '53vw',
                    height: 'fit-content',
                    overflowX: 'auto',
                    
                    whiteSpace: 'nowrap',
                    padding: '0 1.5vw'

                }}
                >
                    {props.input.map((element)=>{
                        
                        return <img
                            style={{
                                width:'50vw',
                                border: 'white solid 1vw',
                                aspectRatio: '1',
                                borderRadius: '15px'
                            }}
                            src={element}
                        >
                        </img>
                    })}

                <label
                style={{
                    width:'50vw',
                    aspectRatio: '1',
                    border:'white solid 5px',
                    borderRadius:'20px',

                    display:'grid',
                    justifyContent: 'center',
                    alignItems:"center",
    
                    textAlign: 'center',
                    
                    fontFamily: '큐트신민상',
                    fontSize: '20px',

                }}
                htmlFor="post_pictures"
                >
    
                    <div
                        style={{
                            width:'40vw',
                            border:'white solid 5px',
                            aspectRatio: '1',
                            display:'grid',
                            justifyContent: 'center',
                            alignItems:"center",

                            border: 'black solid 3px',
                            borderBottom: 'black solid 6px',
                            borderRadius: '15px',
                        }}
                    >
                        <span>
                        Click Here
                        <br></br>
                        <br></br>
                        <span
                        style={{
                            backgroundColor: 'white',
                            padding: '0.5vh 1vw 0 1vw',
                            borderRadius: '15px'
                        }}
                        >
                            +
                        </span>
                        <br></br>
                        <br></br>
                        To Add Picture
                        </span>
                    </div>
    
                </label>

                </div>
                </div>


            </React.Fragment>
            }
        }

    return <React.Fragment>
        
        <div
        style={{
            width: 'inherit',
            height: 'fit-content',

            border: 'black solid 2.5px',
            borderBottom: 'black solid 6px',

            borderRadius: '15px',
            padding: '2vh 5vw',

            fontSize: '20px'

        }}
        >

            <form
            onSubmit={handleSubmit}
            >
            
            <Picture_Status input={pictures}/>

            <input
            id="post_pictures"
            name="post_pictures"
            type="file"
            multiple
            accept="image/*"

            required
            onChange={(e)=>{
                const files = e.target.files
                setInput([...pictures_input, ...files])
                

                if(files.length > 0){
                    Array.from(files).forEach((file) => {
                        const reader = new FileReader()
                        reader.onload = function(e){
                            const imageData = e.target.result;
                            setPictures((pictures)=>[...pictures, imageData])
                        }
                    reader.readAsDataURL(file)
                    })
                    e.target.removeAttribute('required');
                }
                else{
                    e.target.setAttribute('required', 'required');
                }
                
            e.target.value='';
            }}
            style={{
            display:"none"
            }}
            >
            </input>

            <textarea
            name="post_text"
            style={{
                height:'20vh',

                marginTop: '3vh',
                fontSize: '15px',

                padding: `3vh 6vw`,

                border: 'black solid 2px',
                borderBottom: 'black solid 5px',
                borderRadius: '15px',

                backgroundColor: '#f2eeb8',

                letterSpacing: '1.5px',
                wordSpacing: '-3px',
                lineHeight: '3.5vh'
            }}
            placeholder="Write down your comment at here"
            
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            required
            >
            
            </textarea>
        
            <input
            type="submit"
            value={'Post it'}
            style={{
                width:'100%',
                
                fontFamily: '큐트신민상',
                fontSize: '5vw',
                fontWeight: 'bold',
                letterSpacing: '2vw',

                borderBottom: 'black solid 5px',

                marginTop: '1vh',
                padding: '1.5vh 0vw',

                borderRadius: '10px',
                
            }}
            >
            
            </input>
            </form>

        </div>
        

    </React.Fragment>

}

export default Review_Post_Box;