import React,{useState,useRef,useEffect} from 'react'
import './App.css'
import axios from 'axios'
import moneysvg from './saco.svg'
import Swal from 'sweetalert2'

function App() {
  

  const ref = useRef(null)

  const baseURI = 'http://localhost:3008/'
 

  const [INR, handleINR] = useState('')
  const [money,handleMoney] = useState('euro')
  // eslint-disable-next-line 
  const [converted,handleConvert] = useState(0)

  const changeINR = (e) => {
    if( isNaN (e.target.value )) {
      handleINR('')
      Swal.fire('Money can only be a number :-(')
    }
    else {
    handleINR(e.target.value)
    }
  }


  const handleChange = (e) => {
    handleMoney(e.target.value)
  }

  const getCovertedValue = async() => {
    console.log("axios")
    const data = {"INR" : INR, "money" : money}
    const response = await axios.post(baseURI, data)
    let temp = (response.data.value)
    handleConvert(temp)
  }


  useEffect (() => {
    ref.current.focus()
  },[])


  return (
    <div className = "main"> 
      <div>
       <h1> Welcome to Money Convertor </h1>
       <img src = {moneysvg} height = {75}alt = "money"/>
       <div>
       <label> Enter Value </label>
       <input type = "text"  className = "input" placeholder = "Enter Indian Money to be converted" ref={ref}
       value = {INR} onChange = {changeINR}/>
       </div>
       <div>
         <label> Select Currency </label>
       <select 
        value={money} 
        onChange={handleChange} 
      >
       <option value="Euro" defaultValue className = "drop-down">Euro</option>
        <option value="Dollar">Dollar</option>
        <option value="Pound">Pound</option>
      </select>
      </div> 
      <div ><button type = "submit" className = "but"onClick = {getCovertedValue}> Submit </button>
     </div>
      <div>
        <label htmlFor = "answer" className = "answer"> <h1 className = "answer">{`Answer in ${money}`} </h1></label>
        <h1>{converted} </h1>
       </div>
         </div>
    </div>
  )
}

export default App
