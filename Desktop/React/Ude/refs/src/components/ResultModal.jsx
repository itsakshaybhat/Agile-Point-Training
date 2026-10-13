import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal({ targetTime }, ref) {
   const dialog = useRef();
   const result = useRef();
   const remainingTime = useRef();

   useImperativeHandle(ref, () => ({
      open(timeLeft) {
         result.current.textContent = timeLeft > 0 ? "You Win" : "You Lost";
         remainingTime.current.textContent = `${(timeLeft / 1000).toFixed(2)} seconds`;
         dialog.current.showModal();
      },
   }));

   return (
      <dialog ref={dialog} className="result-modal">
         <h2 ref={result}>You Lost</h2>
         <p>
            The target time was <strong>{targetTime}</strong> seconds
         </p>
         <p>
            You stopped the timer with <strong ref={remainingTime}>0.00 seconds</strong>
         </p>
         <form method="dialog">
            <button>Close</button>
         </form>
      </dialog>
   );
});

export default ResultModal;


