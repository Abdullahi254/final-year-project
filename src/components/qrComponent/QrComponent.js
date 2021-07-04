import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import BackDrop from '../backDrop/BackDrop'
import './QrComponent.css'
import { Close } from '@material-ui/icons'
import qrcode from 'qrcode'

function QrComponent(props) {
  const [url, setUrl] = useState('')
  const contentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => contentRef.current
  })
  useEffect(() => {
    qrcode.toDataURL(`http://192.168.1.9:3000/payment/console/${props.id}/${props.hour}.${props.minutes}/${props.price}`,
      {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        width:500,
      }
    )
      .then(url => {
        setUrl(url)
      })
      .catch(er => {
        console.log(er)
      })
  }, [props.hour, props.minutes, props.price, props.id])
  return (
    <>
      <BackDrop show={props.show} clicked={props.close} />
      <div className="Qr" style={{ display: props.show ? 'flex' : 'none' }}>
        <span className="CloseIcon" onClick={props.close}>
          <Close fontSize="large" />
        </span>
          <div ref={contentRef} style={{width:'100%', height:'100%'}}>
            <img src={url} alt="qrcode" className="QRImg"/>
            <i className="Message">scan and pay as soon as you have finished gaming.</i>
          </div>
        <button onClick={handlePrint} className="Print">Print</button>
      </div>
    </>
  )
}

export default QrComponent
