import React from 'react';
// import './Typewriter.css'; // Import your CSS file for styling
import TyperwriterTimer from './TyperwriterTimer';
const Typewriter = (props) => {
  // const [isTyperwriterFinished, setIsTyperwriterFinished] = useState(false);
//  console.log('here', props.func)
 const pullData = (data) => {
  console.log('App: funcccy', data);
  props.func(true)
};
  return (
    <>
    <div className="typewriter-container "><div className='d-flex justify-content-flex-start '>  <span className='arrow'>-{'>'}</span><span className='terminal-command'> FFF get Next 3 Weeks Top Players</span></div>
  
    </div>
    <div className='d-flex justify-content-center'>     <span className="typed-text  d-flex"><TyperwriterTimer fullText={props.fullText} func={pullData}/></span></div>
    </>
  );
};

export default Typewriter;
