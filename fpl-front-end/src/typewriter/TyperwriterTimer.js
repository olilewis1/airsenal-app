// TyperwriterTimer.js
import React, { useEffect, useState } from 'react';
import TypewriterEffect from 'typewriter-effect/dist/core';
const TyperwriterTimer = ({func, fullText}) => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(4900);
  const [isFinished, setIsFinished] = useState(false);
 


  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        if (
          fullText[currentIndex] === '====================================' ||
          fullText[currentIndex] === '=================================================='
        ) {
          setText(fullText.slice(currentIndex, fullText.length));
          clearInterval(interval);
          setIsFinished(true);
          console.log('TyperwriterTimer: Finished typing');
        } else {
          setText(fullText.slice(currentIndex, currentIndex + 10));
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
      } else {
        clearInterval(interval);
      }
    }, randomNumber);

    return () => clearInterval(interval);
  }, [currentIndex, fullText]);

  useEffect(() => {
    console.log('TyperwriterTimer: isFinished changed to', isFinished);
    if (isFinished && typeof func === 'function') {
     func(true);
    }
  }, [isFinished, func]);

  useEffect(() => {
    new TypewriterEffect('#typewriter', {
      strings: [' Paired with the Alan Turing Institute, bringing a machine learning AI experience to FPL. Enabling users to: Predict the top scorers for the next 3 gameweeks Transfer and chip suggestions Recommendations for your starting 11 and subs. App incoming with all the data driven FPL you could ever need. Enter your details below. Let us do the rest.'],
      autoStart: true,
      loop: true,
    });
  }, []);

  return (
    <div className='overflow-auto'>
      <span className="typed-text ">
        {Array.isArray(text) ? (
          text.map((t, index) => <div key={index}>{t}</div>)
        ) : (
          <div className='d-flex justify-content-center'> 
          <div id="typewriter" className='w-75 typewriter-effect'>{text}</div>
          </div>
        )}
      </span>
      
    </div>
  );
};

export default TyperwriterTimer;
