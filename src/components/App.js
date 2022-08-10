import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged( (user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  })

  
  return (
    <>
      {init ? 
      <AppRouter isLoggedIn={isLoggedIn} /> 
      : 
      "Loading..." 
      }
      <footer>&copy; B {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
