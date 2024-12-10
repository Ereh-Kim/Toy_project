import React from "react"

export const Personal_Despenser = (props) => {

    switch (typeof props.list){
        
        case ('object'): return <React.Fragment>

            <div className="Single_Supporters_Name"> {props.list.firstName} {props.list.lastname}</div>
            
            <div className="Single_Supporters_Instruction">{props.list.company.name}</div>

            <div className="Single_Supporters_Instruction"> {props.list.company.title}</div>

        </React.Fragment>


        case ('undefined'): return 'undefined'
    
    }
}

export default Personal_Despenser