import React, { useState } from 'react'

const IntervalList = ({ intervals, changeIntervalList }) => {

    const [edit, setEdit] = useState(false)

    const moveInterval = (fromIndex, toIndex) => {
        if (fromIndex < 0 || fromIndex >= intervals.length || toIndex < 0 || toIndex >= intervals.length) {
            return;
        }
        const newIntervals = [...intervals];
        const [movedInterval] = newIntervals.splice(fromIndex, 1);
        newIntervals.splice(toIndex, 0, movedInterval);
        changeIntervalList(newIntervals);
    };

    const deleteInterval = (id) => {
        changeIntervalList(s => s.filter(
            interval => interval.id !== id
        ))
    }

    const changeIntervalItem = (value, type, id) => {
        changeIntervalList(
            intervals.map((item) => {
                if (item.id === id) {
                    return type === "time" ? { ...item, time: parseInt(value) } : { ...item, label: value };
                }
                return item;
            })
        );
    };

    return (
        <>
            {intervals.map((interval, index) => (
                <div key={index} className='timer__list-item'>
                    <div className='timer__list-item__input'>
                        <input type="number"
                            value={interval.time}
                            onChange={(e) => changeIntervalItem(e.target.value, 'time', interval.id)}
                            readOnly={!edit} /> 
                        <input type="text" value={interval.label}
                            onChange={(e) => changeIntervalItem(e.target.value, 'label', interval.id)}
                            readOnly={!edit} />
                    </div>

                    <div className='timer__list-item-button'>

                        <button onClick={() => moveInterval(index, index - 1)} disabled={index === 0} className='timer__swap'>
                              Up
                        </button>
                        <button onClick={() => moveInterval(index, index + 1)} disabled={index === intervals.length - 1} className='timer__swap'>
                          Down
                        </button>
                        <button onClick={() => deleteInterval(interval.id)} className='timer__delete'> Delete </button>
                    </div>

                </div>
            ))}
            {
                intervals.length
                    ? <button onClick={() => setEdit(s => !s)} className='timer__form-button'>
                        {
                            edit ? "Save Interval" : "Edit Interval"
                        }
                    </button>
                    : <></>
            }

        </>
    )
}

export default IntervalList