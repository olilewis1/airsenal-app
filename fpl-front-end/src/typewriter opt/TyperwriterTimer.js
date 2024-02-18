import React, { useEffect, useState } from 'react';

const TyperwriterTimer = (props) => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(2000);
  const [loadingText, setLoadingText] = useState('');
  const textToLoad = 'Loading ...';

  useEffect(() => {
    const initialIndex = props.fullText.length < 200 ? 0 : 2000;
    setCurrentIndex(initialIndex);
  }, [props.fullText.length]); // Empty dependency array to run only once when the component mounts
  
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
  
    const interval = setInterval(() => {
      if (currentIndex < props.fullText.length) {
        if (
          props.fullText[currentIndex] === '====================================' ||
          props.fullText[currentIndex] === '==================================================' ||
          props.fullText[currentIndex] === '===================================='
        ) {
          console.log('done');
          setText(props.fullText.slice(currentIndex, props.fullText.length));
          clearInterval(interval);
        } else {
          setText(props.fullText.slice(currentIndex, currentIndex + 10));
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
      } else {
        clearInterval(interval); // Stop the typing animation
        console.log('STOP');
      }
    }, randomNumber); // Adjust typing speed as needed
  
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [currentIndex, props.fullText]);
  

  useEffect(() => {
    if (text === '') {
      const typeText = () => {
        let i = 0;
        const interval = setInterval(() => {
          setLoadingText(textToLoad.slice(0, i));
          i = (i + 1) % (textToLoad.length + 1); // Reset index when it reaches the end
        }, 250); // Adjust the delay as needed
  
        return () => clearInterval(interval); // Clean up the interval on unmount
      };
      typeText();
    }
  }, [text, textToLoad]);

  return ( 
    <div className='overflow-auto'>
      <span className="typed-text">
        {Array.isArray(text) ? (
          text.map((text, index) => <div key={index}>{text}</div>)
        ) : (
          <div>{loadingText}</div>
        )}
      </span>
    </div>
  );
};

export default TyperwriterTimer;
