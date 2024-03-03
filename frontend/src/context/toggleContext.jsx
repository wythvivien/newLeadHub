import { createContext, useContext, useReducer } from "react";

// Toggling Sidebar
const initialState = {
  toggle: true,
  toggleSidebar: true,
  createLead: false,
  sendEmail: false,
};

const ToggleContext = createContext();

const ToggleProvider = ({ children }) => {
  const [state, toggleDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_TOGGLE":
        return {
          ...state,
          toggle: action.payload,
        };
      case "SET_TOGGLE_SIDEBAR":
        return {
          ...state,
          toggleSidebar: action.payload,
        };
      case "SET_CREATE_LEAD":
        return {
          ...state,
          createLead: action.payload,
        };
      case "SET_SEND_EMAIL":
        return {
          ...state,
          sendEmail: action.payload,
        };
      default:
        return state;
    }
  }, initialState);

  return (
    <ToggleContext.Provider value={{ state, toggleDispatch }}>
      {children}
    </ToggleContext.Provider>
  );
};

export { ToggleProvider, ToggleContext }