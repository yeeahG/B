import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myFirebase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    //authService.onAuthStateChanged( (user) => {
      authService.onAuthStateChanged( async (user) => {
      if(user) {
        if (user.displayName === null) {
          await user.updateProfile({
            displayName: "B",
          });
        }
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
