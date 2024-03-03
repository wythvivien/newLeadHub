import {
  MdOutlineAdd,
  MdOutlineLogout,
  MdOutlineHelpOutline,
  MdNotificationsNone,
} from "react-icons/md";
import { SiHandshakeProtocol } from "react-icons/si";
import { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../app/api/usersApiSlice.js";
import { clearCredentials } from "../app/features/authSlice.js";
import { ToggleContext } from "../context/toggleContext";
import { actionList } from "../data/menuList.js";

const Header = () => {
  // Reducer Context Hooks
  const { state, toggleDispatch } = useContext(ToggleContext);
  const [action, setAction] = useState(false);
  // React Router Hook
  const navigate = useNavigate();
  // Redux Hooks
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  // Mutation Hook to perform the login mutation from UserApiSlice
  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate('/signin')
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="z-50 fixed left-0 top-0 right-0 h-16 px-3 sm:px-6 py-4 bg-white border-b-2 border-neutral-200 justify-between items-center gap-[20px] inline-flex">
      <div className="flex gap-6 items-center">
        <div
          onClick={() => {
            toggleDispatch({
              type: "SET_TOGGLE_SIDEBAR",
              payload: !state.toggleSidebar,
            });
          }}
          className="flex gap-3 md:gap-5 cursor-pointer"
        >
          <SiHandshakeProtocol size={30} className="text-active" />
          <h1 className="hidden sm:block text-2xl font-black tracking-wider text-sidebar">
            LEADHUB
          </h1>
        </div>
        <h2 className="hidden text-xl font-semibold leading-8 text-sidebar md:block border-l pl-6 border-[#e4e4e4] ">
          Dashboard
        </h2>
      </div>

      <div className="gap-3 justify-start items-center md:gap-6 flex relative">
        <button
          className="hidden rounded-full bg-active text-sidebar pl-3.5 pr-6 py-1 lg:flex items-center"
          onClick={() => setAction(!action)}
        >
          <MdOutlineAdd className="size-6" />
          <h3 className="text-base leading-8 font-semibold ml-1">
            Quick Action
          </h3>
        </button>

        <button
          className="rounded-full p-1 bg-active lg:hidden"
          onClick={() => setAction(!action)}
        >
          <MdOutlineAdd className="text-sidebar size-6" />
        </button>

        <div
          className={`bg-white rounded-md border-2 shadow-md mt-2 overflow-y-auto w-32 sm:w-40 max-h-60 absolute top-12 md:top-16 ${
            action ? "block" : "hidden"
          }`}
        >
          <ul>
            {actionList.map((action) => (
              <li
                key={action.action}
                className="py-2 px-4 hover:bg-amber-300 cursor-pointer"
                onClick={() => {
                  toggleDispatch({ type: action.type, payload: true });
                  setAction(false);
                  actionList.filter((other) => other !== action).forEach((other) => toggleDispatch({type: other.type, payload: false}))
                }}
              >
                {action.action}
              </li>
            ))}
          </ul>
        </div>

        <div className="gap-1 justify-start items-center md:gap-4 flex">
          <MdNotificationsNone className="text-sidebar cursor-pointer size-8" />
          <MdOutlineHelpOutline className="text-sidebar cursor-pointer size-8" />
          <MdOutlineLogout
            className="text-sidebar cursor-pointer size-8"
            onClick={logoutHandler}
          />
        </div>

        <div className="hidden border-l-2 border-[#e4e4e4] pl-6 gap-4 sm:inline-flex h-16 items-center cursor-pointer" onClick={() => navigate("/profile")}>
          <h1 className="size-10 rounded-full border-2 object-cover border-sidebar text-center text-xl font-bold flex items-center justify-center">
            {userInfo.name.charAt(0)}
          </h1>
          <div className="hidden text-sidebar lg:block">
            <h2 className="text-base font-semibold leading-5">
              {userInfo.name}
            </h2>
            <p className="text-sm font-medium leading-5">{userInfo.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
