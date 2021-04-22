import React,{useEffect,useState} from 'react'
import BackDrop from '../backDrop/BackDrop'
import './QrComponent.css'
import {Close} from '@material-ui/icons'
import qrcode from 'qrcode'

function QrComponent(props) {
    const [url,setUrl] = useState('')
    useEffect(()=>{
      qrcode.toDataURL([`${props.hour}:${props.minutes}:${props.seconds}`,props.price],
      {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: {
          dark:"#010599FF",
          light:"#FFBF60FF"
        }
      }
      )
        .then(url=>{
          console.log(url)
          setUrl(url)
        })
        .catch(er=>{
          console.log(er)
        })
    },[props.hour,props.minutes,props.seconds,props.price])
    return (
        <>
          <BackDrop show={props.show} clicked={props.close}/>
          <div className="Qr" style={{display:props.show?'flex':'none'}}>
              <span className="CloseIcon" onClick={props.close}>
                <Close fontSize="large"/>
              </span>
              <img src={url} alt="qrcode"/>
          </div>
        </>
    )
}

export default QrComponent
