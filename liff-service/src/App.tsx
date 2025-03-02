import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";

// import Inform from "./pages/Inform";
import Inform from "./pages/Inform";

function App() {
  const [isInClient, setIsInClient] = useState(false);

  useEffect(() => {

    const initLiff = async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
      } catch (e) {
        alert(`${e}` + "\n" + `${window.location.href}`);
      }
    };

    // if (liff.isInClient()) {
    //   const { userAgent } = navigator;
    //   if (!liff.isInClient() && userAgent.includes("Line")) {
    //     window.location.href = liff.permanentLink.createUrl();
    //   }
      setIsInClient(true);
      initLiff();
    // }
    const initLoading = document.getElementById('init-loading');
    const notInLine = document.getElementById('not-in-line');
    
    if (!window.navigator.userAgent.includes("Line") && notInLine) {
      initLoading?.remove();
    }

  }, []);

  return (
    <div className="App">
      {!isInClient ? (
        <div id="not-in-line" className="vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>Not in LINE Mobile</h1>
            <p>Please open this page in LINE Mobile.</p>
        </div>
      ) : (
        <Router basename="/ff">
          <Routes>
            <Route path="/inform" element={<Inform />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
