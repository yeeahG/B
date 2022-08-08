import { useState } from "react";
import AppRouter from "components/Router";
import myFirebase from "myFirebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; B {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
