import React, { useEffect, useState } from "react";
import Foodscript_map from "./Foodscript_map";

export const foodscript_page = () =>{

    return <React.Fragment>

        <div
        style={{
            width: '100%',
            height: '100%',
            display:'flex',
            flexDirection:'column',
            alignItems:'center'

        }}
        >

            <div
            style={{
                    width: '55.5vw',
                    padding: '1vh 0',
                    margin:'30px 0',
                    borderRadius: '15px',
                    fontFamily: '큐트신민상',
                    letterSpacing: '0.5vw',
                    fontWeight: 'bold',
                    border: 'black solid 2px',
                    backgroundColor: '#f8bb49ff',
                    textAlign: 'center',
                    whiteSpace: 'pre-wrap',
                    lineHeight: '25px'
                }}
            >
        {`\u{1F6AA} Log Your Visit \u{1F6AA} \u000A`}
        {`\u{1F30F} Welcome Foodscript \u{1F30F}`}
            </div>

            <Foodscript_map/>
        </div>

    </React.Fragment>

}

export default foodscript_page;