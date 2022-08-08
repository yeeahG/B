import React, { useState } from 'react'

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event) => {
    const {target: {name, value}} = event;

    if(name === "email") {
      setEmail(value);
    } else if(name === "password") {
      setPassword(value);
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div>
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
        <input type="submit" value="Log in" />
      </form>
      <div>
        <button>Continue with GOOGLE</button>
      </div>
    </div>
  )
}

export default Auth