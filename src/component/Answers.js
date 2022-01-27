import { Fragment } from "react";
import classes from "../styles/Answers.module.css";
import Checkbox from "./CheckBox";

export default function Answers({ options = [], handleChange, input }) {
  return (
    <div className={classes.answers}>
      {options.map((option, index) => (
        <Fragment key={index}>
          {input ? (
            <Checkbox
              key={index}
              type='checkbox'
              className={classes.answer}
              value={index}
              checked={option.checked}
              onChange={(e) => handleChange(e, index)}
            >
              {option.title}
            </Checkbox>
          ) : (
            <Checkbox
              key={index}
              className={`${classes.answer} ${
                option.correct
                  ? classes.correct
                  : option.checked
                  ? classes.wrong
                  : null
              } `}
              type='checkbox'
              defaultChecked={option.checked}
              disabled
            >
              {option.title}
            </Checkbox>
          )}
        </Fragment>
      ))}
    </div>
  );
}
