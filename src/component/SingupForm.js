// External Imports
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Internal Imports
import Button from "./Button";
import CheckBox from "./CheckBox";
import Form from './Form';
import TextInput from "./TextInput";

export default function SingupForm(){
  const navigate =useNavigate()
  const {singup} = useAuth()

  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [conformPassword, setConformPassword] = useState('')
  const [agree, setAgree] = useState('')
  const [loading, setLoading] = useState("")
  const [error, setError] = useState('')

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(password !== conformPassword){
      return setError("Password Dosn't match")
    }

    try {
      setLoading(true)
      setError('')
      await singup(email, password, username)
      navigate('/')
      
    } catch (error) {
      setLoading(false)
      setError(error.message)
      
    }


  }
  

  
    return(
        <Form style={{height:'500px'}} onSubmit={handleSubmit}>
          <TextInput type="text" required placeholder="Enter name" value={username} onChange={(e)=>setUserName(e.target.value)} >
            person
          </TextInput>

          <TextInput type="email" required placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}>
            alternate_email
          </TextInput>

          <TextInput type="password" required placeholder="Enter password" value={password} onChange={(e) =>setPassword(e.target.value)}>
            lock
          </TextInput>

          <TextInput type="password" required placeholder="Conform password" value={conformPassword} onChange ={(e) => setConformPassword(e.target.value)}>
            lock_clock
          </TextInput>

          <CheckBox type="checkbox" required value={agree} onChange={(e) => setAgree(e.target.value)}>
            I agree to the Terms &amp; Conditions
          </CheckBox>

          <Button disabled={loading}  >
          <span>Submit now</span>
          </Button>
          {error && <p className='error'>{error}</p> }

          <div className="info">
              Already have an account? <Link to='/login'>Login</Link> instead.
            </div>
        </Form>
    )
}