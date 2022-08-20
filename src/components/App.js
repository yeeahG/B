import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged( (user) => {
      if(user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  })

  
  return (
    <>
      {init ? 
      <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> 
      : 
      "Loading..." 
      }
      <footer>&copy; B {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
