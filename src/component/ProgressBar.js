import { useRef, useState } from "react";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";
export default function ProgressBar({ next, prev, progress, submit }) {
  const [tooltip, setTooltip] = useState(false);
  const tooltipRef = useRef();
  function toogleToolTip() {
    if (tooltip) {
      setTooltip(false);
      tooltipRef.current.style.display = "none";
    } else {
      setTooltip(true);
      tooltipRef.current.style.left = `calc(${progress}% -65px)`;
      console.log((tooltipRef.current.style.left = `calc(${progress}% - 65px)`));
      console.log((tooltipRef.current.style.display = "block"));
      tooltipRef.current.style.display = "block";
      console.log("mouse over");
    }
  }
  return (
    <>
      <div className={classes.progressBar}>
        <Button className={classes.backButton} onClick={prev}>
          <span className="material-icons-outlined"> arrow_back </span>
        </Button>

        <div className={classes.rangeArea}>
          <div className={classes.tooltip} ref={tooltipRef}>
            {progress}% Cimplete!
          </div>
          <div className={classes.rangeBody}>
            <div
              className={classes.progress}
              style={{ width: `${progress}%` }}
              onMouseOver={toogleToolTip}
              onMouseOut={toogleToolTip}
            ></div>
          </div>
        </div>

        <Button
          className={classes.next}
          onClick={progress === 100 ? submit : next}
        >
          <span>Next Question</span>
          <span className="material-icons-outlined"> arrow_forward </span>
        </Button>
      </div>
    </>
  );
}
