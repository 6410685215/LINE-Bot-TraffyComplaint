import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";

import Inform from "./pages/Inform";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isInClient, setIsInClient] = useState(false);

  useEffect(() => {

    const initLiff = async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        setMessage("LIFF init succeeded.");
      } catch (e) {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      }
    };
    
    if (liff.isInClient()) {
      setIsInClient(true);
      initLiff();
    }
  }, []);

  return (
    <div className="App">
      { isInClient ?
      <Router basename="/ff">
        <Routes>
          <Route path="/inform" element={<Inform />} />
        </Routes>
      </Router>
      :
      <div>Open in LINE APP</div>
      }
    </div>
  );
}

export default App;
