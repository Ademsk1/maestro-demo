import logo from "./logo.svg";
import "./App.css";
import { useState, useContext, useEffect } from "react";
import { createContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
function checkUser(username, password) {
  if (username === "Adam" && password === "123") {
    return true;
  }
  return false;
}
const UserContext = createContext({
  user: null,
  setUser: (user) => {},
});

function Context({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
function YourIn() {
  return <h1>You're in</h1>;
}
function LoginComponent() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      window.location.replace("maestro://callback");
    }
  }, [user]);

  console.log(user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePass = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    if (checkUser(username, password)) {
      setUser({ username: username, password: password });
    }
  };
  return (
    <div className="App">
      <h1>Logging in through a website</h1>
      <form>
        <input
          id="username-login"
          type="text"
          onChange={handleUsername}
          placeholder="username"
        />
        <input
          id="password-login"
          type="text"
          onChange={handlePass}
          placeholder="password"
        />
      </form>
      <button id="button-login" onClick={handleLogin}>
        Log me in
      </button>
    </div>
  );
}
function App() {
  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/authenticated" element={<YourIn />} />
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;
