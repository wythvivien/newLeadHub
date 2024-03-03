import { useContext, useEffect } from "react";
import SideBar from "../sections/Sidebar";
import Header from "../sections/Header";
import { useParams } from "react-router-dom";
import { ToggleContext } from "../context/toggleContext";
import { ScreenContext } from "../context/screenContext";
import Pipeline from "./tabs/Pipeline";
import Warm from "./tabs/Warm";
import Dead from "./tabs/Dead";
import Cold from "./tabs/Cold";
import Leads from "./tabs/Leads";
import Calendar from "./tabs/Calendar";
import Tasks from "./tabs/Tasks";
import Analytics from "./tabs/Analytics";
import Projects from "./tabs/Projects";
import Overview from "./tabs/Overview";
import CreateLead from "../sections/forms/CreateLead";
import SendEmail from "../sections/forms/SendEmail";

const Dashboard = () => {
  //Using category as the parameter for navigating
  const { category } = useParams();
  const { state, toggleDispatch } = useContext(ToggleContext);
  const { size } = useContext(ScreenContext);

  //Toggling default of sidebar status based on windows screen
  useEffect(() => {
    size < 1024 && state.toggleSidebar
      ? toggleDispatch({ type: "SET_TOGGLE_SIDEBAR", payload: false })
      : toggleDispatch({ type: "SET_TOGGLE_SIDEBAR", payload: true });
  }, []);

  return (
    <div className="bg-white overflow-auto">
      <Header />
      <CreateLead />
      <SendEmail />
      <div className="max-w-full mt-16 flex">
        <SideBar />
        <div
          className={`${
            state.toggle
              ? ` ${
                  state.toggleSidebar
                    ? "lg:ml-[340px] md:mx-8 mx-4 my-8"
                    : "md:mx-8 mx-4 my-8"
                }`
              : ` ${
                  state.toggleSidebar
                    ? "lg:ml-32 md:mx-8 mx-4 my-8"
                    : "md:mx-8 mx-4 my-8"
                }`
          } w-full h-full z-10`}
        >
          {/* Navigating Through Components based on value of parameter category */}
          {category === "overview" && <Overview />}
          {category === "analytics" && <Analytics />}
          {category === "pipeline" && <Pipeline />}
          {category === "warm" && <Warm />}
          {category === "cold" && <Cold />}
          {category === "dead" && <Dead />}
          {category === "calendar" && <Calendar />}
          {category === "tasks" && <Tasks />}
          {category === "projects" && <Projects />}
          {category === "leads" && <Leads />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
