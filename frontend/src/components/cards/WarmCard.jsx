import { LuCalendarClock } from "react-icons/lu";

const WarmCard = ({ name, date }) => {
  return (
    <article className="col-span-1 rounded-xl border-2 shadow flex flex-wrap cursor-pointer overflow-hidden hover:shadow-lg ">
      <div className="flex flex-1">
        <img
          src=""
          className=" w-full h-auto object-cover border-2 border-black"
        />
      </div>
      <div className="w-2/3 overflow-hidden flex flex-col gap-1 justify-start p-4">
        <h1 className="font-semibold ">{name}</h1>
        <div className="flex gap-2 text-sm">
          <LuCalendarClock size={20} />
          <p className="text-sm font-medium">{date}</p>
        </div>

        <div className="border-t pt-2 mt-5 flex gap-3 ">
          <button className="w-full bg-active text-sidebar px-3 py-2 rounded-md text-sm whitespace-nowrap font-medium">
            Start Progress
          </button>
        </div>
      </div>
    </article>
  );
};

export default WarmCard;
