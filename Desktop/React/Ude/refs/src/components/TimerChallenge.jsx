import { useEffect, useRef, useState } from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ targetTime, title }) {
   const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

   const timer = useRef();
   const dialog = useRef();

   useEffect(() => {
      return () => {
         clearInterval(timer.current);
      };
   }, []);

   function handleStart() {
      if (timer.current) {
         return;
      }

      setTimeRemaining(targetTime * 1000 - 1000);

      timer.current = setInterval(() => {
         setTimeRemaining((prevTimeRemaining) => {
            if (prevTimeRemaining <= 1000) {
               clearInterval(timer.current);
               timer.current = null;
               dialog.current.open(0);
               return 0;
            }

            return prevTimeRemaining - 1000;
         });
      }, 1000);
   }

   function handleStop() {
      clearInterval(timer.current);
      timer.current = null;
      dialog.current.open(timeRemaining + 1000);
      setTimeRemaining(targetTime * 1000);
   }

   const timerActive =
      timeRemaining > 0 && timeRemaining < targetTime * 1000;

   return (
      <>
         <ResultModal ref={dialog} targetTime={targetTime} />
         <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
               {targetTime} second{targetTime > 1 ? "s" : ""}
            </p>
            <p>
               <button onClick={timerActive ? handleStop : handleStart}>
                  {timerActive ? "Stop" : "Start"} Challenge
               </button>
            </p>
            <p className={timerActive ? "active" : undefined}>
               {timerActive ? "Time is running..." : "Timer is inactive"}
            </p>
         </section>
      </>
   );
}
