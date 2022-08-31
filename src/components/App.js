import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myFirebase";
import Header from "./Header";
import './App.css'

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

      }
      setInit(true);
    });
  }, [])
  
  const refreshUser = () => {
    //setUserObj(authService.currentUser);
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
    });
  }
  
  return (
    <>
      <div className="app__container">
        <Header />
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
