import AuthForm from 'components/Auth/AuthForm';
import { authService, firebaseInstance } from 'myFirebase';
import React from 'react'

const Auth = () => {

  const onSocialClick = async (event) => {
    console.log(event.target.name);

    const {target : {name}} = event;

    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  }

  return (
    <div>
      <AuthForm />

      <div>
        <button name="google" onClick={onSocialClick}>Google</button>
        <button name="github" onClick={onSocialClick}>Github</button>
      </div>
    </div>
  )
}

export default Auth