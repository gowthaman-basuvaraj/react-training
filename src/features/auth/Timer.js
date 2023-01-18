import React from 'react';
import { useState, useEffect } from 'react';

//todo: a timer to logout user on idle for x seconds
const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  const deadline = "December, 31, 2022";

  const getTime = () => {

    setSeconds(0);
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer">
    </div>
  );
};

export default Timer;