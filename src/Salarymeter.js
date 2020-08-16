import React, { useState, useEffect } from 'react';

function Salarymeter(props) {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time')
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data);
      });
  }, []);

  return (
    <div className="salarymeter-container">
      <p>Your current salary is {currentTime}</p>
      <p>sal: {props.info[0]}</p>
      <p>cpf: {props.info[1]}</p>
      <p>sw: {props.info[2]}</p>
      <p>ew: {props.info[3]}</p>
      <p>sb: {props.info[4]}</p>
      <p>eb: {props.info[5]}</p>
    </div>
  );
}

export default Salarymeter;
