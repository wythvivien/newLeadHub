import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../app/api/usersApiSlice.js";
import { setCredentials } from "../app/features/authSlice.js";
import { toast } from "react-toastify";
import SignInput from "../components/inputs/SignInput";
import SignButton from "../components/button/SignButton.jsx";

const Signin = () => {
  // State Variables for Forms
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // React Router Hook
  const navigate = useNavigate();
  // Redux Hooks
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  // Mutation Hook to perform the login mutation from UserApiSlice
  const [login] = useLoginMutation();

  // Redirecting to dashboard when logged in
  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard/leads");
    }
  }, [navigate, userInfo]);

  // Form Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Calling the login mutation passing the data
      const res = await login({ email, password }).unwrap();
      // Dispatch the setCredential Action from authSlice
      dispatch(setCredentials({ ...res }));
      // After doing, redirect to dashboard route
      navigate("/dashboard/leads");
    } catch (err) {
      toast(err?.data?.message || err.error);
    }
  };

  return (
    <main className="border-2 rounded-md flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 sm:px-8 md:px-10 py-6">
      <div className="mb-8 flex flex-col items-center font-medium">
        <h1 className="text-gray-800 text-2xl mt-8 mb-1">Welcome</h1>
        <h2 className="text-gray-500 text-base flex flex-col sm:flex-row items-center sm:gap-1">
          Login to continue to <span className="text-active">LeadHub</span>
        </h2>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-start relative gap-5 w-56 sm:w-80 md:w-96"
      >
        <SignInput
          item="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SignInput
          item="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SignButton text="Sign In" type="submit" color="sidebar" bg="active" />
        <div className="flex justify-center items-center flex-col sm:flex-row sm:gap-2 md:gap-4 mb-6 mt-3 text-sm">
          <span>Don't have an account?</span>
          <Link to="/signup" className="text-active font-medium ">
            Sign Up Now
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Signin;
