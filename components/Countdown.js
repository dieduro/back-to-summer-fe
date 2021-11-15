import { useEffect } from "react";
import ProgressRing from "./ProgressRing"
import { useTimer } from 'react-timer-hook';



const Countdown = ({ time, onFinish, onTimerStop, shouldRun, ...props}) => {

    const expiryTimestamp = Date.now() + time * 1000
    const {
        seconds,
        isRunning,
        start,
        pause,
      } = useTimer({ expiryTimestamp, onExpire: () => onFinish(seconds) });
    
    const radius = 50
    
    useEffect(() => {
        if (shouldRun) {
            start()
        } else if (!shouldRun && isRunning) {
            pause()
            let timeUsed = time - seconds
            onTimerStop(timeUsed)
        }
    }, [shouldRun])

    return (
        <>
        <div className="absolute h-[100px] w-[100px] z-10 flex flex-col justify-center content-center">
            <h3 className="text-white text-4xl text-center">
                {seconds}
            </h3>
            </div>
            <div className="flex absolute w-[100px] h-[100px]">
                    <ProgressRing
                        radius={radius}
                        stroke={6}
                        progress={0}
                    />
            </div>
        </>
    )
}
  
export default Countdown
  