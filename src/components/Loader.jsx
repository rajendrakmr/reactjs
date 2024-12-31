
import React ,{memo}from 'react';
import '../assets/css/Loader.css';  
const Loader = memo(({text="Please wait..."}) => {
  return (
    <div className="loader-overlay">
      <div className="loader"> </div> 
      <p>{text}</p>
    </div>
  );
});
 
export default Loader;
