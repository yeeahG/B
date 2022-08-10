import { authService, firebaseInstance } from 'myFirebase';
import React, { useState } from 'react'

const Auth = () => {
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

  const onSocialClick = async (event) => {
    console.log(event.target.name);

    const {target : {name}} = event;

    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  }

  return (
    <div>
      {error}
      <form onSubmit={onSubmit} >
        <input 
          required 
          name="email"
          type="text" 
          placeholder="Email" 
          value={email} 
          onChange={onChange}
        />
        <input 
          required 
          name="password"
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log in"} />
      </form>

      <span onClick={toggleAccount}>
        {newAccount ? "Login" : "Create Account"}
      </span>

      <div>
        <button name="google" onClick={onSocialClick}>Google</button>
        <button name="github" onClick={onSocialClick}>Github</button>
      </div>
    </div>
  )
}

export default Auth