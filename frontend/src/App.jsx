import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToggleProvider } from "./context/toggleContext";
import { ScreenProvider } from "./context/screenContext";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"
import PrivateRoute from "./components/private/PrivateRoute.jsx";

const App = () => {
  const navigate = useNavigate();

  //Initialized First Link
  useEffect(() => {
    navigate("/signin");
  }, []);

  return (
    <>
      <ToggleProvider>
        <ScreenProvider>
          <ToastContainer />
          <div className="h-screen w-full">
            <Routes>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard/:category" element={<Dashboard />} />
              {/* Private Routes */}
              <Route path="" element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </div>
        </ScreenProvider>
      </ToggleProvider>
    </>
  );
};

export default App;
