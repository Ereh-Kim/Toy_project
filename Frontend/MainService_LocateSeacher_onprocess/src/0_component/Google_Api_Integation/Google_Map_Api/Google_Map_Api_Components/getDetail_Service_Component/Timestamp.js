import React, { useEffect, useRef, useState } from "react";

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

import Arrow from '../../../../../1_image_or_icon/Arrow_Button_UpAhead.png'


export const TIMESTAMP = (props) => {

    const [timestamp, updateSTAMP] = useState()
    const ArrowRef = useRef()
    const RecordLine = useRef()

    useEffect(()=>{
        if(props === undefined){
            return
        }

        let result;

        switch(typeof props.timestamp){
            case('number'):
            result = Convert_TimeLine_Number(props.timestamp);       
            break;

            case('string'):
            result = Convert_TimeLine_String(props.timestamp)
            break;

        }


        updateSTAMP(result)
    },[])

    const Convert_TimeLine_String = (input) => {

        dayjs.extend(relativeTime)

        const recordedTime = dayjs(input)

        const timeDifference = recordedTime.fromNow()
        const recordedTime_String = input.slice(0,10).replaceAll('-','.')

        return <React.Fragment>

            <div
            style={{
                height: 'fit-content',
                width: 'fit-content',
                justifySelf: 'start',
                fontWeight: 'bold',
                fontSize: '15px'
            }}>
                <span
                style={{
                    backgroundColor: 'white',
                    padding: '6px 10px',
                    borderRadius: '10px'
                }}
                >{timeDifference}</span>

                <span
                style={{
                    position: 'relative',
                    top: '7px',
                    left: '10px'
                }}
                >
                    <img
                    src={Arrow}
                    ref={ArrowRef}
                    style={{
                        width: '20px',
                        transform: 'rotate(0deg)'
                    }}
                    onClick={(e)=>{
                        const ArrowDirection = ArrowRef.current.style
                        const Record_STATUS = RecordLine.current.style
                        
                        switch(ArrowDirection.transform){
                            case('rotate(0deg)'):
                            ArrowDirection.transform = 'rotate(180deg)'
                            Record_STATUS.display = 'block'
                            break;

                            case('rotate(180deg)'):
                            ArrowDirection.transform = 'rotate(0deg)'
                            Record_STATUS.display = 'none'
                            break;
                        }

                    }}

                    ></img>
                </span>
                
            </div>
            
            <div
            style={{
                height: 'fit-content',
                width: 'fit-content',
                justifySelf: 'center',
                fontWeight: 'bold',
                fontSize: '15px',
                lineHeight: '25px',
                textAlign: 'center',
                marginTop: '8px',
                display: 'none'
            }}
            ref={RecordLine}
            >

                <span
                style={{
                    fontSize: '12.5px',
                    fontWeight: 'bold',
                    padding: '2px 10px',
                    borderRadius: '15px',
                    backgroundColor: 'white'
                }}
                >
                Recorded At
                </span>
                <br></br>
                <span
                style={{
                    borderBottom: 'white solid 5px',
                }}
                >- {recordedTime_String} -</span>
            </div>

        </React.Fragment>

    }

    const Convert_TimeLine_Number = (input) => {
        
        dayjs.extend(relativeTime);

        const recordedTime = dayjs.unix(input);

        const timeDifference = recordedTime.fromNow();

        const year = recordedTime.year();
        const month = recordedTime.month() + 1;
        const day = recordedTime.date();

        console.log(`시간 차이: ${timeDifference}`);
        console.log(`기록된 날짜: ${year}년 ${month}월 ${day}일`);

        return <React.Fragment>

            <div
            style={{
                height: 'fit-content',
                width: 'fit-content',
                justifySelf: 'start',
                fontWeight: 'bold',
                fontSize: '15px'
            }}>
                <span
                style={{
                    backgroundColor: 'white',
                    padding: '6px 10px',
                    borderRadius: '10px'
                }}
                >{timeDifference}</span>

                <span
                style={{
                    position: 'relative',
                    top: '7px',
                    left: '10px'
                }}
                >
                    <img
                    src={Arrow}
                    ref={ArrowRef}
                    style={{
                        width: '20px',
                        transform: 'rotate(0deg)'
                    }}
                    onClick={(e)=>{
                        const ArrowDirection = ArrowRef.current.style
                        const Record_STATUS = RecordLine.current.style
                        
                        switch(ArrowDirection.transform){
                            case('rotate(0deg)'):
                            ArrowDirection.transform = 'rotate(180deg)'
                            Record_STATUS.display = 'block'
                            break;

                            case('rotate(180deg)'):
                            ArrowDirection.transform = 'rotate(0deg)'
                            Record_STATUS.display = 'none'
                            break;
                        }

                    }}

                    ></img>
                </span>
                
            </div>
            
            <div
            style={{
                height: 'fit-content',
                width: 'fit-content',
                justifySelf: 'center',
                fontWeight: 'bold',
                fontSize: '15px',
                lineHeight: '25px',
                textAlign: 'center',
                marginTop: '8px',
                display: 'none'
            }}
            ref={RecordLine}
            >

                <span
                style={{
                    fontSize: '12.5px',
                    fontWeight: 'bold',
                    padding: '2px 10px',
                    borderRadius: '15px',
                    backgroundColor: 'white'
                }}
                >
                Recorded At
                </span>
                <br></br>
                <span
                style={{
                    borderBottom: 'white solid 5px',
                }}
                >- {year}.{month}.{day} -</span>
            </div>

        </React.Fragment>
    }

    return timestamp

}

export default TIMESTAMP;