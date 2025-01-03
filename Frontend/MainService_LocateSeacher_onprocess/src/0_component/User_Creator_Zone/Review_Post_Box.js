import React, { useRef } from "react";

const Review_Post_Box = (props) =>{

    const ReviewText = useRef(null);

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
            action=""
            method="POST"
            >

            <label
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
            >
                <span>
                    Click Here
                    <br></br>

                    <br></br>
                    To Add Picture
                </span>

            </label>
            

            <textarea
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
            ref={ReviewText}
            placeholder="Write down your comment at here"
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