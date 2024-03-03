import SignInput from "../components/inputs/SignInput";
import SignButton from "../components/button/SignButton";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRegisterMutation } from "../app/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../app/features/authSlice";

const Signup = () => {
  // State Variables for Forms
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  // React Router Hook
  const navigate = useNavigate();
  // Redux Hooks
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  // Mutation Hook to perform the login mutation from UserApiSlice
  const [register] = useRegisterMutation();

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
      // Calling the register mutation passing the data
      const res = await register({ name, email, company, password }).unwrap();
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
        <h1 className="text-gray-800 text-2xl mt-8 mb-1">Register</h1>
        <h2 className="text-gray-500 text-base flex items-center gap-1">
          to continue to <span className="text-active">LeadHub</span>
        </h2>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-start relative gap-3 w-56 sm:w-80 md:w-96"
      >
        <SignInput
          item="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <SignInput
          item="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SignInput
          item="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <SignInput
          item="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SignButton text="Sign Up" type="submit" color="sidebar" bg="active" />
        <div className="flex justify-center items-center flex-col sm:flex-row sm:gap-2 md:gap-3 mb-6 mt-3 text-sm">
          <span>Already have an account?</span>
          <Link to="/signin" className="text-active font-medium">
            Sign In
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Signup;
