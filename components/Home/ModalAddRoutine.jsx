import React, { useEffect, useState } from 'react'

const ModalAddRoutine = ({ 
    addRoutineList, 
    close
 }) => {

    const [routine, setRoutine] = useState('')

    

    return (
        <div className='modal'>
                <div>ModalAddRoutine</div>
                <input type="text" className='timer__addroutine' value={routine} onChange={e => setRoutine(e.target.value)} />
                <button onClick={() => addRoutineList(routine)} className='modal__button-or'>Add Routine</button>
                <button onClick={close} className='timer__delete'>cancel</button>
        </div>

    )
}

export default ModalAddRoutine