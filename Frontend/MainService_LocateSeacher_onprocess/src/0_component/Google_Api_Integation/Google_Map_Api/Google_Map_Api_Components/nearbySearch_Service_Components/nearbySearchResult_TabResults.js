import React, { useEffect, useState } from "react";

import Alt_Coffee_icon from '../../../../../1_image_or_icon/Alt_Coffee_icon.png'
import Alt_Restaurant_icon from '../../../../../1_image_or_icon/Alt_Restaurant_icon.png'
import Alt_Bar_icon from '../../../../../1_image_or_icon/Alt_Bar_icon.png'

import Pocket_Icon_Bar from '../../../../../1_image_or_icon/Pocket_icon_Bar.png'
import Pocket_Icon_Restaurant from '../../../../../1_image_or_icon/Pocket_icon_Restaurant.png'
import Pocket_Icon_Cafe from '../../../../../1_image_or_icon/Pocket_icon_Cafe.png'

import Arrow_Button_UpAhead from '../../../../../1_image_or_icon/Arrow_Button_UpAhead.png'
import { useSelector } from "react-redux";


export const NearbySearch_TabResults = (props) => {

    const [OnOff , updateToggle] = useState('off')
    const Distance_Comparison = useSelector(state => state.Comparison)


    const LineExtense = () => {
        const LineExtense = document.getElementById('LocationSearch_filter_Container')
        LineExtense.style.height = 'fit-content'
    }

    const Place_Photo_Inspector = (input) => {

        switch(typeof input.photos){
            case('object'):
            return input.photos[0].img_src

            case('undefined'):

                switch(input.types[0]){
                    case('cafe'):
                    return Alt_Coffee_icon
                
                    case('restaurant'):
                    return Alt_Restaurant_icon
                    
                    case('bar'):
                    return Alt_Bar_icon
                }
        }
    }

    const Photo_Size_Inspector = (input) => {
        switch(typeof input.photos){
            case('object'):
            return 'cover'

            case('undefined'):
            return 'none'
        }
    }

    const Place_Pocket_Icon_Inspector = (input) => {
        if(input.types.includes('cafe')){
            return Pocket_Icon_Cafe}
        
            if(input.types.includes('restaurant')){
            return Pocket_Icon_Restaurant}
            
            if(input.types.includes('bar')){
            return Pocket_Icon_Bar}
    }

    const Place_Reputation_Inspector = (input) => {
        const container = []
        
        switch(typeof input.rating){
            case('undefined'):
            return <span
            style={{
                backgroundColor: 'white',
                padding: '0 2vw'
            }}
            >
                No Reputation Yet
            </span>
        
            case('number'):
            for(let i=0; i<input.rating; i++){
                container.push("\u2B50")
            }
            return container.map((star)=>{
                return <span>{star}</span>
            })

            }
        }
    const TimeStamper = (input, index ) => {
        
            
            switch(typeof input[index]){
                case('undefined'):
                return;

                case('object'):
                const weekday_text = input[index].weekdayDescriptions

                return weekday_text.map((day_timeline)=>{
                    return <React.Fragment>
                        
                        <br
                        style={{
                            display: 'none'
                        }}
                        ></br>

                        <span
                        style={{
                            display: 'none',
                            textAlign: 'right',
                            width: 'fit-content'
                        }}>
                            <span
                            style={{
                                backgroundColor:'black',
                                color:'white',
                                border: 'black solid 5px',
                                borderRadius: '10px'
                            }}
                            >
                            {day_timeline.slice(0,3)}
                            </span>
                            
                            {day_timeline.slice(4).replaceAll().split(',').map((element)=>{
                            return <React.Fragment>
                                <span>{element}</span>
                                <br></br>
                                </React.Fragment>
                        })}
                        
                        </span>

                        </React.Fragment>
                })}
    }

    const Distance_calculator_Helper = (section, input) =>{

        const phi = (props[`${section}`].position.lat + input.location.latitude) / 2 * Math.PI/180;

        const distance_lat = Math.abs(props[`${section}`].position.lat)-Math.abs(input.location.latitude)
        const distance_lng = Math.abs(props[`${section}`].position.lng)-Math.abs(input.location.longitude)

        const metersPerDegLat = 111132; 
        const metersPerDegLon = 111320 * Math.cos(phi); 

        const dy = distance_lat * metersPerDegLat;
        const dx = distance_lng * metersPerDegLon;

        const result = Math.sqrt(dx*dx+dy*dy)
        
        return result

    }

    const Distance_calculator = (input) => {

        let Distance_Comparison;

        if( props.target.position != {lat: 0, lng: 0} &&
            Number(props.target.position.lat.toFixed(2)) == Number(props.client.position.lat.toFixed(2)) &&
            Number(props.target.position.lng.toFixed(2)) == Number(props.client.position.lng.toFixed(2))
        ){
            Distance_Comparison = 'client'
        }
        else{
            Distance_Comparison = 'target'
        }


        switch(Distance_Comparison){

            case('client'):
                
                Distance_Comparison = Distance_calculator_Helper('client', input)

                return <span
                style={{
                    fontFamily:'큐트신민상',
                    position: 'relative',
                    top: '-8px'
                }}
                >

                <span
                style={{
                    position: 'relative',
                    backgroundColor: '#ffcc00',
                    letterSpacing: '2px',
                    padding: '4px 4px 4px 8px',
                    borderRadius: '5px',
                    fontSize: '20px',
                    border: "white solid 4px",
                    zIndex: '1'
                }}
                >
                    {Distance_Comparison.toFixed(0)}m
                </span>
                
                <span
                style={{
                    position:'relative',
                    top:'1px',
                    left: '-3px',
                    backgroundColor: '#ffcc00',
                    letterSpacing: '2px',
                    padding: '9px 2px 6px 4px',
                    borderTopRightRadius: '5px',
                    borderEndEndRadius: '5px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    border: 'white solid 3px',
                    zIndex: '2'
                }}
                >
                    AWAY FROM YOU
                </span>
                
                </span>

            case('target'):
                
                Distance_Comparison = {
                    client : Distance_calculator_Helper('client', input),
                    target : Distance_calculator_Helper('target', input)
                }

                return <span
                    style={{
                        fontFamily: '큐트신민상',
                        position: 'relative',
                        top:'-20px',
                    }}
                >

                <span
                style={{
                    position: 'relative',
                    backgroundColor: '#ffcc00',
                    letterSpacing: '2px',
                    padding: '2px 2px 2px 6px',
                    borderRadius: '5px',
                    fontSize: '20px',
                    border: "white solid 4px",
                    zIndex: '1'
                }}
                >
                {Distance_Comparison.client.toFixed(0)}m
                </span>

                <span
                style={{
                    position:'relative',
                    top:'-1px',
                    left: '-2.5px',
                    backgroundColor: '#ffcc00',
                    letterSpacing: '2px',
                    padding: '5px 2px 3px 4px',
                    borderTopRightRadius: '5px',
                    borderEndEndRadius: '5px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    border: 'white solid 3px',
                    zIndex: '2'
                }}
                >
                 ( AWAY FROM YOU )
                </span>
                
                <br></br>

                    <span
                    style={{
                        position: 'relative',
                        top: '15px'
                    }}
                    >
                        <span
                        style={{
                        position: 'relative',
                        backgroundColor: '#ffeb3b',
                        letterSpacing: '2px',
                        padding: '2px 2px 2px 6px',
                        borderRadius: '5px',
                        fontSize: '20px',
                        border: "white solid 4px",
                        zIndex: '1'
                        }}
                        >
                            {Distance_Comparison.target.toFixed(0)}m
                        
                        </span>
                        
                        <span
                        style={{
                        position:'relative',
                        top:'-1px',
                        left: '-2.5px',
                        backgroundColor: '#ffeb3b',
                        letterSpacing: '2px',
                        padding: '5px 2px 3px 4px',
                        borderTopRightRadius: '5px',
                        borderEndEndRadius: '5px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        border: 'white solid 3px',
                        zIndex: '2'
                    }}
                        >
                        ( AWAY FROM SPOT )
                        </span>
                    </span>
                </span>
                
        }

    }

    const IsOpen_Inspector = (input, index) => {
        switch(typeof input[index]){
            case('undefined'):
            return;

            case('object'):
            const condition = input[index].openNow

            switch(condition){
                case(true):
                return <React.Fragment>
                        <span>Is Opened </span>
                        <img
                            src={Arrow_Button_UpAhead}
                            style={{
                                position: 'relative',
                                left: '6vw',
                                top: '0.3vh',
                                width: '4vw',
                                aspectRatio: '1'
                            }}
                            onClick={(tab)=>{
                                const Displayed = Array.from(tab.target.parentNode.childNodes).slice(3)
                                const Dropper = tab.target.parentNode.parentNode
                                
                                switch(OnOff){
                                    case('on'):
                                    updateToggle('off')
                                    Displayed.forEach((element)=>{
                                        element.style.display = 'none'
                                        element.style.textWrap = 'noWrap'
                                    })
                                    tab.target.style.rotate = '0deg'
                                    tab.target.parentNode.style.borderRadius = '0px'
                                    tab.target.parentNode.style.paddingBottom = '0vh'
                                    tab.target.parentNode.style.paddingRight = '7vw'
                                    tab.target.parentNode.style.border = 'solid black 0px'
                                    Dropper.style.marginBottom = '2vh'
                                    return;

                                    case('off'):
                                    updateToggle('on')
                                    Displayed.forEach((element)=>{
                                        element.style.display = 'block'
                                    })
                                    tab.target.style.rotate = '180deg'
                                    tab.target.parentNode.style.borderRadius = '15px'
                                    tab.target.parentNode.style.paddingBottom = '1vh'
                                    tab.target.parentNode.style.paddingRight = '3vw'
                                    tab.target.parentNode.style.border = 'solid black 1px'
                                    Dropper.style.marginBottom = '40vh'
                                    return;
                                }
                            }}>
                            
                        </img>
                        <br></br>
                        </React.Fragment>

                case(false):
                return <React.Fragment>
                        <span>Is Closed </span>
                        <img
                            src={Arrow_Button_UpAhead}
                            style={{
                                position: 'relative',
                                left: '6vw',
                                top: '0.3vh',
                                width: '4vw',
                                aspectRatio: '1'
                            }}
                            onClick={(tab)=>{
                                const Displayed = Array.from(tab.target.parentNode.childNodes).slice(3)
                                const Dropper = tab.target.parentNode.parentNode
                                
                                switch(OnOff){
                                    case('on'):
                                    updateToggle('off')
                                    Displayed.forEach((element)=>{
                                        element.style.display = 'none'
                                        element.style.textWrap = 'noWrap'
                                    })
                                    tab.target.style.rotate = '0deg'
                                    tab.target.parentNode.style.borderRadius = '0px'
                                    tab.target.parentNode.style.paddingBottom = '0vh'
                                    tab.target.parentNode.style.paddingRight = '7vw'
                                    tab.target.parentNode.style.border = 'solid black 0px'
                                    Dropper.style.marginBottom = '2vh'
                                    return;

                                    case('off'):
                                    updateToggle('on')
                                    Displayed.forEach((element)=>{
                                        element.style.display = 'block'
                                    })
                                    tab.target.style.rotate = '180deg'
                                    tab.target.parentNode.style.borderRadius = '15px'
                                    tab.target.parentNode.style.paddingBottom = '1vh'
                                    tab.target.parentNode.style.paddingRight = '3vw'
                                    tab.target.parentNode.style.border = 'solid black 1px'
                                    Dropper.style.marginBottom = '40vh'
                                    return;
                                }
                            }}>
                            
                        </img>
                        <br></br>
                        </React.Fragment>
            }
        }
    }

    useEffect(()=>{
       LineExtense()
    },[])

    return <React.Fragment>

    <div
    style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: ' 0 0 4vh 5vw',
        margin: '4vh 0'
    }}>


    {props.places.map((place, index)=>{

        return <React.Fragment>

        <div
        style={{
            position:'relative',
            top:'10px'
        }}
        >        
        {Distance_calculator(place)}
        </div>

        <div

        key={place.name}

        style={{
            width: '45vw',
            height: '35vh',
            border: 'black solid 5px',
            borderRadius: '20px',
            margin: '2.5vh 0 10vh 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingBottom: '2vh'
        }}>

            <a 
            href={`/search/location/${place.name}`}
            target="_blank"
            >
            
            <img
            src={Place_Photo_Inspector(place)}
            style={{
                width: '44vw',
                height: '15vh',
                borderRadius: '15px',
                border: 'white solid 2px',
                objectFit: Photo_Size_Inspector(place),
                backgroundColor: '#dfdfdf'
            }}
            ></img>
            </a>
                

                <span
                className="Places_Information_TextSection"
                style={{
                    fontSize: '5vw',
                    marginTop: '1vh',
                    textWrap: 'nowrap'
                }}
                >
                    {place.displayName.text.split(' ').map((str)=>{

                        if(str.length>10){
                        return <React.Fragment>
                            <span>{str.substr(0,6)}</span>
                            <br></br>
                            <span>{str.substr(6)}</span>
                            </React.Fragment>
                        }

                        return <React.Fragment>
                            <span>{str}</span>
                            <br></br>
                            </React.Fragment>
                    })}
                </span>

                <img
                src={Place_Pocket_Icon_Inspector(place)}
                className="Places_Information_TextSection"
                style={{
                    position:'absolute',
                    right: '11.5vw',
                    marginTop: '16.5vh',
                    width: '6vw'
                }}
                
                ></img>

                <span
                 className="Places_Information_TextSection"
                >
                    {Place_Reputation_Inspector(place)}
                </span>

                <span
                 className="Places_Information_TextSection"
                 style={{
                    fontSize: '3vw',
                    paddingTop: '1vh'
                 }}
                >
                {place.shortFormattedAddress}
                    
                </span>
                
                <span
                className="Places_Information_TextSection"
                style={{
                    textWrap: 'nowrap'
                 }}
                >
                TEL. {props.phonestamp[props.places.indexOf(place)]}
                </span>

                <span
                className="Places_Information_TextSection"

                style={{
                    position: 'absolute',
                    marginTop: '33vh',
                    textAlign: 'left',
                    backgroundColor: 'white',
                    lineHeight: '2.2vh'
                }}
                >
                    
                {IsOpen_Inspector(props.timestamp, props.places.indexOf(place))}
                {TimeStamper(props.timestamp, props.places.indexOf(place))}
                
                </span>

                <br></br>

            

        </div>
        </React.Fragment>
    })}

    </div>

    </React.Fragment>

}

export default NearbySearch_TabResults;