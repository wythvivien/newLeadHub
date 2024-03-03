import { useContext, useState } from "react";
import { ToggleContext } from "../context/toggleContext";
import { Link } from "react-router-dom";
import { tabList } from "../data/menuList.js";

const SideBar = () => {
  //Initialization
  const [activeIcon, setActiveIcon] = useState(tabList[0].icon.toString());
  const [activeCat, setActiveCat] = useState("Leads");
  const [category, setCategory] = useState(tabList[0].inside);
  const { state, toggleDispatch } = useContext(ToggleContext);

  //Function for the Clicked Icon
  let ClickedIcon = (iconName) => {
    //Checking if the activeCat is a property of iconName.inside
    const isInside = iconName.inside.some((cat) => cat.item === activeCat);
    //Double Clicking the Icon to toggle its categories
    if (iconName.icon == activeIcon) {
      toggleDispatch({ type: "SET_TOGGLE", payload: !state.toggle });
      //If the checking is true the activeIcon remains as it is
      setActiveIcon(isInside ? iconName.icon.toString() : "");
    } else {
      //Single Clicking the Icon
      toggleDispatch({ type: "SET_TOGGLE", payload: true });
      setActiveIcon(iconName.icon.toString());
    }
    setCategory(iconName.inside);
  };

  return (
    <div className={`${state.toggleSidebar ? "block" : "hidden"}`}>
      <div
        className="z-40 fixed lg:hidden left-0 top-0 right-0 bottom-0 bg-slate-700 backdrop-blur-3xl opacity-60"
        onClick={() => {
          toggleDispatch({ type: "SET_TOGGLE_SIDEBAR", payload: false });
        }}
      ></div>
      <aside className=" h-full z-40 fixed drop-shadow-2xl md:drop-shadow flex">
        <div className="flex-col overflow-hidden md:overflow-auto justify-start items-center gap-4 flex bg-sidebar p-6 min-h-full">
          {tabList.map((icon, index) => (
            <button
              key={index}
              onClick={() => {
                ClickedIcon(icon);
              }}
              className={`p-2.5 cursor-pointer ${
                activeIcon == icon.icon
                  ? " text-white bg-active "
                  : "text-neutral-400"
              }  rounded-lg flex-col hover:text-white duration-300 justify-start items-center`}
            >
              {icon.icon && <icon.icon className="size-8 text-center" />}
            </button>
          ))}
        </div>
        <div
          className={`w-52 ${
            state.toggle ? "block" : "hidden"
          } h-full overflow-hidden md:overflow-auto py-6 bg-white border-r border-neutral-200 flex-col justify-start items-start gap-3 inline-flex`}
        >
          {category.map((c, index) => {
            return (
              <Link
                to={`/dashboard/${c.link}`}
                onClick={() => setActiveCat(c.item)}
                key={index}
                className={`self-stretch duration-300 cursor-pointer px-5 ${
                  activeCat === c.item
                    ? " bg-amber-50 bg-opacity-100 border-r-2 border-active "
                    : "text-zinc-500 hover:bg-neutral-200"
                } py-3.5 justify-start items-center gap-4 inline-flex`}
              >
                <div
                  className={`w-6 relative ${
                    activeCat === c.item ? "text-active" : "text-zinc-500"
                  }`}
                >
                  <c.icon className="size-7" />
                </div>
                <div
                  className={`grow shrink basis-0 ${
                    activeCat === c.item
                      ? "text-amber-600 font-semibold"
                      : "text-zinc-500  font-semibold"
                  } text-base leading-3`}
                >
                  {c.item}
                </div>
              </Link>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
