import classes from '../styles/TextInput.module.css';

export default function TextInput({children, ...rest}) {
  return (
    <>
      <div className={classes.textInput}>
        <input {...rest} />
        <span className="material-icons-outlined">{children}</span>
      </div>
    </>
  );
}
