// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./custom-hooks/useDarkMode";
import { GlobalStyles } from "./themes/globalStyles";
import { lightTheme, darkTheme } from "./themes/Themes";

// Auth
import RequireAuth from "./utils/auth/RequireAuth";
import useAuth from "./custom-hooks/useAuth";

// Routing
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import PublicRoute from "./utils/auth/PublicRoute";
import ProtectedRoute from "./utils/auth/ProtectedRoute";

// React
import { useState, useEffect } from "react";

// Pages
// ***** Logged In
import Dashboard from "./pages/LoggedIn/Dashboard";
import Profile from "./pages/LoggedIn/Profile";
import Products from "./pages/LoggedIn/Products";
import CreatePlan from "./pages/LoggedIn/CreatePlan";
// ***** Logged Out
import Welcome from "./pages/LoggedOut/Welcome";
import Login from "./pages/LoggedOut/Login";
import Register from "./pages/LoggedOut/Register";
// ***** Others
import RegisterProfile from "./pages/RegisterProfile";
import Error from "./pages/Errors/Error";
import ToggleTheme from "./components/Togglers/ToggleTheme";

function App() {
  // Theme
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  // Auth
  const [user, setUser] = useState(null);

  // const { auth } = useAuth();

  useEffect(() => {
    const userStored = window.localStorage.getItem("user");
    if (userStored) setUser(JSON.parse(userStored).user);
  }, []);

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <ToggleTheme checked={theme === "dark" ? true : false} onChange={toggleTheme} />
      <BrowserRouter>
        <Routes>
          {/* Logged out */}
          <Route element={<PublicRoute user={user} />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
          </Route>
          {/* Logged in */}
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/register-profile" element={<RegisterProfile user={user} setUser={setUser} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products user={user} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-plan" element={<CreatePlan />} />
          </Route>
          {/* Error */}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
