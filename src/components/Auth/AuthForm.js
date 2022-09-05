import { authService } from 'myFirebase';
import React, { useState } from 'react'
import './Auth.css'

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
    
        if(name === "email") {
          setEmail(value);
        } else if(name === "password") {
          setPassword(value);
        }
    }
    
    const onSubmit = async (event) => {
        event.preventDefault();
    
        try {
          let data;
          if (newAccount) {
            //create account
            data = await authService.createUserWithEmailAndPassword(email, password);
          } else {
            //log in
            data = await authService.signInWithEmailAndPassword(email, password);
          }
          console.log(data);
        } catch(error) {
          setError(error.message);
        }
    };
    
    const toggleAccount = () => {
        setNewAccount((prev) => !prev)
    }

  return (
    <div>
        {error}
        <form onSubmit={onSubmit} className='authForm__container' >
            <label className='input__border'>
                <input 
                    required 
                    name="email"
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    onChange={onChange}
                    className='authInput'
                />
            </label>
            <label className='input__border'>
                <input 
                    required 
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={onChange}
                    className='authInput'
                />
            </label>
            <input 
                type="submit" 
                className='authInput__btn'
                value={newAccount ? "Create Account" : "Log in"} 
            />
        </form>
        
        <span onClick={toggleAccount} className='account__btn'>
            {newAccount ? "Already have an Account?" : "Create Account"}
        </span>

    </div>
  )
}

export default AuthForm