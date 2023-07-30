import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const IntervalForm = ({ intervals, changeIntervalList }) => {
  const [time, setTime] = useState('');
  const [label, setLabel] = useState('');
  const [unit, setUnit] = useState('seconds');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (time && label) {
      // Prеобразуем время в секунды, если выбраны "minutes"
      const timeInSeconds = unit === 'minutes' ? parseInt(time) * 60 : parseInt(time);
      const newInterval = { id: uuidv4(), time: timeInSeconds, label };
      changeIntervalList((s) => [...s, newInterval]);
      setTime('');
      setLabel('');
    }
  };

  const maxTime = unit === 'minutes' ? 1000 / 60 : 1000; // Maximum value based on the selected unit

  return (
    <div>
      <form onSubmit={handleSubmit} className='timer__form'>
        <div className='timer__form-time'>
          <h4 className='timer__form-time__title'>Time:</h4>
          <input
            className='timer__form-input'
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            max={maxTime} // Set the maximum value here
          />
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className='timer__form-input timer__form-select'>
            <option value="seconds">Seconds</option>
            <option value="minutes">Minutes</option>
          </select>
        </div>
        <div className='timer__form-time'>
          <h4 className='timer__form-time__title'>Label:</h4>
          <input
            type="text"
            className='timer__form-input'
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <button type="submit" className='timer__form-button'>Add Interval</button>
      </form>
    </div>
  );
};

export default IntervalForm;
