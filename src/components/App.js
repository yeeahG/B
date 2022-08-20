import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged( (user) => {
      if(user) {
        setUserObj(user);
      }
      setInit(true);
    });
  })

  
  return (
    <>
      {init ? 
      <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> 
      : 
      "Loading..." 
      }
      <footer>&copy; B {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
