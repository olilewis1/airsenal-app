import { useEffect, useState } from 'react';
import TyperwriterTimer from './TyperwriterTimer';
// import TypewriterEffect from 'typewriter-effect/dist/core';
const Typewriter = (props) => {
  const [oGText, setOGText] = useState('');
  const originalText = 'FFF get Transfers && Starting 11';

  useEffect(() => {
    const typeText = async () => {
      for (let i = 0; i <= originalText.length; i++) {
        setOGText(originalText.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 50)); // Adjust the delay as needed
      }
    };

    typeText();
  }, []);

  return (
    <>
    <div className="typewriter-container overflow-auto">
      <div className='d-flex w-100 justify-content-flex-start'>
        <span className='arrow'>-{'>'}</span>
        <span id="typewriter" className='terminal-command'>
          {oGText}
        </span>
      </div>
    
    </div>
    <div className='d-flex justify-content-center'> 
    <span className="typed-text  d-flex">
        <TyperwriterTimer fullText={props.fullText} />
      </span>
    </div>

    </>
  );
};

export default Typewriter;
