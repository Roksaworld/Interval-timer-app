import React, { useState, useEffect } from "react";
import CircleLoader from './Circle'

const ModalTimer = ({ intervals, close }) => {
    const [list, setList] = useState(intervals);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let intervalId = null;

        const updateInterval = () => {
            setList((prevList) =>
                prevList.map((interval, index) =>
                    index === currentIndex ? { ...interval, time: interval.time - 1 } : interval
                )
            );
        };

        if (!isPaused) {
            intervalId = setInterval(() => {
                updateInterval();
            }, 1000);
        }

        if (list[currentIndex]?.time <= 0) {
            clearInterval(intervalId);
            if (currentIndex < list.length) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [currentIndex, list, isPaused]);

    useEffect(() => {
        if (currentIndex >= list.length) {
            close();
        } else if (list[currentIndex]?.time === 0) {
            // Показать уведомление, если время таймера достигло нуля
            playSound();
            // Запустить вибрацию, если поддерживается
            vibrateDevice();
        }
    }, [currentIndex, list, close, list[currentIndex]?.time]);

    const playSound = () => {
        // Создаем элемент audio
        const audioElement = new Audio('/noti.mp3'); // Замените "/path/to/sound.mp3" на путь к вашему аудиофайлу
        audioElement.play();
    };

    const vibrateDevice = () => {
        // Проверяем, поддерживается ли API вибрации в браузере
        if ("vibrate" in navigator) {
            navigator.vibrate(1000); // Вибрация длится 1 секунду
        }
    };

    const handlePause = () => {
        setIsPaused(true);
    };

    const handleResume = () => {
        setIsPaused(false);
    };

    return (
        <div className='modal'>
            <h4>{list[currentIndex]?.label}</h4>
            <CircleLoader time={intervals[currentIndex]?.time} tick={list[currentIndex]?.time } isPaused={isPaused}/>
            {/* <h3 className={isPaused ? "modal__color1" : "modal__color2"}>{list[currentIndex]?.time}</h3> */}
            {isPaused ? (
                <button onClick={handleResume} className='modal__button-or'>Resume</button>
            ) : (
                <button onClick={handlePause} className='modal__button-or'>Pause</button>
            )}
            <button onClick={close} className='timer__delete'>
                Cancel
            </button>
        </div>
    );
};

export default ModalTimer;
