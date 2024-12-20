import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Home, Login, PageNotFound, SignUp } from "./components";
import { useNavigate, useLocation } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    // If there is no token, redirect to login page
    // alert(location.pathname);
    if (!token) {
      location.pathname === "/signup"
        ? navigateTo("/signup")
        : navigateTo("/login");
    }
    if (
      token &&
      (location.pathname === "/login" || location.pathname === "/signup")
    )
      navigateTo("/");
  }, [token, navigateTo]); // Dependency array ensures the effect runs when the token value changes

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
