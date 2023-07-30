import React, { useState } from 'react'
import IntervalForm from './IntervalForm'
import IntervalList from './IntervalList'
import ModalAddRoutine from './ModalAddRoutine'
import ModalTimer from './ModalTimer'

const Home = ({ listRoutine, intervals,changeListRoutine,setIntervals}) => {
   
    const [openAddRoutine, setOpenAddRoutine] = useState(false)
    const [openTimer, setOpenAddTimer] = useState(false)

    const addRoutineList = (routine) => {
        changeListRoutine(
            [...listRoutine, {
                routine: routine,
                payload: intervals
            }]
        )
        setIntervals([])
        setOpenAddRoutine(false)
    }

    return (
        <div className='home'>
            {intervals.length > 0 ?
                <div className='timer__home-buttons'>
                    <button onClick={() => setOpenAddRoutine(true)} className='timer__form-button'>Add To RoutineList</button>
                    <button onClick={() => setOpenAddTimer(true)} className='timer__form-button'>Start Routine</button>
                </div>
                : <></>}

            <IntervalForm intervals={intervals} changeIntervalList={setIntervals} />
            <IntervalList intervals={intervals} changeIntervalList={setIntervals} />
            {
                openAddRoutine ? <ModalAddRoutine
                    addRoutineList={addRoutineList}
                    close={() => setOpenAddRoutine(false)}
                />
                    : <></>
            }
            {
                openTimer ?
                    <ModalTimer intervals={intervals} close={() => setOpenAddTimer(false)} />
                    : <></>
            }
        </div>


    )
}

export default Home