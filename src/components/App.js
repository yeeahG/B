import { useEffect, useState } from "react";
import AppRouter from "./AppRouter";
import { authService } from "../myFirebase";
import './App.css'
import Header from "./Header";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged( async (user) => {
      if(user) {
        if (user.displayName === null) {
          await user.updateProfile({
            displayName: "B",
          });
        }
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, [])
  
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
    });
  }
  
  return (
    <>
      <div className="app__container">

        {init ? 
        <AppRouter 
          isLoggedIn={Boolean(userObj)} 
          userObj={userObj} 
          refreshUser={refreshUser}
        /> 
        : 
        "Loading..." 
        }
      </div>
      <footer>&copy; B {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
