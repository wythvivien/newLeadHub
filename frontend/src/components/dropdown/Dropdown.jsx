import { useContext, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { ScreenContext } from "../../context/screenContext";

const DropDown = ({ option, placeholder, icon: IconComponent }) => {
  const [item, setItem] = useState(null);
  const [open, setOpen] = useState(false);
  const { size } = useContext(ScreenContext);

  return (
    <div className="relative w-full sm:w-[132px] font-medium text-sm">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white p-2 flex items-center justify-between rounded-md border-2 cursor-pointer ${
          !item && "md:text-gray-500"
        }`}
      >
        {size > 540 ? (
          <>
            <span>{item ? item : placeholder}</span>
            <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
          </>
        ) : (
          <IconComponent size={20} />
        )}
      </div>
      <div
        className={` absolute z-10 bg-white rounded-md border-2 mt-2 sm:w-full overflow-y-auto max-h-60 right-0 ${
          open ? "block" : "hidden"
        }`}
      >
        <ul>
          {option.map((i) => (
            <li
              key={i}
              onClick={() => {
                setItem(i);
                setOpen(false);
                console.log();
              }}
              className="p-2 hover:bg-amber-300"
            >
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
