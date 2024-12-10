import React from "react";
import { useState, useEffect } from "react";
import { Link} from 'react-router-dom';


export const OnOff_Toggler = (props) => {

    const Url = new URLSearchParams(document.location.search)
    const Status = Url.get('TabNevBar')

    const [ TabNevBar_Status, updateOnnOff] = useState('opened')

    

    useEffect(()=>{
        switch(Status){
            case ('closed'): 
            ConvertStructure('closed')
            updateOnnOff('opened')
            return;

            case ('opened'): 
            ConvertStructure('opened')            
            updateOnnOff('closed')
            return;
        }
    },[Url])

    const ConvertStructure = (status) => {
        
        switch(status){

            case ('opened'):
                document.getElementById('Personalized_data_Container').style.width = `25vw`                    
                document.getElementById('ToggleButton').style.marginLeft = `18vw`
                return;

            case ('closed'):
                document.getElementById('Personalized_data_Container').style.width = `7vw`                
                document.getElementById('ToggleButton').style.marginLeft = '0px'
                return; 
            }

    }

    const TabNevBar_Toggler = () =>{
        switch(TabNevBar_Status){

            case ('closed'): 
            ConvertStructure(TabNevBar_Status)
            updateOnnOff('opened')
            return;

            case ('opened'): 
            ConvertStructure(TabNevBar_Status)            
            updateOnnOff('closed')
            return;
        }
    }

    Url.set('TabNevBar',`${TabNevBar_Status}`)

    return <React.Fragment>

        <Link to={`?${Url.toString()}`}>
        <img
        id={props.id}
        className={props.className}
        src={props.src}
        onClick={TabNevBar_Toggler}
        ></img>
        </Link>

    </React.Fragment>

}

export default OnOff_Toggler;