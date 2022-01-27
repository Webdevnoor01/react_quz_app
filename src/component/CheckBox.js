export default function CheckBox({children, className, ...rest}){
    return (
        <label className={className}>
        <input {...rest}/>
        <span> {children} </span>
      </label>
    )
}