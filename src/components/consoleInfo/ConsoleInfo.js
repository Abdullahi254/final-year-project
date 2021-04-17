import React, { useState, useEffect } from 'react'
import './ConsoleInfo.css'
import {PlayCircleFilledWhite,PauseCircleFilled, Payment,Eject,AddCircleOutline} from '@material-ui/icons'
function ConsoleInfo(props) {
    const [startHour, setStartHour] = useState(0)
    const [startMinute, setStartMinute] = useState(0)
    const [startSecond, setStartSecond] = useState(0)
    const [second, setSecond] = useState(0)
    const [minute, setMinute] = useState(0)
    const [start, setStart] = useState(false)
    useEffect(() => {
        if (start) {
            const id = setInterval(() => {
                if (second >= 59) {
                    setMinute(minute => minute += 1)
                    setSecond(second => second -= 59)
                }
                else {
                    setSecond(second => second += 1)
                }
            }, 1000)
            return () => clearInterval(id)
        }
    }, [start, second])

    function setStartTimeHandler() {
        setStart(true)
        let day = new Date()
        let hour = day.getHours()
        let minute = day.getMinutes()
        let second = day.getSeconds()
        if (minute < 10) {
            minute = "0" + minute
        }
        if (hour < 10) {
            hour = "0" + hour
        }
        if (second < 10) {
            second = "0" + second
        }
        setStartHour(hour)
        setStartMinute(minute)
        setStartSecond(second)
    }
    function stopClockHandler() {
        setStart(false)
        setStartHour('')
        setStartMinute('')
        setStartSecond('')
    }

    function setActiveHandler(){
        props.setActive(true)
    }

    function ejectHandler(){
        props.setActive(false)
    }

    return (
        <div className="ConsoleInfo">
            <input className="InfoInput" value={props.name} disabled />
            <input className="InfoInput" value={`${startHour}:${startMinute}:${startSecond}`} type="time" disabled />
            <input className="InfoInput Time" disabled value={`${0}:${minute}:${second}`} />
            <div className="Icons">
                {start ? <span className="Icon"><PauseCircleFilled onClick={stopClockHandler} fontSize="large" style={{display:props.showIcons?'inline-block':'none'}}/></span>: <span className="Icon"><PlayCircleFilledWhite onClick={setStartTimeHandler} fontSize="large" style={{display:props.showIcons?'inline-block':'none'}}/></span>}
                <span className="Icon" style={{display:props.showIcons?'inline-block':'none'}}><Payment fontSize="large"/></span>
                <span className="Icon" style={{display:props.showIcons?'inline-block':'none'}} onClick={ejectHandler}><Eject fontSize="large"/></span>
                <span className="Icon" onClick={setActiveHandler} style={{display:props.addIcon?'inline-block':'none'}}><AddCircleOutline fontSize="large"/></span>
            </div>
        </div>
    )
}

export default ConsoleInfo
