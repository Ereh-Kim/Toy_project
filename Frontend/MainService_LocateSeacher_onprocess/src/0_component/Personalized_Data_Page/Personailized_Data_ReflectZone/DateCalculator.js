import React, { useState, useRef, useEffect } from "react"

export const DateCalculator = (props) => {
    const [Datedata, updatedata] = useState('')
    const [parentWidth, setParentWidth] = useState(0)
    const containerRef = useRef(null)

    useEffect(() => {

        const container = containerRef.current
        if (!container) return

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const parentWidthInPx = entry.target.parentElement.offsetWidth
                const vw = (parentWidthInPx / window.innerWidth) * 100
                setParentWidth(vw)
            }
        })

        resizeObserver.observe(container)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    const RECORDTIMELINE = () =>{

        let result;

        if(props.date !== undefined){
            result = props.date.slice(0,10).replaceAll('-','.')
        }

        return result
    }

    const Define_Today = () =>{

        const Today_Y = new Date().getFullYear()
        const Today_M = new Date().getMonth()+1
        const Today_D = new Date().getDate()
        const Today_T = new Date().toLocaleString('ko-KR',{
            timeZone: 'Asia/Seoul'
        })
        
        return {
            Year : Today_Y,
            Month : Today_M,
            Date : Today_D
        }
    }

    let Today_Data = Define_Today();

    const Status_Definer = (origin, target) => {
    
        const ORIGIN = Number(origin)
        const TARGET = Number(target)

        if(ORIGIN < TARGET){
           return{
                Gap: Number(TARGET-ORIGIN),
                status: '+'
                }
        }
        if(ORIGIN > TARGET){
            return{
                Gap: Number(ORIGIN-TARGET),
                status: '-'
                }
        }
        if(ORIGIN === TARGET){
            return{
                Gap: 0,
                status: '='
                }
        }
        else{
            return;
        }
    
    
    }
    
    const CompareYMD = async (section, target) =>{
    
        switch(section){
            case('Year'):
            return Status_Definer(Today_Data.Year, target);
    
            case('Month'):
            return Status_Definer(Today_Data.Month, target);
    
            case('Date'):
            return Status_Definer(Today_Data.Date, target);
    
            default:
            return;
        }
    }
    
    const CompareProcess = async (target) =>{

        const Yeardata = await CompareYMD('Year', Number(target.Year))
        const Monthdata = await CompareYMD('Month', Number(target.Month))
        const Datedata = await CompareYMD('Date', Number(target.Date))
        
        return {
            Year: Yeardata,
            Month: Monthdata,
            Date: Datedata
        }
    }


    if(typeof props.date !== 'undefined'){
        const Timeline_Data = props.date.split(/T|Z/)

        const Target_Data = {
            Year: Number(Timeline_Data[0].split('-')[0]),
            Month: Number(Timeline_Data[0].split('-')[1]),
            Date: Number(Timeline_Data[0].split('-')[2]),
            Time: Timeline_Data[1]
        }

        CompareProcess(Target_Data).then((result)=>{
            
            if(result.Year.Gap !== 0){
                switch(result.Year.status){
                    case('+'):
                    updatedata(`${result.Year.Gap} years ahead`)
                    return;

                    case('-'):
                    updatedata(`${result.Year.Gap} years ago`)
                    return;

                    default:
                    return;
                }
            }
            else{
                if(result.Month.Gap !== 0){
                    switch(result.Month.status){
                        case('+'):
                        updatedata(`${result.Month.Gap} months ahead`)
                        return;
    
                        case('-'):
                        updatedata(`${result.Month.Gap} months ago`);
                        return;
    
                        default:
                        return;
                    }
                }
                else{
                    if(result.Date.Gap !== 0){
                        switch(result.Date.status){
                            case('+'):
                            updatedata(`${result.Date.Gap} days ahead`);
                            return;
        
                            case('-'):
                            updatedata(`${result.Date.Gap} days ago`);
                            return;
        
                            default:
                            return;
                        }
                    }
                    else{
                        updatedata(`Today`)
                    }
                }
            
            }

            
        })

    }

    else{
        console.log(props)
        return;
    }

    return (
        <div 
            ref={containerRef}
            style={{
                fontSize: `calc(${parentWidth}vw * 0.12)`
            }}
        >
            {Datedata}
            <br></br>
            
            - <RECORDTIMELINE
            date={props}
            /> -
        </div>
    )
}

export default DateCalculator;