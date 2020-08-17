import React, { useState, useEffect } from 'react';

function Salarymeter(props) {
  var info = props.info;
  const [work_info, cal_work_info] = useState(0);

  useEffect(() => {
    fetch('/post', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        content_type: 'application/json',
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        cal_work_info(data);
      });
  }, [info]);

  useEffect(() => {
    fetch('/get')
      .then((res) => res.json())
      .then((data) => {
        cal_work_info(data);
      });
  });

  return (
    <div className="salarymeter-container">
      <p>Your current salary is {work_info}</p>
    </div>
  );
}

export default Salarymeter;
