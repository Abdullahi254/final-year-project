import React,{useState,useEffect} from 'react'
import QrReader from 'react-qr-reader'
import io from 'socket.io-client'
const socket = io("http://localhost:4000");
function Scanner() {
    const [results,setResults] = useState('')
    useEffect(()=>{
        socket.on('metaData',(data)=>{
            console.log(data)
        })
    })
    function handleScan(data){
        if(data)setResults(data)
    }
    function handleError(error){
        console.log(error)
    }
    return (
        <div>
            {/* <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '30rem',margin:'auto'}}
            /> */}
            <p>{results}</p>
        </div>
    )
}

export default Scanner
