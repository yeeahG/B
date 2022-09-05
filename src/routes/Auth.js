import AuthForm from 'components/Auth/AuthForm';
import Header from 'components/Header';
import { authService, firebaseInstance } from 'myFirebase';
import React from 'react'
import '../components/Auth/Auth.css'

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
    <div className='authHome__container'>
      <div className='auth__header'><Header /></div>
      <AuthForm />

      <div className='auth__btn'>
        <button className='authInput__btn' name="google" onClick={onSocialClick}>Google</button>
        <button className='authInput__btn' name="github" onClick={onSocialClick}>Github</button>
      </div>
    </div>
  )
}

export default Auth