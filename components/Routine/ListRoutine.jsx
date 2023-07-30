import React from 'react'
import { useNavigate } from 'react-router-dom';

const ListRoutine = ({ listRoutine, currentInterval }) => {

  console.log("listRoutine--->", listRoutine);
  const navigate = useNavigate()

  const choiseInterval = ({payload}) => {
    currentInterval(payload)
    navigate('/')
  }
  return (
    <div className='routine'>
      <div>
        {
          listRoutine?.map(item => <div className='routine__list'>
            <h6 className='routine__title'>{item.routine}</h6>
            <ul>
              {
                item?.payload.map(interval => 
                  <li className='routine__item' 
                  >{`- ${interval.time} seconds ${interval.label}`}</li>
                )
              }
            </ul>
            <button onClick={()=>choiseInterval(item)} className='modal__button-or'>Choise Timer</button>
          </div>)
        }
      </div>

    </div>
  )
}

export default ListRoutine