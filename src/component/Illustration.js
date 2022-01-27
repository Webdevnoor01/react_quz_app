import singupImg from '../assets/images/signup.svg'
import classes from '../styles/Illustration.module.css'


export default function Illustration(){
    return(
        <>
       <div className={classes.illustration}>
            <img src={singupImg} alt="Signup" />
          </div>
        </>
    )
}