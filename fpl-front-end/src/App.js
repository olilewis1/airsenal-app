
import './App.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import fff from './assets/FFF_logo.jpeg'
import './App.css';
import TypewriterAI from './typewriter/Typerwriter.js';
import TyperWriterOpt from './typewriter opt/Typerwriter.js'
function App() {
  // const textTo = ' Paired with the Alan Turing Institue, bringing a machine learning AI experience to FPL. Enabling users to: Predict the top scorers for the next 3 gameweeks Transfer and chip suggestions Recommendations for your starting 11 and subs. App incoming with all the data driven FPL you could ever need.'

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [fplId, setFplId] = useState('');
  const [predictionText, setPredictionText] = useState( {fullText: ['pre', 'hiii', 'nooo'], type: 'pre' })
  const [optimizationText, setOptimizationText] = useState({fullTextOpt: ['opt', 'optimization', 'why'], type: 'opt'})
  const [isTyperwriterFinished, setIsTyperwriterFinished] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState('')
  const [loginInvalid, setLoginInvalid] = useState('')
  const [passwordInvalid, setPasswordInvalid] = useState('')
  const loginHandler = (event) => {
    event.preventDefault();
  console.log('event', event.target )
// error handling server side
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(login);
  let isFplIdValid
  const isPasswordValid = password.length > 7 
  if(!isPasswordValid) { 
    setPasswordInvalid('is-invalid')
  }
  else { 
    setPasswordInvalid('')
  }
  if (/^\d+$/.test(fplId) && fplId.length === 7 ) { 
   isFplIdValid = true
  } 
  else { 
    isFplIdValid = false
  }
  if (!isEmailValid)  { 
    console.log('hiii', isEmailValid)
    if ( !isEmailValid) {      console.log(' email not valid')
    setEmailInvalid('is-invalid') }
    }
    
      if( isEmailValid) { 
        setEmailInvalid('')
        console.log('email fine')
      }
    
  if (!isFplIdValid) { 
  
      setLoginInvalid('is-invalid')
      console.log('Login Invalid')
    
  }
    if (isFplIdValid) { 
      setLoginInvalid('')
      console.log('password is fine')
    }
  
  const id  = "3705355"
    // Now you can access the login, password, and fplId values here
    if(isFplIdValid && isEmailValid && isPasswordValid) { 
      setLogin('')
      setPassword('')
      setFplId('')
      if (event.target.name === 'pre') { 
        axios.post('http://localhost:3000/return-predictions')
          .then((response) => {
            console.log(response.data);
            
            const dataRaw = response.data.output;
            const data = dataRaw.split('\n');
            setPredictionText(data);
            console.log('pred', predictionText);
      
            // Chain the second Axios request here
            return axios.post('http://localhost:3000/run-optimization', { fplId, password, login  });
          })
          .then((response) => {
            console.log('im here', response.data);
            const dataRaw = response.data.output;
            const data = dataRaw.split('\n');
            setOptimizationText(data);
            setLogin('')
            setPassword('')
            setFplId('')
          })
          .catch((error) => {
            console.error(error);
          });
      }
      
  
   if (event.target.name === 'opt') { 
    axios.post('http://localhost:3000/run-optimization', {id})
    .then((response) => {
      console.log(response.data);
      const dataRaw = response.data.output
      const data = dataRaw.split('\n')
      setOptimizationText(data)
    })
    .catch((error) => {
      console.error(error);
    });
   }
  
   if (event.target.name === 'run') { 
    axios.post('http://localhost:3000/run-script',{id} )
    .then((response) => {
      console.log(response.data);
      const dataRaw = response.data.output
      const data = dataRaw.split('\n')
      setOptimizationText(data)
    })
    .catch((error) => {
      console.error(error);
    });
   }
    }
    
  }

  const pullData = (data) => {
    console.log('App: funcccy', data);
    setIsTyperwriterFinished(data);
  };

 useEffect(() =>{ 
console.log(isTyperwriterFinished)

 }, [isTyperwriterFinished])
  return (
    
    <div className='App'> 

<div className='app-center text-center ' 
    >
 
      <div className='img_fff   d-flex justify-content-center flex-column align-items-center '> <div className='w-50 mt-3 icon'> <img src={fff} alt="fff"  className='img-fluid img-thumbnail'/></div> <div> <h1 className='text-center mt-3'>Fantasy Football Friend </h1></div>       <div> Data led, football first.</div> </div>
      <div className='d-flex justify-content-center mt-3'>
      <div className=' terminal '>
      <div className= 'd-flex justify-content-center align-items-center '>  <div className='small mt-3 w-100'> 
     
      <TypewriterAI   fullText={predictionText}func={pullData} type='pre'/>
      
      {isTyperwriterFinished ? <TyperWriterOpt  fullText={optimizationText} type='opt'/> : <div></div>}
      
      </div>
      </div> </div>
      {/* <NextThree {...playerDataState.playerData} /> */}
      </div>



      <div className="d-flex mt-3 justify-content-center align-items-center grey">
        <form className="form-sort">
          <div> 
          <div className="form-group">
            <input
              type="email"
              className={`form-control has-validation ${emailInvalid}`}
              id="exampleInputEmail1"
              aria-describedby="emailHelp inputGroupPrepend3 exampleInputEmail1"
              placeholder="Enter email"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
                  <div id="exampleInputEmail1" className="invalid-feedback formsort">
        Please choose a Valid Email.
      </div>

          </div>
          <div className="form-group">
            <input
              type="password"
              className={`form-control ${passwordInvalid}`}
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
                              <div id="exampleInputPassword1" className="invalid-feedback">
        Please choose a Valid Password.
      </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              className={`form-control ${loginInvalid}`}
              id="validationDefaultUsername"
              placeholder="FPL ID"
              value={fplId}
              onChange={(e) => setFplId(e.target.value)}
              required
            />
              <div id="validationDefaultUsername" className="invalid-feedback">
        Please choose a Valid FPL ID - Can be found on my Team page on FPL website.
      </div>
  
          </div>
          </div>
          <div> 
          <button
            type="submit"
            name='pre'
            className="btn btn-primary btn-fff mt-3"
            onClick={loginHandler}
          >
            Submit
          </button>
          </div>
        </form>
      </div>
    </div>


  {/* ); */}
{/* <button onClick={loginHandler} name='run'>Run Script</button>
<button onClick={loginHandler} name='opt'>Run Script</button> */}
    </div>
  );
}

export default App;