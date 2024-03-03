import { createContext, useEffect, useState } from "react";

const ScreenContext = createContext();

const ScreenProvider = ({ children }) => {
  const [size, setSize] = useState(window.innerWidth);
  //Rendering the responsiveness one at a time
  useEffect(() => {
    const handleResize = (e) => {
      setSize(e.currentTarget.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ScreenContext.Provider value={{ size }}>{children}</ScreenContext.Provider>
  );
};

export { ScreenContext, ScreenProvider };
